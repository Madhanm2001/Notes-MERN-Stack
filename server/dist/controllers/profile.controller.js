"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.updateProfile = exports.getProfile = void 0;
const auth_model_1 = __importDefault(require("../models/auth.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getProfile = async (req, res) => {
    try {
        const decode = req.user;
        console.log(decode);
        const Data = await auth_model_1.default.findOne({ userId: decode.userId });
        if (!Data) {
            return res.status(400).json({ message: 'user is not found by this Id.' });
        }
        const { username, name, phoneNumber, email } = Data;
        const profile = { username, name, phoneNumber, email };
        return res.status(201).json({ profile });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getProfile = getProfile;
const updateProfile = async (req, res) => {
    try {
        const { username, phoneNumber, email, name } = req.body;
        if (!username || !phoneNumber || !email || !name) {
            return res.status(400).json({ message: 'enter all the required data.' });
        }
        const decode = req.user;
        const existingUser = await auth_model_1.default.findOne({ userId: !decode.userId,
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
        const Data = await auth_model_1.default.findOneAndUpdate({ userId: decode.userId }, req.body, { new: true });
        if (!Data) {
            return res.status(400).json({ message: 'Profile is not found by this Id.' });
        }
        return res.status(201).json("Profile Data is Updated.");
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.updateProfile = updateProfile;
const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        const decode = req.user;
        if (!oldPassword || !newPassword) {
            return res.status(400).json('enter both password and confirm password');
        }
        if (oldPassword == newPassword) {
            return res.status(400).json('new password is must be different');
        }
        const current = await auth_model_1.default.findOne({ userId: decode.userId });
        console.log(current, "hashjahsj");
        if (!current) {
            return res.status(400).json('user is Invalid');
        }
        const isMatch = await bcryptjs_1.default.compare(oldPassword, current.password);
        const newHashedPassword = await bcryptjs_1.default.hash(newPassword, 10);
        console.log(isMatch, "isMatch");
        if (!isMatch) {
            return res.status(400).json('enter valid old password');
        }
        const UpdatedProfile = {
            username: current.username,
            password: newHashedPassword,
            userId: current.userId,
            name: current.name,
            phoneNumber: current.phoneNumber
        };
        await auth_model_1.default.findOneAndUpdate({ userId: decode.userId }, UpdatedProfile);
        return res.status(201).json("password is changed successfully");
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.changePassword = changePassword;
