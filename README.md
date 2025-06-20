# Blog Website with Custom CMS - Full Stack Project

## Overview

This project is a full-stack blog website built with **Next.js** (React Framework) for server-side rendering, static site generation for SEO optimization, **CSS3** for responsive and utility-first design, **Cloudinary** for image storage, **MailChimp** for email marketing services, **WYGIWYS** (What You Get Is What You See) for blog content creation, and **Auth0** for user authentication.

The project includes both the blog's public-facing site and an **Admin Panel** that allows authenticated users to manage blog content, including creating, editing, and deleting blog posts.

## Tech Stack & Services Used

<p align="center" width="100%">
    <img width="60%" src="/images/blog-diagram.png">
</p>

- **Frontend**: Next.js (React)
- **Backend**: Next.js API Routes (Serverless functions)
- **Database**: MongoDB (for storing blog posts)
- **Authentication**: Auth0
- **Image Storage**: Cloudinary
- **Email Marketing**: MailChimp
- **Blog Editor**: WYGIWYS (What You Get Is What You See editor)
- **Styling**: CSS3

## Features

### Public Blog Website
- View and read published blog posts
- Responsive design using CSS3
- Pagination for blog posts
- Categorizing blog posts to help users find contents they are interested in
- Subscribe for newsletters and notifications for new blog posts

### Admin Panel
- Login/Logout using **Auth0** authentication
- Search, create, edit, and delete blog posts
- Allow client to create and save drafts
- Images and videos that are emded in blogs are stored in **Cloudinary**
- **WYGIWYS** editor for rich-text blog creation

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
POST /api/blog/blogs: Create New Blog Post
POST /api/blog/draft: Create New Draft Post

POST /api/blog/blogs/{blogId}: Edit Existing Blog Post
POST /api/blog/draft/{blogId}: Edit Draft Post

POST /api/blog/blogs/delete: Delete Blog Post
POST /api/blog/draft/delete: Delete Draft Post

POST /api/blog/blogs/pin: Pin/Unpin Blog Post

POST /api/subscription: Subscribe to newsletter
```

## Installation

### 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/lylaw27/pentago-blog.git
cd pentago-blog
```

### 2. Install Dependencies

Install the required dependencies using either npm or yarn:

```bash
npm install
# or
yarn install
```

This will install all the necessary packages from package.json including Next.js, CSS3, and other dependencies.

### 3. Set Up Environment Variables
Create a .env.local file in the root of the project and add the following environment variables. These variables are used to configure authentication, image storage, and the database connection.

```bash
# Auth0
AUTH0_SECRET=<your-auth0-secret>
AUTH0_BASE_URL=<your-domain>
AUTH0_ISSUER_BASE_URL=<your-auth0-domain>
AUTH0_CLIENT_ID=<your-auth0-client-id>
AUTH0_CLIENT_SECRET=<your-auth0-client-secret>

# Cloudinary
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>

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
/login
```
This will redirect you to the Auth0 login page, where you can log in using your credentials. Once authenticated, you'll be able to access the Admin Panel to create, edit, or delete blog posts.

## Project Structure

```bash
/pentago-blog
├── /pages
│   ├── /api
│   │   ├── /auth
│   │   │   └── [...auth0].js               # Auth0 authentication routes 
│   │   ├── /blog
│   │   │   └── [type]
│   │   │       ├── index.js                # API route for creating blog posts 
│   │   │       ├── delete.js               # API route for deleting blog posts 
│   │   │       ├── pin.js                  # API route for pinning blog posts 
│   │   │       └── [blogId].js             # API route for editing specific blog posts
│   │   └── subscription.js                 # Newsletter subscription endpoint
│   ├── /admin
│   │   ├── index.js                        # Admin dashboard
│   │   ├── /blog
│   │   │   ├── index.js                    # Blog post list
│   │   │   ├── preview.js                  # Blog preview
│   │   │   └── /upload
│   │   │       ├── index.js                # Deploy New Blog
│   │   │       └── [blogId].js             # Edit existing blog
│   │   └── /draft
│   │       ├── index.js                    # Draft post list
│   │       ├── preview.js                  # Draft preview
│   │       └── /upload
│   │           ├── index.js                # Create new draft
│   │           └── [draftId].js            # Edit existing draft
│   ├── /[contentType]
│   │   ├── index.js                        # Filtered posts according to Content types
│   │   └── /page
│   │       └── [pageId].js                 # Paginated content type
│   ├── /category
│   │   └── [category]                      
│   │       ├── index.js                    # Filtered posts according to categories
│   │       └── /page
│   │           └── [pageId].js             # Paginated category
│   ├── /content
│   │   └── [blogUrl].js                    # Individual blog post
│   ├── aboutus.js                          # About page
│   ├── login.js                            # Login page
│   ├── _app.js                             # App configuration
│   └── index.js                            # Homepage
├── /components
│   ├── texteditor.js                       # Text Editor
│   ├── toolbar.js                          # Admin toolbar
│   ├── blogsidebar.js                      # Blog sidebar
│   ├── header.js                           # Site header
│   ├── footer.js                           # Site footer
│   ├── subscription.js                     # Newsletter subscription
│   ├── querypagination.js                  # Admin query pagination
│   ├── blogpagination.js                   # Blog pagination
│   └── db.js                               # MongoDB Connection
├── /layout
│   ├── BlogLayout.js                       # Blog post layout
│   └── home.js                             # Homepage layout
├── /styles
│   ├── adminhome.css                       # Admin panel styles
│   ├── blog-admin.css                      # Blog edit page styles
│   ├── details.css                         # Blog detail styles
│   ├── globals.css                         # Global styles
│   ├── home.css                            # Homepage styles
│   ├── aboutus.css                         # About page styles
│   ├── login.css                           # Login styles
│   ├── pagination.css                      # Pagination component styles
│   ├── sidebar.css                         # Sidebar styles
│   ├── upload.css                          # Upload form styles
│   └── texteditor.css                      # WYGIWYS editor styles
└── /context
    └── preview.js                          # Blog preview context
```

These API routes allow interaction with the MongoDB database to perform CRUD operations on blog posts.

## Deployment
You can deploy this project on platforms like Vercel (ideal for Next.js) or Netlify. After pushing the code to your GitHub repository, connect it to your Vercel/Netlify account for continuous deployment.

### Deployment Steps:
##### 1. Push your project to a GitHub repository.

##### 2. Connect the repository to Vercel or Netlify.

##### 3. Set the environment variables on the deployment platform.

##### 4. Your project will be automatically deployed, and you’ll receive a live URL.
