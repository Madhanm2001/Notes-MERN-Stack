"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_model_1 = __importDefault(require("../models/auth.model"));
const jwt_1 = require("../utils/jwt");
const uuid_1 = require("../utils/uuid");
const signUp = async (req, res) => {
    try {
        const { username, password, confirmPassword, phoneNumber, email, name } = req.body;
        if (!username || !password || !confirmPassword || !phoneNumber || !email || !name) {
            return res.status(400).json({ message: 'All fields are required.' });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match.' });
        }
        const existingUser = await auth_model_1.default.findOne({
            $or: [
                { username },
                { email }
            ]
        });
        if (existingUser) {
            if (username == existingUser.username) {
                return res.status(400).json({ message: 'User with the same username already exists.' });
            }
            else {
                return res.status(400).json({ message: 'User with the same email already exists.' });
            }
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const newUser = new auth_model_1.default({
            username,
            password: hashedPassword,
            email,
            phoneNumber,
            name,
            userId: (0, uuid_1.generateUUID)()
        });
        await newUser.save();
        return res.status(201).json({ message: 'User registered successfully.' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.signUp = signUp;
const signIn = async (req, res) => {
    try {
        const { usernameoremail, password } = req.body;
        if (!usernameoremail || !password) {
            return res.status(400).json({ message: 'Username or email and password are required.' });
        }
        const user = await auth_model_1.default.findOne({
            $or: [
                { username: usernameoremail },
                { email: usernameoremail }
            ]
        });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or email.' });
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid password.' });
        }
        const token = (0, jwt_1.signToken)({
            userId: user.userId,
            username: user.username
        });
        return res.status(200).json({ token });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};
exports.signIn = signIn;
