import User, { IUser } from '../models/user.schema';
import { isEmpty } from "../utils/utils.service";


export class UserService {

    public async findUserById(userID: string): Promise<IUser> {

        if (isEmpty(userID)) throw new Error('No ID found');

        return await User
            .findById(userID).lean() as IUser;

    }


    public async createUser(userData: IUser): Promise<IUser> {

        if (isEmpty(userData)) throw new Error('No data found');

        return await User
            .create({ ...userData });

    }


    public async removeUser(userID: string): Promise<IUser> {

        if (isEmpty(userID)) throw new Error('No ID found');

        let currentUser: IUser = await this.findUserById(userID);

        if (isEmpty(currentUser)) throw new Error('No user to delete found');

        await User
            .deleteOne({ _id: userID })
            .exec();

        return currentUser as IUser;

    }


    public async updateUser(userID: string, userData: IUser): Promise<IUser> {

        if (isEmpty(userID)) throw new Error('No ID found');

        if (isEmpty(userData)) throw new Error('No updated data found');

        const currentUser = await User.findOne({ _id: userID });

        if (isEmpty(currentUser)) throw new Error('No user found');

        currentUser!.firstName = userData.firstName;
        currentUser!.lastName = userData.lastName;
        currentUser!.email = userData.email;

        await currentUser!.save();

        return await this.findUserById(userID);

    }


    public async findAllUsers(): Promise<IUser[]> {

        return await User
            .find().lean();

    }

}