import mongoose from "mongoose";
//import sakafoSchema from "./sakafo.schema";
import { ISakafo } from "./sakafo.schema";
import { IUser } from "./user.schema";


export interface Icommande extends mongoose.Document {
    
    sakafo: ISakafo;
    client: IUser;
    livreur: IUser;
    dateCommande: Date;
    fraisLivraison: Number;
    etat: Number;

}

const commandeSchema = new mongoose.Schema {
    //sakafo: sakafoSchema;
}

//export default mongoose.model<ICommande>('Commande', commandeSchema);