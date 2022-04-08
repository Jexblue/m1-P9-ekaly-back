import { Body, Delete, Get, JsonController, Param, Post, Put } from "routing-controllers";
import { SakafoService } from "../services/sakafo.service";
import { formatResponse } from "../utils/utils.service";
import { ISakafo } from "../models/sakafo.schema";

@JsonController('/sakafo')
export class SakafoController {

    private sakafoService: SakafoService = new SakafoService();


    @Post()
    async createSakafo(@Body() sakafoData: ISakafo): Promise<any> {

        try {

            const sakafo = await this.sakafoService.createSakafo(sakafoData);

            return await formatResponse(200, 'Sakafo created', sakafo);

        } catch (error: any) {

            return { status: 409, message: String(error) };

        }

    }

    @Put('/:sakafo_id')
    async updateSakafo(@Param('sakafo_id') sakafoID: string, @Body() sakafoData: ISakafo): Promise<any> {

        try {

            const sakafo = await this.sakafoService.updateSakafo(sakafoID, sakafoData);

            return await formatResponse(200, 'User updated', sakafo);

        } catch (error: any) {

            return { status: 409, message: String(error) };

        }

    }

    @Delete('/:sakafo_id')
    async removeSakafo(@Param('sakafo_id') sakafoID: string): Promise<any> {

        try {

            const sakafo = await this.sakafoService.removeSakafo(sakafoID);

            return await formatResponse(200, 'User removed', sakafo);

        } catch (error: any) {

            return { status: 409, message: String(error) };

        }

    }

    @Get()
    async getAllSakafo(): Promise<any> {

        try {

            const sakafo = await this.sakafoService.findAllSakafo();

            return await formatResponse(200, 'Users found', sakafo);

        } catch (error: any) {

            return { status: 409, message: String(error) };

        }

    }

    @Get('/:sakafo_id')
    async getSakafoById(@Param('sakafo_id') sakafoID: string): Promise<any> {

        try {

            const sakafo = await this.sakafoService.findSakafoById(sakafoID);

            return await formatResponse(200, 'User found', sakafo);

        } catch (error: any) {

            return { status: 409, message: String(error) };

        }

    }

}