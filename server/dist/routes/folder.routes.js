"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const folder_controller_1 = require("../controllers/folder.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const folderRouter = express_1.default.Router();
folderRouter.post('/', auth_middleware_1.authenticateJWT, folder_controller_1.createFolder);
folderRouter.get('/', auth_middleware_1.authenticateJWT, folder_controller_1.getFolders);
folderRouter.get('/search', auth_middleware_1.authenticateJWT, folder_controller_1.searchFolders);
folderRouter.get('/categories', auth_middleware_1.authenticateJWT, folder_controller_1.getCategories);
folderRouter.get('/:folderId', auth_middleware_1.authenticateJWT, folder_controller_1.getFolder);
folderRouter.put('/:folderId', auth_middleware_1.authenticateJWT, folder_controller_1.updateFolder);
folderRouter.delete('/:folderId', auth_middleware_1.authenticateJWT, folder_controller_1.deleteFolder);
exports.default = folderRouter;
