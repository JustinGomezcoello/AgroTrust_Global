# World ID Authentication Demo

This project demonstrates how to implement World ID authentication in a React application, allowing users to verify their identity using Proof of Personhood without revealing personal information.

## What is World ID?

World ID is a privacy-first identity protocol that allows individuals to prove they are unique humans without sharing personal data. It uses zero-knowledge proofs to verify identity while preserving privacy.

## Prerequisites

- Node.js and npm installed on your machine
- A World ID App (get one at [https://developer.worldcoin.org](https://developer.worldcoin.org))
- The App ID from your World ID application

## Project Structure

```
world-id-demo/
├── public/
│   └── worldcoin-icon.svg
├── src/
│   ├── components/
│   │   └── Navbar.tsx
│   ├── context/
│   │   └── AuthContext.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   └── DashboardPage.tsx
│   ├── server/
│   │   └── index.js
│   ├── App.tsx
│   └── main.tsx
├── package.json
└── README.md
```

## Step-by-Step Implementation Guide

### Step 1: Install Dependencies

The package.json already includes all required dependencies:
- @worldcoin/idkit for World ID integration
- react-router-dom for navigation
- axios for API requests
- express for the backend server

The dependencies will be installed automatically when the project is first run.

### Step 2: Set Up the Frontend

The frontend consists of:
1. **HomePage**: Contains the World ID verification button
2. **DashboardPage**: Displayed after successful verification
3. **Navbar**: Navigation between pages
4. **AuthContext**: Manages authentication state

### Step 3: Set Up the Backend

The backend server handles the verification of World ID proofs:
1. Receives proof data from the frontend
2. Verifies the proof with the World ID API
3. Returns success or failure to the frontend

### Step 4: Running the Application

1. Start the backend server:
   ```
   npm run server
   ```

2. In a new terminal, start the frontend:
   ```
   npm run dev
   ```

3. Open your browser and navigate to the provided URL (usually http://localhost:5173)

### Step 5: Testing the Integration

1. Click "Verify with World ID" on the homepage
2. Complete the verification process
3. Upon successful verification, you'll be redirected to the dashboard

## Important Notes

- This demo uses the World ID app_id you provided
- The verification level is set to "Orb" in the demo, but can be changed to "Device" or "Phone" as needed
- The backend server runs on port 3001 by default

## Learn More

For more information on World ID integration, check out:
- [World ID Documentation](https://docs.worldcoin.org/id/cloud)
- [IDKit GitHub Repository](https://github.com/worldcoin/idkit)