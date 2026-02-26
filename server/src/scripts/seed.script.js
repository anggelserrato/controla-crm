import { hash } from 'argon2';
import User from '../models/user.model.js';
import { ADMIN_USER, ADMIN_PASSWORD } from '../config/env.config.js';

export const seedAdmin = async () => {
  try {
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('✓ Admin user already exists. Skipping seed.');
      return;
    }
    const hashedPassword = await hash(ADMIN_PASSWORD);
    const admin = new User({
      email: ADMIN_USER,
      password: hashedPassword,
      role: 'admin',
      active: true,
      createdBy: null,
    });
    await admin.save();
    console.log('✓ Admin user created successfully');
  } catch (error) {
    console.error('✗ Error seeding admin user:', error.message);
  }
};
