import mongoose from "mongoose";


export interface IUser extends mongoose.Document {

    firstName: string;
    lastName: string;
    age: number;
    status: number;

}


const userSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        adresse: String,
        numero: String,
        email: String,
        fb: String,
        status: { type: Number, min: 18, max: 100 }
    },
    {
        timestamps: true
    }
);


export default mongoose.model<IUser>('User', userSchema);