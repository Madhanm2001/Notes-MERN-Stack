import { Request, Response } from 'express';
import noteModel from '../models/notes.model';
import { generateUUID } from '../utils/uuid';
import { decode } from 'jsonwebtoken';

export const createNote: any = async (req: Request, res: Response): Promise<void | any | undefined> => {
    try {

        const { name, content } = req.body
        const decode = (req as any).user;
        const { folderId } = req.params

        if (!name || !content || !folderId) {
            return res.status(400).json('both note name and content are required')
        }

        const data = {
            name,
            content,
            folderId,
            noteId: generateUUID(),
            isDeleted: false,
            isArchived: false,
            isPinned: false,
            userId:decode.userId
        }

        await noteModel.create(data)

        return res.status(201).json('note is created successfully');

    }

    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getNotes = async (req: Request, res: Response): Promise<void | any | undefined> => {
    const { folderId } = req.params;
    const { filter, sort, page, limit } = req.query;
    const decode = (req as any).user;

    try {
        const query: any = { folderId, isDeleted: false, userId: decode.userId };

        if (filter === 'archived') {
            query.isArchived = true;
        } else if (filter === 'active') {
            query.isArchived = false;
        }

        let sortOption: any = {};

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

        const pageNumber = parseInt(page as string) || 1;
        const limitNumber = parseInt(limit as string) || 10;
        const skip = (pageNumber - 1) * limitNumber;
        const totalNotes = await noteModel.countDocuments(query);

        const notes = await noteModel
            .find(query)
            .select('name noteId updatedAt isPinned isArchived -_id')
            .sort(sortOption)
            .skip(skip)
            .limit(limitNumber);

        return res.status(200).json({ notes, totalNotes });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};


export const getNote: any = async (req: Request, res: Response) => {

    try {
        const { noteId } = req.params;
        const decode = (req as any).user;
        const note = await noteModel.findOne({ noteId, userId: decode.userId, isDeleted: false });

        if (!note) {
            return res.status(400).json('note not found');
        }

        res.status(200).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }

}

export const getAllNotes = async (req: Request, res: Response): Promise<void | any | undefined> => {

    console.log("jhdfjshjfhsjfhsjf","jhsjdhsd")
    const { filter, sort, page, limit } = req.query;
    const decode = (req as any).user;

    try {
        const query: any = {isDeleted: false, userId: decode.userId };

        if (filter === 'archived') {
            query.isArchived = true;
        } else if (filter === 'active') {
            query.isArchived = false;
        }

        let sortOption: any = {};

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

        const pageNumber = parseInt(page as string) || 1;
        const limitNumber = parseInt(limit as string) || 10;
        const skip = (pageNumber - 1) * limitNumber;
        const totalNotes = await noteModel.countDocuments(query);

        if(page==='infinite'){
            const notes = await noteModel
            .find(query)
            .select('name noteId updatedAt -_id')
            return res.status(200).json({ notes, totalNotes });
        }
        else{
            const notes = await noteModel
            .find(query)
            .select('name noteId updatedAt isPinned isArchived -_id')
            .sort(sortOption)
            .skip(skip)
            .limit(limitNumber);
            return res.status(200).json({ notes, totalNotes });
        }
        
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateNote: any = async (req: Request, res: Response) => {
    try {
        const { name, content } = req.body;
        const decode = (req as any).user;
        const { noteId } = req.params

        if(!name || !content){
            return(res.status(400).json('both name and content are required'))
        }

        const note = await noteModel.findOneAndUpdate({ noteId, userId: decode.userId, isDeleted: false }, { name, content });

        console.log(note);


        if (!note) {
            return res.status(400).json('note not found');
        }

        res.status(200).json("note is updated");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const deleteNote: any = async (req: Request, res: Response) => {

    try {
        const { noteId } = req.params
        const decode = (req as any).user;

        const note = await noteModel.findOneAndUpdate({ noteId, userId: decode.userId, isDeleted: false }, { isDeleted: true });

        console.log(note);


        if (!note) {
            return res.status(400).json('note not found');
        }

        res.status(200).json("note is deleted");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }

}

export const searchAllNotes: any = async (req: Request, res: Response) => {

    try {

        const { name } = req.query
        const decode = (req as any).user;

        const notes = await noteModel.find({
            name: { $regex: name, $options: 'i' },
            userId: decode.userId,
            isDeleted:false
        }).select('name noteId updatedAt isPinned isArchived -_id')

        console.log(notes);


        if (!notes) {
            return res.status(400).json('no more notes are not found based on this name');
        }

        res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }

}

export const searchNotes: any = async (req: Request, res: Response) => {

    try {

        const { name } = req.query
        const { folderId } = req.params
        const decode = (req as any).user;

        const notes = await noteModel.find({
            name: { $regex: name, $options: 'i' },
            folderId,
            userId: decode.userId,
            isDeleted:false
        }).select('name noteId updatedAt -_id')

        console.log(notes);


        if (!notes) {
            return res.status(400).json('no more notes are not found based on this name');
        }

        res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }

}

export const noteArchived: any = async (req: Request, res: Response) => {

    try {

        const { noteId } = req.params
        const decode = (req as any).user;

        const note = await noteModel.findOneAndUpdate({ noteId, userId: decode.userId }, { isArchived: true });

        console.log(note);


        if (!note) {
            return res.status(400).json('note not found');
        }

        res.status(200).json("note is archived successfully");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }

}

export const noteUnArchived: any = async (req: Request, res: Response) => {

    try {

        const { noteId } = req.params
        const decode = (req as any).user;

        const note = await noteModel.findOneAndUpdate({ noteId, userId: decode.userId }, { isArchived: false });

        console.log(note);


        if (!note) {
            return res.status(400).json('note not found');
        }

        res.status(200).json("note is unarchived successfully");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }

}

export const notePinned: any = async (req: Request, res: Response) => {

    try {

        const { noteId } = req.params
        const decode = (req as any).user;

        const note = await noteModel.findOneAndUpdate({ noteId, userId: decode.userId }, { isPinned: true });

        console.log(note);


        if (!note) {
            return res.status(400).json('note not found');
        }

        res.status(200).json("note is Pinned successfully");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }

}

export const noteUnpinned: any = async (req: Request, res: Response) => {

    try {

        const { noteId }: any = req.params
        const decode = (req as any).user;

        const note = await noteModel.findOneAndUpdate({ noteId, userId: decode.userId }, { isPinned: false });

        console.log(note);


        if (!note) {
            return res.status(400).json('note not found');
        }

        res.status(200).json("note is unpinned successfully");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }

}



