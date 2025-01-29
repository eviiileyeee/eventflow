const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const eventRoutes = require('./routes/eventRoutes');
const authRoutes = require("./routes/authRoutes");
require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Routes
app.use('/api/v1/events', eventRoutes);
app.use("/api/users",authRoutes);
app.get("/",(req,res)=>   res.send("this is backend of Harendra edc-project"));

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});
