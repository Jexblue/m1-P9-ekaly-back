import {getRepository, ObjectID, Repository} from "typeorm";
import {UserEntity} from "../entity/user.entity";
import {UserDto} from "../models/user.dto";
import {isEmpty, isEqual} from "./utils.service";


export class UserService {

    private userRepository: Repository<UserEntity> = getRepository(UserEntity);


    public async findUserByID(id: ObjectID): Promise<UserEntity> {

        if (isEmpty(id)) throw 'ID not found';

        return await this.userRepository.findOne({
            where: {_id: id}
        });

    }


    public async saveUser(userData: UserDto): Promise<UserEntity> {

        if (isEmpty(userData)) throw 'Please, fill all inputs';

        console.log(userData);

        const newUser: UserEntity = await userData.getEntityFromSelf();

        console.log(newUser);

        return await this.userRepository.save(newUser);

    }


    public async updateUser(userData: UserDto): Promise<UserEntity> {

        if (isEmpty(userData) || isEmpty(userData.id)) throw 'Please, fill all inputs';

        const currentUser: UserEntity = await this.findUserByID(userData.id);
        currentUser.birthday = new Date(currentUser.birthday);

        const newUser: UserEntity = await userData.getEntityFromSelf() as UserEntity;

        if (isEqual(currentUser, newUser)) return Promise.resolve(currentUser);

        return await this.userRepository.save({
            ...currentUser,
            ...newUser
        });

    }


    public async deleteUser(id: ObjectID): Promise<UserEntity> {

        if (isEmpty(id)) throw 'ID not found';

        try {

            await this.userRepository.delete({
                _id: id
            });

            return this.findUserByID(id);

        } catch (e) {

            throw e;
        }

    }


    public async findAllUsers(): Promise<UserEntity[]> {

        return await this.userRepository.find();

    }

}
