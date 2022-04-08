import mongoose from "mongoose";
import sakafoSchema, { ISakafo } from "./sakafo.schema";
import { IUser } from "./user.schema";


export interface ICommande extends mongoose.Document {
    
    sakafo: ISakafo;
    client: IUser;
    livreur: IUser;
    dateCommande: Date;
    fraisLivraison: Number;
    etat: Number;

}

const commandeSchema = new mongoose.Schema ({
   
    sakafo : {type : mongoose.Schema.Types.ObjectId, ref : 'Sakafo'},
    client : {type : mongoose.Schema.Types.ObjectId, ref : 'User'},
    livreur : {type : mongoose.Schema.Types.ObjectId, ref: 'User'},
    dateCommande : {
        type: Date,
        default: new Date()
    },
    fraisLivraison : Number,
    etat : Number
    
});

export default mongoose.model<ICommande>('Commande', commandeSchema);