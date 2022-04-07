import mongoose from "mongoose";


export interface ISakafo extends mongoose.Document {

    nomPlat: string;
    image: string;
    restaurant: string;
    status: Number;
    cout: Number;
    prix: Number;

}


const userSakafo = new mongoose.Schema(
    {
        nomPlat: String,
        image: String,
        restaurant: String,
        status: String,
        cout: String,
        prix: String
    },
    {
        timestamps: true
    }
);


export default mongoose.model<ISakafo>('Sakafo', userSakafo);