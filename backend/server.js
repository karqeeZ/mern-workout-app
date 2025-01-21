import 'dotenv/config'; // Load environment variables
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'; // Use import for CORS since it's an ES module
import workoutRoutes from './routes/workouts.js'; // Ensure to include the .js extension

// Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON body
app.use(cors()); // Enable CORS for all routes

// Log requests
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/workouts', workoutRoutes);

// Connect to the database
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to database');
    // Listen on the specified port
    app.listen(process.env.PORT, () => {
      console.log('Listening for requests on port', process.env.PORT);
    });
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });
