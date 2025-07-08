"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteUnpinned = exports.notePinned = exports.noteUnArchived = exports.noteArchived = exports.searchNotes = exports.searchAllNotes = exports.deleteNote = exports.updateNote = exports.getAllNotes = exports.getNote = exports.getNotes = exports.createNote = void 0;
const notes_model_1 = __importDefault(require("../models/notes.model"));
const uuid_1 = require("../utils/uuid");
const createNote = async (req, res) => {
    try {
        const { name, content } = req.body;
        const decode = req.user;
        const { folderId } = req.params;
        if (!name || !content || !folderId) {
            return res.status(400).json('both note name and content are required');
        }
        const data = {
            name,
            content,
            folderId,
            noteId: (0, uuid_1.generateUUID)(),
            isDeleted: false,
            isArchived: false,
            isPinned: false,
            userId: decode.userId
        };
        await notes_model_1.default.create(data);
        return res.status(201).json('note is created successfully');
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.createNote = createNote;
const getNotes = async (req, res) => {
    const { folderId } = req.params;
    const { filter, sort, page, limit } = req.query;
    const decode = req.user;
    try {
        const query = { folderId, isDeleted: false, userId: decode.userId };
        if (filter === 'archived') {
            query.isArchived = true;
        }
        else if (filter === 'active') {
            query.isArchived = false;
        }
        let sortOption = {};
        switch (sort) {
            case 'atoz':
                sortOption = { isPinned: -1, name: 1 };
                break;
            case 'ztoa':
                sortOption = { isPinned: -1, name: -1 };
                break;
            case 'newtoold':
                sortOption = { isPinned: -1, updatedAt: -1 };
                break;
            case 'oldtonew':
                sortOption = { isPinned: -1, updatedAt: 1 };
                break;
            default:
                sortOption = { isPinned: -1, updatedAt: -1 };
        }
        const pageNumber = parseInt(page) || 1;
        const limitNumber = parseInt(limit) || 10;
        const skip = (pageNumber - 1) * limitNumber;
        const totalNotes = await notes_model_1.default.countDocuments(query);
        const notes = await notes_model_1.default
            .find(query)
            .select('name noteId updatedAt isPinned -_id')
            .sort(sortOption)
            .skip(skip)
            .limit(limitNumber);
        return res.status(200).json({ notes, totalNotes });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getNotes = getNotes;
const getNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        const decode = req.user;
        const note = await notes_model_1.default.findOne({ noteId, userId: decode.userId, isDeleted: false });
        if (!note) {
            return res.status(400).json('note not found');
        }
        res.status(200).json(note);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getNote = getNote;
const getAllNotes = async (req, res) => {
    console.log("jhdfjshjfhsjfhsjf", "jhsjdhsd");
    const { filter, sort, page, limit } = req.query;
    const decode = req.user;
    try {
        const query = { isDeleted: false, userId: decode.userId };
        if (filter === 'archived') {
            query.isArchived = true;
        }
        else if (filter === 'active') {
            query.isArchived = false;
        }
        let sortOption = {};
        switch (sort) {
            case 'atoz':
                sortOption = { isPinned: -1, name: 1 };
                break;
            case 'ztoa':
                sortOption = { isPinned: -1, name: -1 };
                break;
            case 'newtoold':
                sortOption = { isPinned: -1, updatedAt: -1 };
                break;
            case 'oldtonew':
                sortOption = { isPinned: -1, updatedAt: 1 };
                break;
            default:
                sortOption = { isPinned: -1, updatedAt: -1 };
        }
        const pageNumber = parseInt(page) || 1;
        const limitNumber = parseInt(limit) || 10;
        const skip = (pageNumber - 1) * limitNumber;
        const totalNotes = await notes_model_1.default.countDocuments(query);
        const notes = await notes_model_1.default
            .find(query)
            .select('name noteId updatedAt isPinned -_id')
            .sort(sortOption)
            .skip(skip)
            .limit(limitNumber);
        return res.status(200).json({ notes, totalNotes });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getAllNotes = getAllNotes;
const updateNote = async (req, res) => {
    try {
        const { name, content } = req.body;
        const decode = req.user;
        const { noteId } = req.params;
        if (!name || !content) {
            return (res.status(400).json('both name and content are required'));
        }
        const note = await notes_model_1.default.findOneAndUpdate({ noteId, userId: decode.userId, isDeleted: false }, { name, content });
        console.log(note);
        if (!note) {
            return res.status(400).json('note not found');
        }
        res.status(200).json("note is updated");
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.updateNote = updateNote;
const deleteNote = async (req, res) => {
    try {
        const { noteId } = req.params;
        const decode = req.user;
        const note = await notes_model_1.default.findOneAndUpdate({ noteId, userId: decode.userId, isDeleted: false }, { isDeleted: true });
        console.log(note);
        if (!note) {
            return res.status(400).json('note not found');
        }
        res.status(200).json("note is deleted");
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.deleteNote = deleteNote;
const searchAllNotes = async (req, res) => {
    try {
        const { name } = req.query;
        const decode = req.user;
        const notes = await notes_model_1.default.find({
            name: { $regex: name, $options: 'i' },
            userId: decode.userId
        }).select('name noteId updatedAt -_id');
        console.log(notes);
        if (!notes) {
            return res.status(400).json('no more notes are not found based on this name');
        }
        res.status(200).json(notes);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.searchAllNotes = searchAllNotes;
const searchNotes = async (req, res) => {
    try {
        const { name } = req.query;
        const { folderId } = req.params;
        const decode = req.user;
        const notes = await notes_model_1.default.find({
            name: { $regex: name, $options: 'i' },
            folderId,
            userId: decode.userId
        }).select('name noteId updatedAt -_id');
        console.log(notes);
        if (!notes) {
            return res.status(400).json('no more notes are not found based on this name');
        }
        res.status(200).json(notes);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.searchNotes = searchNotes;
const noteArchived = async (req, res) => {
    try {
        const { noteId } = req.params;
        const decode = req.user;
        const note = await notes_model_1.default.findOneAndUpdate({ noteId, userId: decode.userId }, { isArchived: true });
        console.log(note);
        if (!note) {
            return res.status(400).json('note not found');
        }
        res.status(200).json("note is archived successfully");
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.noteArchived = noteArchived;
const noteUnArchived = async (req, res) => {
    try {
        const { noteId } = req.params;
        const decode = req.user;
        const note = await notes_model_1.default.findOneAndUpdate({ noteId, userId: decode.userId }, { isArchived: false });
        console.log(note);
        if (!note) {
            return res.status(400).json('note not found');
        }
        res.status(200).json("note is unarchived successfully");
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.noteUnArchived = noteUnArchived;
const notePinned = async (req, res) => {
    try {
        const { noteId } = req.params;
        const decode = req.user;
        const note = await notes_model_1.default.findOneAndUpdate({ noteId, userId: decode.userId }, { isPinned: true });
        console.log(note);
        if (!note) {
            return res.status(400).json('note not found');
        }
        res.status(200).json("note is Pinned successfully");
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.notePinned = notePinned;
const noteUnpinned = async (req, res) => {
    try {
        const { noteId } = req.params;
        const decode = req.user;
        const note = await notes_model_1.default.findOneAndUpdate({ noteId, userId: decode.userId }, { isPinned: false });
        console.log(note);
        if (!note) {
            return res.status(400).json('note not found');
        }
        res.status(200).json("note is unpinned successfully");
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.noteUnpinned = noteUnpinned;
