# Blog Website with Admin Panel - Full Stack Project

## Overview

This project is a full-stack blog website built with **Next.js** (React Framework) for server-side rendering, **Tailwind CSS** for responsive and utility-first design, **Cloudinary** for image storage, **WYGIWYS** (What You Get Is What You See) for blog content creation, and **Auth0** for user authentication.

The project includes both the blog's public-facing site and an **Admin Panel** that allows authenticated users to manage blog content, including creating, editing, and deleting blog posts.

## Tech Stack

- **Frontend**: Next.js (React)
- **Backend**: Next.js API Routes (Serverless functions)
- **Database**: MongoDB (for storing blog posts)
- **Authentication**: Auth0
- **Image Storage**: Cloudinary
- **Blog Editor**: WYGIWYS (What You Get Is What You See editor)
- **Styling**: Tailwind CSS

## Features

### Public Blog Website
- View and read published blog posts
- Responsive design using Tailwind CSS
- Pagination for blog posts
- Search functionality to find specific posts

### Admin Panel
- Login/Logout using **Auth0** authentication
- Create, edit, and delete blog posts
- Upload images to **Cloudinary** for use in blog content
- **WYGIWYS** editor for rich-text blog creation

## Installation

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/yourusername/blog-website.git
cd blog-website
```

### 2. Install Dependencies

Install the required dependencies using either npm or yarn:

```bash
npm install
# or
yarn install
```

This will install all the necessary packages from package.json including Next.js, Tailwind CSS, and other dependencies.

### 3. Set Up Environment Variables
Create a .env.local file in the root of the project and add the following environment variables. These variables are used to configure authentication, image storage, and the database connection.

```bash
# Auth0
NEXT_PUBLIC_AUTH0_CLIENT_ID=<your-auth0-client-id>
NEXT_PUBLIC_AUTH0_DOMAIN=<your-auth0-domain>

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
NEXT_PUBLIC_CLOUDINARY_API_KEY=<your-cloudinary-api-key>
NEXT_PUBLIC_CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>

# MongoDB
MONGODB_URI=<your-mongodb-connection-string>
```
### 4. Run the Project Locally
Now that everything is set up, you can run the development server with:

```bash
npm run dev
# or
yarn dev
```

The application will be running at http://localhost:3000. Visit this URL in your browser to see the blog site in action.

### 5. Admin Login
To access the Admin Panel, you'll need to log in through Auth0. Visit the following route:

```bash
/api/auth/login
```
This will redirect you to the Auth0 login page, where you can log in using your credentials. Once authenticated, you'll be able to access the Admin Panel to create, edit, or delete blog posts.

## Project Structure

```bash
/blog-website
├── /pages
│   ├── /api
│   │   ├── auth.js                # API routes for authentication (Auth0)
│   │   ├── posts.js               # API routes for CRUD operations on blog posts
│   ├── /admin
│   │   ├── index.js               # Admin dashboard
│   │   ├── create.js              # Create new blog post
│   │   ├── edit.js                # Edit an existing blog post
│   ├── /posts
│   │   ├── [slug].js              # Individual blog post page
│   ├── index.js                   # Homepage showing all blog posts
├── /components
│   ├── Header.js                  # Header with navigation
│   ├── PostCard.js                # Blog post preview component
│   ├── Editor.js                  # WYGIWYS editor component
├── /styles
│   ├── globals.css                # Global styles (Tailwind CSS)
│   ├── tailwind.config.js         # Tailwind CSS configuration
├── /public
│   ├── /images                    # Folder for public images
├── /lib
│   ├── auth0.js                   # Utility functions for Auth0 authentication
│   ├── cloudinary.js              # Cloudinary image upload functions
│   ├── mongodb.js                 # MongoDB utility functions for database interaction
├── .env.local                     # Environment variables
├── package.json                   # Project dependencies
└── README.md                      # Project documentation
```

## How It Works
### 1. Authentication with Auth0
Auth0 is used for user authentication. Users must log in to access the Admin Panel.

- Auth0 provides secure login mechanisms, and tokens are stored in cookies to manage the session.

- On successful login, the user will have access to the Admin Panel where they can manage blog posts.

### 2. MongoDB for Storing Blog Posts
Blog posts are stored in MongoDB, using Mongoose to manage the data schema.

- Each post includes fields like title, content, date of publication, and images (from Cloudinary).

- MongoDB handles storage and retrieval of blog data through API routes.

### 3. Blog Creation/Editing with WYGIWYS Editor
The WYGIWYS (What You Get Is What You See) editor is used for creating and editing blog posts.

- It provides a rich-text editor that supports:

  - Text formatting

  - Image insertion

  - Other multimedia elements

- Images uploaded to Cloudinary are added to blog posts through the editor.

### 4. Cloudinary for Image Storage
All images (such as post images and media) are uploaded to Cloudinary.

- Cloudinary provides a URL for each image, which can be used within blog posts for displaying images.

- This allows easy media management and optimization, especially for images.

### 5. API Routes for Data Handling
Next.js API routes are used to manage blog data. The key API endpoints are as follows:

```http
GET /api/posts: Retrieve all blog posts

POST /api/posts: Create a new blog post

PUT /api/posts/:id: Edit an existing blog post

DELETE /api/posts/:id: Delete a blog post
```

These API routes allow interaction with the MongoDB database to perform CRUD operations on blog posts.

## Deployment
You can deploy this project on platforms like Vercel (ideal for Next.js) or Netlify. After pushing the code to your GitHub repository, connect it to your Vercel/Netlify account for continuous deployment.

### Deployment Steps:
##### 1. Push your project to a GitHub repository.

##### 2. Connect the repository to Vercel or Netlify.

##### 3. Set the environment variables on the deployment platform.

##### 4. Your project will be automatically deployed, and you’ll receive a live URL.
