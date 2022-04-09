import mongoose from "mongoose";


export interface ISakafo extends mongoose.Document {

    nomPlat: string;
    image: string;
    restaurant: string;
    coutPlat: Number;
    prixPlat: Number;
    benefice: Number;
    status: Number;

}


const userSakafo = new mongoose.Schema(
    {
        nomPlat: String,
        image: String,
        restaurant: String,
        coutPlat: Number,
        prixPlat: Number,
        benefice: Number,
        status: Number
    },
    {
        timestamps: true
    }
);


export default mongoose.model<ISakafo>('Sakafo', userSakafo);