import mongoose from "mongoose";
import sakafoSchema, { ISakafo } from "./sakafo.schema";
import { IUser } from "./user.schema";


export interface ICommande extends mongoose.Document {
    
    sakafo: ISakafo[];
    client: IUser;
    livreur: IUser;
    dateCommande: Date;
    fraisLivraison: Number;
    adresse: String;
    etat: Number;

}

const commandeSchema = new mongoose.Schema ({
   
    sakafo : [{type : String, ref : 'Sakafo'}],
    client : {type : String, ref : 'User'},
    livreur : {type : String, ref: 'User'},
    dateCommande : {
        type: Date,
        default: new Date()
    },
    fraisLivraison : Number,
    adresse: String,
    etat : Number
    
});

export default mongoose.model<ICommande>('Commande', commandeSchema);