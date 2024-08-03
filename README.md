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

# Navigate to the backend directory
cd backend

# Install backend dependencies
npm install

# Create a .env file in the backend directory and add the following variables
echo "DB_HOST=dpg-cqme1p1u0jms73frbfl0-a.ohio-postgres.render.com
DB_PORT=5432
DB_NAME=neame your db
DB_USER=username you habve setted
DB_PASS=ex123
CLOUD_NAME=yourcloudinary name
API_KEY=cloudinaryapi
API_SECRET=the secret  from  cloudinary
JWT_SECRET=secret to you  in authehtication
JWT_EXP=time  your want the password token  to expire
EMAIL_USER=email used as sent from
EMAIL_PASS=
server_PORT=4444" > .env

# Run migrations and seed the database
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

# Start the backend server
npm start

# Open a new terminal tab or window to set up the frontend

# Navigate to the frontend directory
cd frontend

# Install frontend dependencies
npm install

# Create a .env file in the frontend directory and add the following variable
echo "REACT_APP_API_URL=http://localhost:4444" > .env

# Start the frontend server
npm start

# Running the Application
echo "Backend runs on http://localhost:4444"
echo "Frontend runs on http://localhost:3000"
