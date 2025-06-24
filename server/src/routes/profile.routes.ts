import express from 'express';
import { getProfile,updateProfile,changePassword } from '../controllers/profile.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const profileRouter = express.Router();

profileRouter.get('/',authenticateJWT,getProfile);
profileRouter.patch('/update',authenticateJWT,updateProfile);
profileRouter.patch('/change-password',authenticateJWT,changePassword);


export default profileRouter;
