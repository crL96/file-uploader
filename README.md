# File Uploader

## Description
This project is part of the TOP curriculum, a project made to test knowledge of Prisma ORM, authentication/passport.js, node, express, SQL/postgres, server-side programming and debugging.

Link to project instructions: https://www.theodinproject.com/lessons/nodejs-file-uploader

A web app where users can register and upload files to their storage (Cloud storage). Users will be authenticated and can only access their own files and folders. Uploaded files are stored in a cloud storage service (with all references stored in a postgreSQL database handled with Prisma ORM).

Users are authenticated with PassportJS and passwords are handled with bcrypt.

## Getting Started
Live build: **https://file-uploader-crl96.onrender.com**

#### Run locally
1. Clone the repository

2. Navigate to the project directory: **cd file-uploader**

3. Run build command to install packages and init prisma client: **npm run init-install**

4. Setup a PostgreSQL database and add it's credentials to the .env in the next step.

5. Create a .env file in the project root directory, look at the .env.sample for clarification.

6. Run init db command to sync your postgres db with prisma schema: **npm run init-db**

7. Create a Cloudinary account for cloud storage (free tier is sufficient) and add your Cloudinary URL to .env file. Can be found in your cloudinary dashboard.

7. Preview the website: **npm run start**

8. Navigate to **http://localhost:3000/**

## Technologies Used
Programming Languages: Javascript, HTML/EJS, CSS, SQL

Server-side Tools: NodeJS, Express, PassportJS, Bcrypt, Prisma ORM, PostgreSQL, Cloudinary