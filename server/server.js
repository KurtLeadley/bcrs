/**
 * Title: server.js
 * Author: Nathaniel Liebhart
 * Description: bcrs-api
 */
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
const errorHandler = require('./middleware/error');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route files
const auth = require('./routes/auth');
const users = require('./routes/users');
const securityQuestions = require('./routes/security-questions');

// Initialize express
const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Development logger middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Sanitize data to protect against SQL injection
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevents cross site scripting attacks
app.use(xss());

// Rate limiting
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});

app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/security-questions', securityQuestions);

// Initilize errorHandler middleware
// mounted routes must be mounted before this statement
// in order to use the middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled Promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`ERROR: ${err.message}`.red);
  // Close server and exit process
  server.close(() => process.exit(1));
});
