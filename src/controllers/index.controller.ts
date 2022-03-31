import {Controller, Get, Post} from "routing-controllers";
import {OpenAPI} from "routing-controllers-openapi";
import {getRepository, Repository} from "typeorm";
import {UserEntity} from "../entity/user.entity";


@Controller('/')
export class IndexController {

    @Get()
    @OpenAPI({summary: 'index'})
    async index() {

        const userRepository: Repository<UserEntity> = getRepository(UserEntity);

        const user: UserEntity = new UserEntity();

        user.firstName = 'Jeanne';
        user.lastName = 'Pierre';
        user.birthday = new Date();

        return await userRepository.save(user).then((result) => {

            console.log(result);

            return result;

        }).catch((error) => {

            throw error.message;

        });

    }

}
