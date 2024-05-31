# Risk Management Application

This project is a full-stack application for managing risks and categories. It includes features for creating, updating, and deleting risks and categories, as well as searching and inline editing.

## Tech Stack

- **Frontend**: React, TypeScript, Apollo Client, Tailwind CSS
- **Backend**: Node.js, Apollo Server, GraphQL, MongoDB, Mongoose

## Features

- Add, remove, and update risks and categories
- Inline editing of risk and category names and descriptions
- Status update for risks
- Search functionality for filtering risks and categories
- Pagination for large datasets
- Custom Notifications (from my older project)

## Prerequisites

- Node.js (v20 or later)
- npm (v10 or later)
- MongoDB

## Setup Instructions

### 1. Clone the Repository
git clone <repository-url>
cd risk-management

### 2. Backend Setup

#### Install Dependencies
cd backend
npm install

#### Create Environment File
Create a .env file in the backend directory and add your MongoDB connection string:
MONGODB_URI=mongodb://...

#### Seed the Database
You can seed the database with initial data using the SeedDatabase function in index.js file

#### Start the Server
npm start
The server will run on http://localhost:4000/

### 3. Frontend Setup
#### Install Dependencies
cd ../frontend
npm install

#### Start the Frontend
npm start
The frontend will run on http://localhost:3000 or YOUR_LOCAL_IP:3000

### 4. Running the Application
Once both the backend and frontend are running, you can access the application at http://localhost:3000.

### 5. Usage
Login: Navigate to the login page and enter your username.
Add Risks and Categories: Use the forms to add new risks and categories.
Edit Risks and Categories: Click on the name or description of a risk or category to edit it.
Update Status: Click on the status of a risk to toggle between "Resolved" and "Unresolved".
Search: Use the search bar to filter risks and categories by name or description.
Pagination: Navigate through pages using the "Previous" and "Next" buttons at the bottom of the tables.

**License**
This project is licensed under the MIT License. See the LICENSE file for details.

**Contributing**
Contributions are welcome! Please open an issue or submit a pull request for any changes.