import mongoose, { Document, Schema } from 'mongoose';

export interface FolderModel extends Document {
  name:string;  
  folderId: string;
  isDeleted: boolean;
  category:string;
  userId:string
}

const FolderSchema: Schema = new Schema<FolderModel>({
  name: { type: String, required: true},
  userId: { type: String, required: true},
  folderId: { type: String, required: true, unique: true},
  isDeleted: { type: Boolean, required: true},
  category: { type: String, required: true}
},{timestamps:true});

export default mongoose.model<FolderModel>('Folder', FolderSchema);
