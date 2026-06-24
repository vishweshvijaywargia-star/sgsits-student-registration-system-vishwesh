# SGSITS Student Registration System

## Project Overview

A complete full-stack Student Registration System built for Shri Govindram Seksaria Institute of Technology & Science (SGSITS), Indore. This portal allows administrators to register and manage student records efficiently. The design is kept intentionally clean, minimalistic, and professional to reflect a traditional academic project.

## Features

- **Dashboard:** Displays total student count and quick navigation links.
- **Registration Form:** Allows adding new students with strict validation rules.
- **Student List:** Displays all registered students in a paginated table with search functionality by Name and Enrollment Number.
- **RESTful API:** Complete backend CRUD operations for student management.
- **Validation:** Frontend and backend validation for required fields, minimum lengths, specific formats (email, 10-digit mobile), and uniqueness (enrollment number, email).
- **Security:** Built-in protection against SQL injection (via Sequelize ORM), Helmet for HTTP headers, CORS, and Express rate-limiting.

## Tech Stack

**Frontend:**
- React 19
- Vite
- React Router DOM
- Axios
- Tailwind CSS (Used to achieve plain, minimal styling with white backgrounds and light gray borders)

**Backend:**
- Node.js
- Express.js
- Sequelize ORM
- SQLite (for zero-config local development and preview) / MySQL (Production readiness)
- Helmet, CORS, Express-Rate-Limit

## Installation Steps

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd <repository_directory>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Create a `.env` file in the root directory (you can use `.env.example` as a reference) and define your database credentials if using MySQL.

4. **Start the application:**
   The project uses a unified Vite + Express setup for local development.
   ```bash
   npm run dev
   ```
   *The server will start on port 3000.*

## Database Setup

By default, for local testing and AI Studio preview, the application uses **SQLite** to automatically create a `database.sqlite` file and sync the models.

**To switch to MySQL:**
1. Ensure you have a MySQL server running.
2. Create a database named `student_db`.
3. Open `backend/config/database.ts`.
4. Comment out the SQLite configuration.
5. Uncomment the MySQL configuration and ensure the environment variables match your setup.

### Database Schema

**Table:** `students`
- `id`: INT, Primary Key, Auto Increment
- `name`: VARCHAR(100), Not Null
- `enrollment_number`: VARCHAR(50), Unique, Not Null
- `email`: VARCHAR(100), Unique, Not Null
- `mobile_number`: VARCHAR(15), Not Null
- `branch`: VARCHAR(100), Not Null
- `created_at`: TIMESTAMP
- `updated_at`: TIMESTAMP

## API Endpoints

- **POST `/api/students`** - Add a new student
- **GET `/api/students`** - Get all students
- **GET `/api/students/:id`** - Get student by ID
- **PUT `/api/students/:id`** - Update student details
- **DELETE `/api/students/:id`** - Delete student

## Deployment Instructions

### Frontend Deployment (Vercel)
A `vercel.json` file is provided in the root directory. To deploy:
1. Push the code to a GitHub repository.
2. Import the repository in Vercel.
3. Vercel will automatically detect the build settings based on `package.json` and `vercel.json`.
4. Remember to update the `dest` URL in `vercel.json` with your actual Render backend URL if you deploy them separately.

### Backend Deployment (Render)
A `render.yaml` file is provided for backend deployment.
1. Connect your GitHub repository to Render.
2. Render will automatically detect the `render.yaml` configuration and set up a Web Service.
3. Configure the environment variables (like `DB_HOST`, `DB_USER`, `DB_PASSWORD`) in the Render dashboard for your production MySQL instance.
