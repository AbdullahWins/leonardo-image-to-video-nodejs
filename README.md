```markdown
# Image Upload and Video Generation API

This project provides an API endpoint to upload images and generate videos using the Leonardo.ai service. It utilizes `multer` for handling file uploads and `node-fetch` to interact with the Leonardo API.

## Prerequisites

- Node.js (v12 or higher)
- npm (Node Package Manager)
- An API key from Leonardo.ai

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install the required packages:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:

   ```
   SERVER_PORT=5000
   LEONARDO_API_KEY=<your-leonardo-api-key>
   LEONARDO_API_BASE_URL=https://cloud.leonardo.ai/api/rest/v1
   ```

## Usage

1. **Start the Server**

   Run the server using the following command:

   ```bash
   node index.js
   ```

   The server will listen on the port defined in your `.env` file (default: 5000).

2. **Upload an Image**

   Use a tool like Postman or curl to send a POST request to the `/upload` endpoint with the image file. 

   Example using curl:

   ```bash
   curl -X POST http://localhost:5000/upload \
   -F "file=@path/to/your/image.jpg"
   ```

3. **Response Structure**

   On a successful request, the API will return a response with the following structure:

   ```json
   {
     "message": "Video generated successfully",
     "data": {
       "originalImageUrl": "<url-of-original-image>",
       "generatedVideoUrl": "<url-of-generated-video>"
     }
   }
   ```

   If an error occurs, the API will return an error message:

   ```json
   {
     "message": "Failed to generate video",
     "error": "<error-message>"
   }
   ```

## Code Structure

- **configs/env.config.js**: Loads environment variables.
- **uploads/**: Directory where uploaded images are stored.
- **index.js**: Entry point of the application.
- **handleImageUpload.js**: Contains the logic for handling image uploads and video generation.

## Dependencies

- `express`: Web framework for Node.js.
- `multer`: Middleware for handling file uploads.
- `node-fetch`: Lightweight module that brings `window.fetch` to Node.js.
- `form-data`: A module to create form data streams for file uploads.

## License

This project is licensed under the MIT License.
```

### Instructions for Use:
1. **Replace `<repository-url>`**: Insert the URL of your repository.
2. **Replace `<your-leonardo-api-key>`**: Add your actual Leonardo API key in the `.env` file section.
3. **Add Any Additional Sections**: Feel free to add sections for testing, deployment, or contributing guidelines if necessary.

This README will provide clear instructions for anyone who wants to understand or use your image upload and video generation functionality.
