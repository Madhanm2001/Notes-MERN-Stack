"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const profile_controller_1 = require("../controllers/profile.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const profileRouter = express_1.default.Router();
profileRouter.get('/', auth_middleware_1.authenticateJWT, profile_controller_1.getProfile);
profileRouter.patch('/update', auth_middleware_1.authenticateJWT, profile_controller_1.updateProfile);
profileRouter.patch('/change-password', auth_middleware_1.authenticateJWT, profile_controller_1.changePassword);
exports.default = profileRouter;
