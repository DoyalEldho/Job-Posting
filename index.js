const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');
const authRouter = require('./routes/authRoutes');
const jobRouter = require('./routes/jobRoutes');
const applicationRouter = require('./routes/applicationRoutes');
const path = require('path');


dotenv.config();
const app =express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true             
}));

app.use(cookieParser());
app.use('/auth',authRouter);
app.use(jobRouter);
app.use(applicationRouter);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Server setup
connectDB();
app.listen(5000, () => {
  console.log("Server is up and running on port 5000");
});