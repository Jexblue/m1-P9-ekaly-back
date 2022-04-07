import Sakafo, { ISakafo } from '../models/sakafo.schema';
import { isEmpty } from "../utils/utils.service";

export class SakafoService{

    public async findSakafoById(sakafoID: string): Promise<ISakafo> {

        if (isEmpty(sakafoID)) throw new Error('No ID found');

        return await Sakafo
            .findById(sakafoID) as ISakafo;

    }

    public async createSakafo(sakafoData: ISakafo): Promise<ISakafo> {

        if (isEmpty(sakafoData)) throw new Error('No data found');

        return await Sakafo
            .create({ ...sakafoData });

    }

    public async removeSakafo(sakafoID: string): Promise<ISakafo> {

        if (isEmpty(sakafoID)) throw new Error('No ID found');

        let currentUser: ISakafo = await this.findSakafoById(sakafoID);

        if (isEmpty(currentUser)) throw new Error('No sakafo to delete found');

        await Sakafo
            .deleteOne({ _id: sakafoID })
            .exec();

        return currentUser as ISakafo;

    }

    public async updateSakafo(sakafoID: string, sakafoData: ISakafo): Promise<ISakafo> {

        if (isEmpty(sakafoID)) throw new Error('No ID found');

        if (isEmpty(sakafoData)) throw new Error('No updated data found');

        const currentSakafo = await Sakafo.findOne({ _id: sakafoID });

        if (isEmpty(currentSakafo)) throw new Error('No sakafo found');

        currentSakafo!.menu = sakafoData.menu;
        currentSakafo!.status = sakafoData.status;

        await currentSakafo!.save();

        return await this.findSakafoById(sakafoID);

    }

    public async findAllSakafo(): Promise<ISakafo[]> {

        return await Sakafo
            .find();

    }

}