import express from 'express';
import morgan from 'morgan';
import connectToDatabase from './database/mongoConnect.js';
import dotenv from 'dotenv';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
// import arcjetMiddleware from './middlewares/arcjet.middleware.js';
import subscriptionRouter from './routes/subscription.routes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan('dev'));
// app.use(arcjetMiddleware);

// .env config
dotenv.config();

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);


// middleware to handle errors
app.use(errorMiddleware);


const PORT = process.env.PORT;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectToDatabase();
})