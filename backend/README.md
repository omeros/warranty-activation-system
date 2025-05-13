# Node.js Authentication Server

A complete authentication server built with Node.js, Express, and MongoDB for your React Native application.

## Features

- User registration (signup)
- User authentication (login)
- JWT token-based authorization
- Password hashing with bcrypt
- Protected routes
- Error handling
- User profile management

## Prerequisites

- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. Clone the repository or copy the files to your project directory
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/auth_demo
JWT_SECRET=your_super_secure_jwt_secret_key
```

Replace the `MONGO_URI` with your MongoDB connection string and choose a secure `JWT_SECRET`.

## Running the Server

### Development mode (with nodemon):

```bash
npm run dev
```

### Production mode:

```bash
npm start
```

## API Endpoints

### Authentication

- **POST /api/auth/signup** - Register a new user
  - Request body: `{ username, password, fullname, email }`
  - Response: `{ token, user: { id, username, fullname, email } }`

- **POST /api/auth/login** - Authenticate a user
  - Request body: `{ username, password }`
  - Response: `{ token, user: { id, username, fullname, email } }`

### User Management

- **GET /api/users/profile** - Get authenticated user's profile
  - Headers: `Authorization: Bearer {token}`
  - Response: `{ id, username, fullname, email }`

- **PUT /api/users/profile** - Update user profile
  - Headers: `Authorization: Bearer {token}`
  - Request body: `{ fullname, email }`
  - Response: `{ id, username, fullname, email }`

- **PUT /api/users/change-password** - Change user password
  - Headers: `Authorization: Bearer {token}`
  - Request body: `{ currentPassword, newPassword }`
  - Response: `{ message: 'Password updated successfully' }`

## Connection with React Native Frontend

Update your React Native frontend API configuration to point to your Node.js server:

```javascript
// In your services/api.ts file
const api = axios.create({
  baseURL: 'http://your-server-ip:5000/api',
  // ...
});
```

For local development:
- Use `baseURL: 'http://10.0.2.2:5000/api'` for Android emulator
- Use `baseURL: 'http://localhost:5000/api'` for iOS simulator

## Security Notes

- For production, use a secure and unique JWT secret key
- Consider adding rate limiting for login attempts
- Use HTTPS in production
- Consider adding refresh token functionality for better security