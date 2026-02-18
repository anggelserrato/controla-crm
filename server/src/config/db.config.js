import mongoose from 'mongoose';
import { MONGO_URI } from './env.config.js';

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    mongoose.connection.on('connected', () => {
      console.log('✅ MongoDB connected');
    });
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });
    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
