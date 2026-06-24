import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import studentRoutes from './routes/studentRoutes';
import { errorHandler } from './middleware/errorMiddleware';
import sequelize from './config/database';

export const app = express();

// Security Middlewares
app.use(helmet({
  contentSecurityPolicy: false // Disabled for dev preview if needed, but keeping simple
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api/', apiLimiter);

// Routes
app.use('/api/students', studentRoutes);

// Error Handling Middleware
app.use(errorHandler);

// Initialize Database connection
const initDb = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    // Sync models
    await sequelize.sync({ alter: true });
    console.log('Models synchronized.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

initDb();
