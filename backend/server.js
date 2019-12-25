const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const wheather = require('./routes/wheather');


const errorHandler = require('./middleware/error');
// load .env
dotenv.config(); 
const app = express();

// body parser
app.use(express.json());

// cors
app.use(cors())

app.use('/api/weather', wheather);
app.use(errorHandler);
// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in http://localhost:${PORT} ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  // server.close(() => process.exit(1));
});