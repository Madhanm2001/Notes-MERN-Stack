import { Request, Response } from 'express';
import AuthModel from '../models/auth.model';
import bcrypt from 'bcryptjs';

export const getProfile: any = async (req: Request, res: Response) => {
    try {

        const decode = (req as any).user;

        console.log(decode);


        const Data = await AuthModel.findOne({userId:decode.userId});

        if (!Data) {
            return res.status(400).json({ message: 'user is not found by this Id.' });
        }
        const { username, name, phoneNumber, email } = Data
        const profile = { username, name, phoneNumber, email }

        return res.status(201).json({ profile });

    }

    catch (error) {

        res.status(500).json({ message: 'Server error' });

    }
};

export const updateProfile: any = async (req: Request, res: Response) => {
    try {

        const { username, phoneNumber, email, name } = req.body;

        if (!username || !phoneNumber || !email || !name) {
            return res.status(400).json({ message: 'enter all the required data.' });
        }

        const decode = (req as any).user;

        const Data = await AuthModel.findOneAndUpdate({userId:decode.userId}, req.body, { new: true });

        if (!Data) {
            return res.status(400).json({ message: 'Profile is not found by this Id.' });
        }

        return res.status(201).json("Profile Data is Updated.")

    }

    catch (error) {

     res.status(500).json({ message: 'Server error' });

    }
};

export const changePassword: any = async (req: Request, res: Response) => {
    try {
        const { oldPassword, newPassword } = req.body

        const decode = (req as any).user;

        if (!oldPassword || !newPassword) {

            return res.status(400).json('enter both password and confirm password')

        }

        if (oldPassword == newPassword) {

            return res.status(400).json('new password is must be different')

        }
        const current=await AuthModel.findOne({userId:decode.userId})

        console.log(current,"hashjahsj");

        if(!current){

            return res.status(400).json('user is Invalid')

        }

        const isMatch = await bcrypt.compare(oldPassword,current.password);
        const newHashedPassword=await bcrypt.hash(newPassword,10);

        console.log(isMatch,"isMatch");
        
        if(!isMatch){

            return res.status(400).json('enter valid old password')

        }

        const UpdatedProfile={
            username:current.username,
            password:newHashedPassword,
            userId:current.userId,
            name:current.name,
            phoneNumber:current.phoneNumber
        }

        await AuthModel.findOneAndUpdate({userId:decode.userId},UpdatedProfile)

        return res.status(201).json("password is changed successfully")

    }

    catch (error) {

    res.status(500).json({ message: 'Server error' });

    }
};

