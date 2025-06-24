import mongoose, { Document, Schema } from 'mongoose';

export interface AuthModel extends Document {
  name:string; 
  userId:string; 
  username: string;
  password: string;
  email:string;
  phoneNumber:number;
}

const AuthSchema: Schema = new Schema<AuthModel>({
  name: { type: String, required: true},
  userId: { type: String, required: true},
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  phoneNumber: { type:Number, required: true, unique: true },
  password: { type: String, required: true }
});

export default mongoose.model<AuthModel>('Auth', AuthSchema);
