# Full Blog

A full-stack blog application built with Node.js, Express, EJS, MongoDB, Passport.js, Cloudinary, and Multer.

## Features

- User registration and login with session-based authentication
- Create, edit, and delete blog posts
- Upload post images to Cloudinary
- Add, edit, and delete comments on posts
- User profile page with editable account details
- Protected routes for authenticated users

## Project Structure

- `app.js` - main Express application entry point
- `controllers/` - business logic for auth, posts, comments, and user profile
- `models/` - Mongoose schemas for `User`, `Post`, `Comment`, and `File`
- `routes/` - Express route definitions for authentication, posts, comments, and user profile
- `config/` - Cloudinary and Multer configuration
- `middleware/` - authentication middleware and centralized error handling
- `views/` - EJS templates
- `public/` - static assets such as CSS

## Installation

1. Clone the repository or copy the project into a local folder.
2. Open a terminal in the project root.
3. Install dependencies:

```bash
npm install
```

4. Create a `.env` file in the project root with the following values:

```env
PORT=3000
MONGODB_URL=<your-mongodb-connection-string>
SESSION_SECRET=<your-session-secret>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
```

## Run the App

```bash
npm start
```

Then open `http://localhost:3000` in your browser.

## Key Routes

- `/` - Home page
- `/auth/register` - Registration page
- `/auth/login` - Login page
- `/auth/logout` - Logout action
- `/posts` - List posts
- `/posts/add` - Create a new post
- `/posts/:id` - View a post
- `/posts/:id/edit` - Edit a post
- `/posts/:id/comments` - Add a comment
- `/comments/:id/edit` - Edit a comment
- `/user/profile` - User profile
- `/user/edit` - Edit account details

## Notes

- The app uses Cloudinary for image uploads and stores session data in MongoDB.
- Make sure your MongoDB instance is running and reachable from the application.
- If you do not need image uploads, you can still use the blog features after configuring Cloudinary properly.

## License

This project is available under the ISC license.
