import Commande, { ICommande } from '../models/commande.schema';
import { isEmpty } from "../utils/utils.service";
import mongoose from 'mongoose';

export class CommandeService {

    public async findCommandeById(commandeID: string): Promise<ICommande> {

        if (isEmpty(commandeID)) throw new Error('No ID found');

        return await Commande
            .findById(commandeID).populate("sakafo").lean() as ICommande;

    }

    public async createCommande(commandeData: ICommande): Promise<ICommande> {

        if (isEmpty(commandeData)) throw new Error('No data found');

        Object.assign(commandeData, { _id: String(new mongoose.mongo.ObjectId()) });

        return await Commande
            .create({ ...commandeData });

    }

    public async removeCommande(commandeID: string): Promise<ICommande> {

        if (isEmpty(commandeID)) throw new Error('No ID found');

        let currentUser: ICommande = await this.findCommandeById(commandeID);

        if (isEmpty(currentUser)) throw new Error('No commande to delete found');

        await Commande
            .deleteOne({ _id: commandeID })
            .exec();

        return currentUser as ICommande;

    }

    public async updateCommande(commandeID: string, commandeData: ICommande): Promise<ICommande> {

        if (isEmpty(commandeID)) throw new Error('No ID found');

        if (isEmpty(commandeData)) throw new Error('No updated data found');

        const currentCommande = await Commande.findOne({ _id: commandeID });

        if (isEmpty(currentCommande)) throw new Error('No commande found');

        currentCommande!.dateCommande = commandeData.dateCommande;
        currentCommande!.fraisLivraison = commandeData.fraisLivraison;
        currentCommande!.etat = commandeData.etat

        await currentCommande!.save();

        return await this.findCommandeById(commandeID);

    }

    public async findAllCommande(): Promise<ICommande[]> {

        return await Commande
            .find().populate("sakafo").lean();

    }

}