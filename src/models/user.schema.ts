import mongoose from "mongoose";


export interface IUser extends mongoose.Document {

    firstName: string;
    lastName: string;
    email: string;
    password: string;
    status: Number;

}


const userSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        status: Number
    },
    {
        timestamps: true
    }
);


export default mongoose.model<IUser>('User', userSchema);