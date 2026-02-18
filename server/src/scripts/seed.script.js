import mongoose from 'mongoose';
import { hash } from 'argon2';
import User from '../models/user.model.js';
import { MONGO_URI } from '../config/env.config.js';

const seedAdmin = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
    const existingAdmin = await User.findOne({ role: 'admin' });

    if (existingAdmin) {
      console.log('Admin user already exists. Skipping seed.');
      return;
    }
    const hashedPassword = await hash('admin123');
    const admin = new User({
      email: 'admin@controlacrm.com',
      password: hashedPassword,
      role: 'admin',
      active: true,
      createdBy: null,
    });
    await admin.save();
    console.log('Admin user created successfully');
    console.log(`Email: admin@controlacrm.com`);
    console.log(`Password: admin123`);
  } catch (error) {
    console.error('Error seeding admin user:', error.message);
    process.exit(1);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected');
  }
};

seedAdmin();
