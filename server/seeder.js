/**
 * Title: seeder.js
 * Author: Nathaniel Liebhart
 * Description: bcrs-api
 */
const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const User = require('./models/User');
const SecurityQuestion = require('./models/SecurityQuestion');
const Role = require('./models/Role');
const Invoice = require('./models/Invoice');
const Service = require('./models/Service');
// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

// Read json files
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'));

const securityQuestions = JSON.parse(fs.readFileSync(`${__dirname}/_data/securityQuestions.json`, 'utf-8'));

const roles = JSON.parse(fs.readFileSync(`${__dirname}/_data/roles.json`, 'utf-8'));

const invoices = JSON.parse(fs.readFileSync(`${__dirname}/_data/invoices.json`, 'utf-8'));

const services = JSON.parse(fs.readFileSync(`${__dirname}/_data/services.json`, 'utf-8'));

// Import into DB
const importData = async () => {
  try {
    await User.create(users);
    await SecurityQuestion.create(securityQuestions);
    await Role.create(roles);
    await Invoice.create(invoices);
    await Service.create(services);
    console.log('Data Imported...'.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    await User.deleteMany();
    await SecurityQuestion.deleteMany();
    await Role.deleteMany();
    await Invoice.deleteMany();
    await Service.deleteMany();
    console.log('Data Destoryed...'.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Used to decide to import or delete data
// run node seeder -i in the console to import data
// run node seeder -d in the console to delete data
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}
