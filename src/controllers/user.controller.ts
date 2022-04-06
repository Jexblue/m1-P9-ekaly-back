import { Body, Delete, Get, JsonController, Param, Post, Put } from "routing-controllers";
import { UserService } from "../services/user.service";
import { formatResponse } from "../utils/utils.service";
import { IUser } from "../models/user.schema";


@JsonController('/users')
export class UserController {

    private userService: UserService = new UserService();


    @Post()
    async createUser(@Body() userData: IUser): Promise<any> {

        try {

            const user = await this.userService.createUser(userData);

            return await formatResponse(200, 'User created', user);

        } catch (error: any) {

            return { status: 409, message: String(error) };

        }

    }


    @Put('/:user_id')
    async updateUser(@Param('user_id') userID: string, @Body() userData: IUser): Promise<any> {

        try {

            const user = await this.userService.updateUser(userID, userData);

            return await formatResponse(200, 'User updated', user);

        } catch (error: any) {

            return { status: 409, message: String(error) };

        }

    }


    @Delete('/:user_id')
    async removeUser(@Param('user_id') userID: string): Promise<any> {

        try {

            const user = await this.userService.removeUser(userID);

            return await formatResponse(200, 'User removed', user);

        } catch (error: any) {

            return { status: 409, message: String(error) };

        }

    }


    @Get()
    async getAllUsers(): Promise<any> {

        try {

            const users = await this.userService.findAllUsers();

            return await formatResponse(200, 'Users found', users);

        } catch (error: any) {

            return { status: 409, message: String(error) };

        }

    }


    @Get('/:user_id')
    async getUserById(@Param('user_id') userID: string): Promise<any> {

        try {

            const user = await this.userService.findUserById(userID);

            return await formatResponse(200, 'User found', user);

        } catch (error: any) {

            return { status: 409, message: String(error) };

        }

    }

}