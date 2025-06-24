import mongoose, { Document, Schema } from 'mongoose';

export interface NotesModel extends Document {
  name:string;  
  content:string;
  folderId:string;
  noteId: string;
  isDeleted: boolean;
  isArchived:boolean;
  isPinned:boolean;
  userId:string
}

const NoteSchema: Schema = new Schema<NotesModel>({
  name: { type: String, required: true},
  content: { type: String, required: true},
  userId: { type: String, required: true},
  folderId: { type: String,required: true},
  noteId: { type: String, required: true, unique: true},
  isDeleted: { type: Boolean, required: true},
  isArchived: { type: Boolean, required: true},
  isPinned: { type: Boolean, required: true},
},{timestamps:true});

export default mongoose.model<NotesModel>('Note', NoteSchema);
