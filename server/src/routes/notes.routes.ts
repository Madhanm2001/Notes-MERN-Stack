import express from 'express';
import { createNote,getNotes,getNote,updateNote,deleteNote,searchNotes,noteArchived,noteUnArchived,notePinned,noteUnpinned,getAllNotes } from '../controllers/note.controller';
import { authenticateJWT } from '../middlewares/auth.middleware';

const notesRouter = express.Router();

notesRouter.get('/',authenticateJWT,getAllNotes);
notesRouter.put('/create/:folderId',authenticateJWT,createNote);
notesRouter.get('/getAll/:folderId',authenticateJWT,getNotes);
notesRouter.get('/get/:noteId',authenticateJWT,getNote);
notesRouter.put('/update/:noteId',authenticateJWT,updateNote);
notesRouter.put('/archived/:noteId',authenticateJWT,noteArchived);
notesRouter.put('/unarchived/:noteId',authenticateJWT,noteUnArchived);
notesRouter.put('/pinned/:noteId',authenticateJWT,notePinned);
notesRouter.put('/unpinned/:noteId',authenticateJWT,noteUnpinned);
notesRouter.delete('/:noteId',authenticateJWT,deleteNote);
notesRouter.get('/search/:folderId',authenticateJWT,searchNotes);

export default notesRouter;
