import { Request, Response } from 'express';
import folderModel from '../models/folder.model';
import notesModel from '../models/notes.model';
import { generateUUID } from '../utils/uuid';

export const createFolder: any = async (req: Request, res: Response): Promise<void | any | undefined> => {
    try {

        const { name, category } = req.body
        const decode = (req as any).user;

        if (!name) {
            return res.status(400).json('enter folder name')
        }

        const data = {
            name,
            folderId: generateUUID(),
            category:category?category:null,
            isDeleted: false,
            userId: decode.userId
        }

        await folderModel.create(data)

        return res.status(201).json('folder is created successfully');

    }

    catch (error) {

        res.status(500).json({ message: 'Server error' });

    }
};

export const getFoldersByFilter: any = async (req: Request, res: Response) => {

    try {

        const { category, sort, page, limit } = req.query
        const decode = (req as any).user;
        let folders
        let query:any={}

        if(category){

           query = { isDeleted: false, category, userId: decode.userId }

        }
        else{
            query = { isDeleted: false,userId: decode.userId }
        }
        let sortOption: any = {};

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

        const pageNumber = parseInt(page as string) || 1;
        const limitNumber = parseInt(limit as string) || 10;
        const skip = (pageNumber - 1) * limitNumber;

        const totalFolders = await folderModel.countDocuments({
            ...query,
            userId:decode.userId
        });

        folders = await folderModel
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

}

export const getFolders: any = async (req: Request, res: Response) => {

    try {

        // const { category, sort, page, limit } = req.query
        const decode = (req as any).user;
        let folders
        let query:any={}

        query = { isDeleted: false,userId: decode.userId }


        const totalFolders = await folderModel.countDocuments({
            ...query,
            userId:decode.userId
        });

        folders = await folderModel
            .find(query)
            .select('name folderId updatedAt -_id')

        return res.status(201).json({ folders, totalFolders });

    }

    catch (error) {

        res.status(500).json({ message: 'Server error' });

    }

}

export const getCategories: any = async (req: Request, res: Response) => {

    try {
        const decode = (req as any).user;

        const uniqueCategories = await folderModel.distinct('category',{userId:decode.userId,isDeleted: false,category:{ $ne: null }});

        return res.status(201).json(uniqueCategories);

    }

    catch (error) {

        res.status(500).json({ message: 'Server error' });

    }

}

export const getFolder: any = async (req: Request, res: Response) => {

    try {
        const { folderId } = req.params;
        const decode = (req as any).user;

        const folder = await folderModel.findOne({ folderId, isDeleted: false, userId:decode.userId });

        if (!folder) {
            return res.status(400).json('folder not found');
        }

        res.status(200).json(folder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }

}

export const updateFolder: any = async (req: Request, res: Response) => {
    try {
        const { name, category } = req.body;
        const { folderId } = req.params
        const decode = (req as any).user;

        if(!name){
            return res.status(400).json('folder name is required')
        }

        const folder = await folderModel.findOneAndUpdate({ folderId, isDeleted: false,userId:decode.userId}, { name,category:category?category:null });

        console.log(folder);


        if (!folder) {
            return res.status(400).json('folder not found');
        }

        res.status(200).json("folder is updated");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const deleteFolder: any = async (req: Request, res: Response) => {

    try {
        const { folderId } = req.params
        const decode = (req as any).user;

        const folder = await folderModel.findOneAndUpdate({userId:decode.userId, folderId, isDeleted: false }, { isDeleted: true });

        console.log(folder);


        if (!folder) {
            return res.status(400).json('folder not found');
        }

        await notesModel.updateMany({ folderId,userId:decode.userId, isDeleted: false }, { isDeleted: true });

        res.status(200).json("folder is deleted");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }

}

export const searchFolders: any = async (req: Request, res: Response) => {

    try {

        const { name } = req.query
        const decode = (req as any).user;

        if(!name){
            return res.status(400).json('name required')
        }

        const folders = await folderModel.find({
            name: { $regex: name, $options: 'i' },
            userId:decode.userId,
            isDeleted:false
        }).select('name folderId updatedAt -_id')

        console.log(folders);


        if (!folders) {
            return res.status(400).json('folders not found');
        }

        res.status(200).json(folders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }

}



