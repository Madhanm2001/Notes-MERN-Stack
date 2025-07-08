"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchFolders = exports.deleteFolder = exports.updateFolder = exports.getFolder = exports.getCategories = exports.getFolders = exports.createFolder = void 0;
const folder_model_1 = __importDefault(require("../models/folder.model"));
const notes_model_1 = __importDefault(require("../models/notes.model"));
const uuid_1 = require("../utils/uuid");
const createFolder = async (req, res) => {
    try {
        const { name, category } = req.body;
        const decode = req.user;
        if (!name) {
            return res.status(400).json('enter folder name');
        }
        const data = {
            name,
            folderId: (0, uuid_1.generateUUID)(),
            category: category ? category : null,
            isDeleted: false,
            userId: decode.userId
        };
        await folder_model_1.default.create(data);
        return res.status(201).json('folder is created successfully');
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.createFolder = createFolder;
const getFolders = async (req, res) => {
    try {
        const { category, sort, page, limit } = req.query;
        const decode = req.user;
        let folders;
        let query = {};
        if (category) {
            query = { isDeleted: false, category, userId: decode.userId };
        }
        else {
            query = { isDeleted: false, userId: decode.userId };
        }
        let sortOption = {};
        switch (sort) {
            case 'atoz':
                sortOption = { name: 1 };
                break;
            case 'ztoa':
                sortOption = { name: -1 };
                break;
            case 'newtoold':
                sortOption = { updatedAt: -1 };
                break;
            case 'oldtonew':
                sortOption = { updatedAt: 1 };
                break;
            default:
                sortOption = { updatedAt: -1 };
        }
        const pageNumber = parseInt(page) || 1;
        const limitNumber = parseInt(limit) || 1;
        const skip = (pageNumber - 1) * limitNumber;
        const totalFolders = await folder_model_1.default.countDocuments({
            ...query,
            userId: decode.userId
        });
        folders = await folder_model_1.default
            .find(query)
            .select('name folderId updatedAt -_id')
            .sort(sortOption)
            .skip(skip)
            .limit(limitNumber);
        return res.status(201).json({ folders, totalFolders });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getFolders = getFolders;
const getCategories = async (req, res) => {
    try {
        const decode = req.user;
        const uniqueCategories = await folder_model_1.default.distinct('category', { userId: decode.userId, isDeleted: false, category: { $ne: null } });
        return res.status(201).json(uniqueCategories);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getCategories = getCategories;
const getFolder = async (req, res) => {
    try {
        const { folderId } = req.params;
        const decode = req.user;
        const folder = await folder_model_1.default.findOne({ folderId, isDeleted: false, userId: decode.userId });
        if (!folder) {
            return res.status(400).json('folder not found');
        }
        res.status(200).json(folder);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getFolder = getFolder;
const updateFolder = async (req, res) => {
    try {
        const { name, category } = req.body;
        const { folderId } = req.params;
        const decode = req.user;
        if (!name) {
            return res.status(400).json('folder name is required');
        }
        const folder = await folder_model_1.default.findOneAndUpdate({ folderId, isDeleted: false, userId: decode.userId }, { name, category: category ? category : null });
        console.log(folder);
        if (!folder) {
            return res.status(400).json('folder not found');
        }
        res.status(200).json("folder is updated");
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.updateFolder = updateFolder;
const deleteFolder = async (req, res) => {
    try {
        const { folderId } = req.params;
        const decode = req.user;
        const folder = await folder_model_1.default.findOneAndUpdate({ userId: decode.userId, folderId, isDeleted: false }, { isDeleted: true });
        console.log(folder);
        if (!folder) {
            return res.status(400).json('folder not found');
        }
        await notes_model_1.default.updateMany({ folderId, userId: decode.userId, isDeleted: false }, { isDeleted: true });
        res.status(200).json("folder is deleted");
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.deleteFolder = deleteFolder;
const searchFolders = async (req, res) => {
    try {
        const { name } = req.query;
        const decode = req.user;
        if (!name) {
            return res.status(400).json('name required');
        }
        const folders = await folder_model_1.default.find({
            name: { $regex: name, $options: 'i' },
            userId: decode.userId
        }).select('name folderId updatedAt -_id');
        console.log(folders);
        if (!folders) {
            return res.status(400).json('folders not found');
        }
        res.status(200).json(folders);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.searchFolders = searchFolders;
