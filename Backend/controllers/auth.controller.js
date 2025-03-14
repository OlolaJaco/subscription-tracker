import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/user.models.js";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const { name, email, password } = req.body;

        // check if the user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            const error = new Error('User already exists');
            error.statusCode = 409;
            throw error;
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUsers = await User.create([{
            name,
            email,
            password: hashedPassword
        }], { session });

        const token = jwt.sign({ userId: newUsers[0]._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        await session.commitTransaction();
        session.endSession();

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            data: {
                user: newUsers[0],
                token
            }
        })
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
}

export const signIn = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            const error = new Error('Invalid credentials');
            error.statusCode = 401;
            throw error;
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            data: {
                user,
                token
            }
        })
    } catch (error) {
        next(error);
    }
}

export const signOut = async (req, res, next) => {}