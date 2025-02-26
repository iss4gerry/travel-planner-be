# Trexense (Backend)

Restful-API for Trexense APP.

You can view the API documentation [here](https://trexense.vercel.app/api-docs).

## Tech Stack

- **Node.js**: High-performance JavaScript runtime environment that enables server-side application development.
- **Express.js**: Lightweight and flexible web application framework for Node.js.
- **Prisma**: Modern database toolkit and ORM that offers type-safe database access.
- **Google Cloud Storage**: Scalable and secure cloud storage service for storing and retrieving application media files like profile pictures, banners, and hotel images with global availability and high performance.
- **Vision API**: Advanced machine learning-powered image analysis service that provides intelligent image filtering.
- **PostgreSQL**: Powerful, open-source relational database management system known for its reliability, robust feature set, and advanced data integrity capabilities.

## Directory Overview

- `src/`:
  - `config/`: Holds configuration files, such as environment-specific settings
  - `controllers/`:  Handles the application's routing and request handling
  - `middlewares/`: Includes custom Express middleware, such as logging, validation, and other cross-cutting concerns
  - `routes/`: Defines the Express route definitions
  - `services/`: Contains the application's business logic and services
  - `utils/`: Holds various utility functions and helper modules
  - `validations/`: Contains input validation rules and logic
  - `app.js`: The main entry point of the Express application
  
## Environment Variables

- DATABASE_URL="your postgre url"
- PORT=8080
- JWT_SECRET="secret for jwt"
- HERE_API_SECRET="api key for hereapi"
- EMAIL="email for send email verification"
- PASSWORD="password for email"
- BUCKET_NAME="bucket storage name"
- BACKEND_URL="this app url"
- CREDENTIAL="gcp service account url"

# Local Development Setup
1. Clone the repository
2. Create the `.env` file with your configuration:

   ```bash
   vim .env
   ```
3. Build the Docker image
     ```bash
   docker build -t trexense-server .
   ```
4. Run the Docker container
     ```bash
   docker run -d --name trexense --env-file .env -p 8080:8080 trexense-server
   ```
## Cloud Computing Members
| Name | ID Bangkit |
| ---- |----------- |
| Gerry Desrian | C764B4KY1602 |
| Maria Stephanie Rayadi | C172B4KX2408 | 
