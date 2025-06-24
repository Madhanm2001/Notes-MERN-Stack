import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import AuthModel from '../models/auth.model';
import { signToken } from '../utils/jwt';
import { generateUUID } from '../utils/uuid';

export const signUp: any = async (req: Request, res: Response) => {
  try {
    const { username, password, confirmPassword, phoneNumber, email, name } = req.body;

    if (!username || !password || !confirmPassword || !phoneNumber || !email || !name) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    const emailId=await AuthModel.findOne({ email: email });
    const userName=await AuthModel.findOne({ username: username });

    if (userName) {
      return res.status(400).json({ message: 'User with the same username already exists.' });
    }

    if (emailId) {
      return res.status(400).json({ message: 'User with the same email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new AuthModel({
      username,
      password: hashedPassword,
      email,
      phoneNumber,
      name,
      userId: generateUUID()
    });

    await newUser.save();

    return res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const signIn: any = async (req: Request, res: Response) => {
  try {
    const { usernameoremail, password } = req.body;

    if (!usernameoremail || !password) {
      return res.status(400).json({ message: 'Username or email and password are required.' });
    }

    const user = await AuthModel.findOne({
      $or: [
        { username: usernameoremail },
        { email: usernameoremail }
      ]
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid username or email.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password.' });
    }

    const token = signToken({
      userId: user.userId,
      username: user.username
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server error' });
  }
};


