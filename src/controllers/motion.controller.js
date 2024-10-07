const fetch = require("node-fetch");
const fs = require("fs");
const FormData = require("form-data");
const { leonardoApiKey, leonardoBaseUrl } = require("../../configs/env.config");

// API key and headers for requests
const apiKey = leonardoApiKey;
const baseUrl = leonardoBaseUrl;

// Headers for requests
const headers = {
  accept: "application/json",
  "content-type": "application/json",
  authorization: `Bearer ${apiKey}`,
};

const handleImageUpload = async (req, res) => {
  try {
    // Ensure the file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    // Get the file path from multer
    const imageFilePath = req.file.path;

    // Get a presigned URL for uploading an image
    let response = await fetch(`${baseUrl}/init-image`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({ extension: "jpg" }),
    });

    // Check if the request was successful
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    let data = await response.json();

    // Upload image via presigned URL
    const fields = JSON.parse(data.uploadInitImage.fields);
    const url = data.uploadInitImage.url;
    const imageId = data.uploadInitImage.id;
    // Create a form data object and append the image file
    const formData = new FormData();
    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value);
    });
    formData.append("file", fs.createReadStream(imageFilePath));

    // Get the content length of the form data
    const contentLength = await new Promise((resolve, reject) => {
      formData.getLength((err, length) => {
        if (err) reject(err);
        else resolve(length);
      });
    });

    // Upload the image to the presigned URL
    response = await fetch(url, {
      method: "POST",
      body: formData,
      headers: { ...formData.getHeaders(), "Content-Length": contentLength },
    });

    // Check if the request was successful
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    // Generate video with an init image
    response = await fetch(`${baseUrl}/generations-motion-svd`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        imageId: imageId,
        isInitImage: true,
        motionStrength: 9,
      }),
    });

    // Check if the request was successful
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    data = await response.json();
    // Handle the response from the video generation
    if (
      !data.motionSvdGenerationJob ||
      !data.motionSvdGenerationJob.generationId
    ) {
      throw new Error("Unexpected response structure from video generation");
    }

    // Get the generation ID from the response
    const generationId = data.motionSvdGenerationJob.generationId;

    // Wait for the generation to complete (120 seconds)
    console.log(`Waiting 120 seconds for generation ${generationId}...`);
    await new Promise((resolve) => setTimeout(resolve, 120000));

    // Get the generated video
    response = await fetch(`${baseUrl}/generations/${generationId}`, {
      method: "GET",
      headers: headers,
    });

    // Check if the request was successful
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const result = await response.json();

    // Get the URLs for the original image and generated video
    const originalImgeUrl = result?.generations_by_pk?.generated_images[0]?.url;
    const generatedVideoUrl =
      result?.generations_by_pk?.generated_images[0]?.motionMP4URL;

    // Create the response
    const responseData = {
      originalImgeUrl,
      generatedVideoUrl,
    };

    // Send the response with the URLs
    res
      .status(200)
      .json({ message: "Video generated successfully", data: responseData });
  } catch (error) {
    // LOg and handle any errors that occur during the process
    console.error("An error occurred:", error);
    res
      .status(500)
      .json({ message: "Failed to generate video", error: error.message });
  }
};

module.exports = { handleImageUpload };
