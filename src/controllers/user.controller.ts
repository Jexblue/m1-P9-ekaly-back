import {Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseBefore} from "routing-controllers";
import {I_ResponseEntity} from "../models/response-entity";
import {UserEntity} from "../entity/user.entity";
import {UserService} from "../services/user.service";
import {generateObjectID, getResponseEntity} from "../services/utils.service";
import {UserDto} from "../models/user.dto";
import {validationMiddleware} from "../middlewares/validation.middleware";
import {ObjectID} from "typeorm";


@Controller('/users')
export class UserController {

    private userService: UserService = new UserService();


    @Get()
    async getUsers(): Promise<I_ResponseEntity> {

        try {

            const users: UserEntity[] = await this.userService.findAllUsers();

            return Promise.resolve(getResponseEntity(false, true, 'Users found', users));

        } catch (e) {

            return Promise.resolve(getResponseEntity(true, false, e.message));

        }

    }


    @Get('/:id')
    async getUser(@Param('id') id: string): Promise<I_ResponseEntity> {

        try {

            const user: UserEntity = await this.userService.findUserByID(generateObjectID(id));

            return Promise.resolve(getResponseEntity(false, true, 'User found', user));

        } catch (e) {

            return Promise.resolve(getResponseEntity(true, false, e.message));

        }

    }


    @Post()
    @HttpCode(200)
    @UseBefore(validationMiddleware(UserDto, 'body', true))
    async saveUser(@Body() userData: UserDto): Promise<I_ResponseEntity> {

        try {

            const savedUser: UserEntity = await this.userService.saveUser(userData);

            return Promise.resolve(getResponseEntity(false, true, 'User saved', savedUser));

        } catch (e) {

            return Promise.resolve(getResponseEntity(true, false, e.message));

        }

    }


    @Put()
    @HttpCode(200)
    @UseBefore(validationMiddleware(UserDto, 'body', true))
    async updateUser(@Body() userData: UserDto): Promise<I_ResponseEntity> {

        try {

            const updatedUser: UserEntity = await this.userService.updateUser(userData);

            return Promise.resolve(getResponseEntity(false, true, 'User updated', updatedUser));

        } catch (e) {

            return Promise.resolve(getResponseEntity(true, false, e.message));

        }

    }


    @Delete('/:id')
    async deleteUser(@Param('id') id: string): Promise<I_ResponseEntity> {

        try {

            const removedUser: UserEntity = await this.userService.deleteUser(generateObjectID(id));

            return Promise.resolve(getResponseEntity(false, true, 'User removed', removedUser));

        } catch (e) {

            return Promise.resolve(getResponseEntity(true, false, e.message));

        }

    }

}
