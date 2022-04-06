import mongoose from "mongoose";


export interface ISakafo extends mongoose.Document {

    menu: string;
    image: string;
    status: Number;
    cout: Number;
    prix: Number;

}


const userSakafo = new mongoose.Schema(
    {
        menu: String,
        image: String,
        status: String,
        cout: String,
        prix: String
    },
    {
        timestamps: true
    }
);


export default mongoose.model<ISakafo>('Sakafo', userSakafo);