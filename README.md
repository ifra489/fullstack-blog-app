
# Full Blog
 
A full-stack blog application built with **Node.js**, **Express**, **EJS**, **MongoDB**, **Passport.js**, **Cloudinary**, and **Multer**.
 
## Screenshots
 
### Home Page
![Home Page](/screenshot/home121.png)
 
### Home 
![Home Page](/screenshot/home123.png)
 
### Post Detail
![Post Detail](/screenshot/postdetails.png)
 
### All Post
![Create Post](/screenshot/Allpost.png)
 
### User Profile
![User Profile](/screenshot/profile.png)
 
### Login
![Login](/screenshot/login.png)
 
### Register
![Register](/screenshot/register.png)
### AddPost
![Register](/screenshot/addpost.png)
### Edit
![Register](/screenshot/editprofile.png)
 
---
 
## Tech Stack
 
- **Backend** — Node.js, Express.js
- **Database** — MongoDB with Mongoose
- **Authentication** — Passport.js (Local Strategy) + bcrypt
- **Views** — EJS templating engine
- **Image Uploads** — Cloudinary + Multer
- **Validation** — express-validator
- **Styling** — Bootstrap 5 + Custom CSS
## Features
 
- User registration and login with session-based authentication
- Input validation on all forms (register, login, posts, comments)
- Create, edit, and delete blog posts with multiple image uploads
- Image carousel on post detail page
- Like and unlike posts with live count update
- Add, edit, and delete comments with timestamps
- Search posts by title
- Pagination on posts listing (10 posts per page)
- User profile page with editable account details and profile picture
- Full account deletion — cleans up all posts, comments, and Cloudinary images
- Protected routes for authenticated users
- Centralized error handling
## Project Structure
 
```
full-blog/
├── app.js                  # Main Express application entry point
├── controllers/
│   ├── authController.js   # Register, login, logout logic
│   ├── postControllers.js  # CRUD posts, search, pagination, likes
│   ├── commentControllers.js  # CRUD comments
│   └── userController.js   # Profile view, edit, delete account
├── models/
│   ├── User.js             # User schema
│   ├── Post.js             # Post schema (with likes array)
│   ├── Comment.js          # Comment schema (with timestamps)
│   └── File.js             # Uploaded file schema
├── routes/
│   ├── authRoutes.js       # Auth routes with validation
│   ├── postRoutes.js       # Post routes with validation
│   ├── commentRoutes.js    # Comment routes with validation
│   └── userRoutes.js       # User profile routes
├── config/
│   ├── cloudinary.js       # Cloudinary setup
│   ├── multer.js           # Multer setup
│   └── passport.js         # Passport local strategy
├── middleware/
│   ├── auth.js             # ensureAuthenticated middleware
│   └── errorHandler.js     # Centralized error handler
├── views/                  # EJS templates
└── public/                 # Static assets (CSS, JS)
```
 
## Installation
 
1. Clone the repository:
```bash
git clone https://github.com/ifra489/full-blog.git
cd full-blog
```
 
2. Install dependencies:
```bash
npm install
```
 
3. Create a `.env` file in the project root:
```env
PORT=3000
MONGODB_URL=<your-mongodb-connection-string>
SESSION_SECRET=<your-session-secret>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
```
 
## Run the App
 
**Development:**
```bash
npm run dev
```
 
**Production:**
```bash
npm start
```
 
Then open `http://localhost:3000` in your browser.
 
## Key Routes
 
| Method | Route | Description | Auth Required |
|--------|-------|-------------|---------------|
| GET | `/` | Home page | No |
| GET | `/auth/register` | Registration page | No |
| POST | `/auth/register` | Register user | No |
| GET | `/auth/login` | Login page | No |
| POST | `/auth/login` | Login user | No |
| GET | `/auth/logout` | Logout | Yes |
| GET | `/posts` | List all posts (search + pagination) | No |
| GET | `/posts/add` | Create post form | Yes |
| POST | `/posts/add` | Create new post | Yes |
| GET | `/posts/:id` | View single post | No |
| GET | `/posts/:id/edit` | Edit post form | Yes |
| PUT | `/posts/:id` | Update post | Yes |
| DELETE | `/posts/:id` | Delete post | Yes |
| POST | `/posts/:id/like` | Like / unlike post | Yes |
| POST | `/posts/:id/comments` | Add comment | Yes |
| GET | `/comments/:id/edit` | Edit comment form | Yes |
| PUT | `/comments/:id` | Update comment | Yes |
| DELETE | `/comments/:id` | Delete comment | Yes |
| GET | `/user/profile` | View profile | Yes |
| GET | `/user/edit` | Edit profile form | Yes |
| POST | `/user/edit` | Update profile | Yes |
| POST | `/user/delete` | Delete account | Yes |
 
## Environment Variables
 
| Variable | Description |
|----------|-------------|
| `PORT` | Port number (default 3000) |
| `MONGODB_URL` | MongoDB connection string (Atlas or local) |
| `SESSION_SECRET` | Secret key for session encryption |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API secret |
 
## Notes
 
- Cloudinary is required for image uploads — create a free account at cloudinary.com
- MongoDB Atlas free tier (M0) works perfectly for this app
- Session data is stored in MongoDB via connect-mongo
- All routes with form submissions are protected with express-validator
## License
 
This project is available under the ISC license.
