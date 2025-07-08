import express from 'express';
import { createFolder,getFolders,getFolder,updateFolder,deleteFolder,searchFolders,getCategories, getFoldersByFilter } from '../controllers/folder.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const folderRouter = express.Router();

folderRouter.post('/',authenticateJWT,createFolder);
folderRouter.get('/',authenticateJWT,getFoldersByFilter);
folderRouter.get('/getFolders',authenticateJWT,getFolders);
folderRouter.get('/search',authenticateJWT,searchFolders);
folderRouter.get('/categories',authenticateJWT,getCategories);
folderRouter.get('/:folderId',authenticateJWT,getFolder);
folderRouter.put('/:folderId',authenticateJWT,updateFolder);
folderRouter.delete('/:folderId',authenticateJWT,deleteFolder);

export default folderRouter;
