# blogapp
# Blog Application

## Overview
This is a simple blog application developed as part of the QT Global Software Developer practical test. The application includes user authentication, blog post management, and commenting functionality.

## Technologies Used
- **Backend**: Node.js, Sequelize, Express.js
- **Frontend**: React.js
- **Database**: PostgreSQL

## Setup Instructions

### Prerequisites
- Node.js and npm installed
- PostgreSQL installed and running

### Backend Setup
1. **Navigate to the backend directory:**
   ```bash
2# Install dependencies:

bash
Copy code
npm install
3# Create a .env file in the backend directory and add the following variables:
DB_HOST=your_database_host
DB_PORT=your_database_port
DB_NAME=your_database_name
DB_USER=your_database_user
DB_PASS=your_database_password
CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
JWT_SECRET=your_jwt_secret
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm start
Frontend Setup
Navigate to the frontend directory:

bash
Copy code
cd frontend
Install dependencies:

bash
Copy code
npm install
Create a .env file in the frontend directory and add the following variable:

env
Copy code
REACT_APP_API_URL=http://localhost:5000
Start the frontend server:

bash
Copy code
npm start
Running the Application
Backend: Runs on http://localhost:4444
Frontend: Runs on http://localhost:3000
