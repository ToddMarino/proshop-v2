import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import users from './data/users.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    // dump all current data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // insert users into MongoDB and create variable to hold all users
    const createdUsers = await User.insertMany(users);

    // assign first user the role of admin
    const adminUser = createdUsers[0]._id;

    // create array of all products and add the adminUser
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    // insert sampleProducts array into MongoDB
    await Product.insertMany(sampleProducts);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    // dump all current data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
