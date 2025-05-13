// database.js
const mongoose = require('mongoose');
require('dotenv').config();

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'warrantyActivationSystem';

let connection = null;

async function connectDB() {
  const options = {
    maxPoolSize: 100,       // Maximum number of connections in pool (default is 100)
    minPoolSize: 2,         // Minimum number of connections in pool
    serverSelectionTimeoutMS: 5000, // How long to try selecting server before error
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4               // Use IPv4, skip trying IPv6
  };
  try {
    await mongoose.connect(`${mongoURI}/${dbName}`, options);
    connection = mongoose.connection;
    connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error.message);
    throw error;
  }
}

function getDB() {
  if (!connection) {
    throw new Error('Database not initialized. Call connectDB first.');
  }
  return connection.db;
}

async function closeDB() {
  if (connection) {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

module.exports = {
  connectDB,
  getDB,
  closeDB,
};