import dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './app/modules/User/Users.model.js'; 
import connectDB from './config/db.js'; 

dotenv.config();

const createFirstUser = async () => {
  try {
    await connectDB();
    console.log('✅ Database connected.');


    const adminData = {
      email: 'admin@admin.com', 
      password: '12345678', 
      name: 'Sadat Admin',
      employeeId: 'ADMIN-001',
      phone: '0000000000',
      role: 'admin', 
      department: 'Management',
      branch: 'Headquarters',
      shift: 'full-time',
      salary: 0, 
      status: 'active'
    };


    const existingUser = await User.findOne({ email: adminData.email });
    
    if (existingUser) {
      console.log(`⚠️  User with email ${adminData.email} already exists.`);
      await mongoose.disconnect();
      process.exit(0);
    }


    const newUser = new User(adminData);
    await newUser.save();

    console.log('=========================================');
    console.log(`✅ ADMIN CREATED SUCCESSFULLY`);
    console.log(`📧 Email: ${adminData.email}`);
    console.log(`🔑 Password: ${adminData.password}`);
    console.log('=========================================');

    await mongoose.disconnect();
    console.log('- Database disconnected.');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error creating admin:', error.message);
    if (error.name === 'ValidationError') {
        console.error('Details:', error.errors);
    }
    await mongoose.disconnect();
    process.exit(1);
  }
};

createFirstUser();