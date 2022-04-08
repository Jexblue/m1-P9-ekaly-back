import { Body, Delete, Get, JsonController, Param, Post, Put } from "routing-controllers";
import { CommandeService } from "../services/commande.service";
import { formatResponse } from "../utils/utils.service";
import { ICommande } from "../models/commande.schema";

@JsonController('/commande')
export class CommandeController {

    private commandeService: CommandeService = new CommandeService();

    @Post()
    async createCommande(@Body() commandeData: ICommande): Promise<any> {

        try {

            const commande = await this.commandeService.createCommande(commandeData);

            return await formatResponse(200, 'Commande created', commande);

        } catch (error: any) {

            return { status: 409, message: String(error) };

        }

    }

    @Put('/:sakafo_id')
    async updateCommande(@Param('commande_id') commandeID: string, @Body() commandeData: ICommande): Promise<any> {

        try {

            const commande = await this.commandeService.updateCommande(commandeID, commandeData);

            return await formatResponse(200, 'Commande updated', commande);

        } catch (error: any) {

            return { status: 409, message: String(error) };

        }

    }

    @Delete('/:commande_id')
    async removeCommande(@Param('commande_id') commandeID: string): Promise<any> {

        try {

            const commande = await this.commandeService.removeCommande(commandeID);

            return await formatResponse(200, 'commande removed', commande);

        } catch (error: any) {

            return { status: 409, message: String(error) };

        }

    }

    @Get()
    async getAllCommande(): Promise<any> {

        try {

            const commande = await this.commandeService.findAllCommande();

            return await formatResponse(200, 'Commandes found', commande);

        } catch (error: any) {

            return { status: 409, message: String(error) };

        }

    }

    @Get('/:commande_id')
    async getCommandeById(@Param('commande_id') commandeID: string): Promise<any> {

        try {

            const commande = await this.commandeService.findCommandeById(commandeID);

            return await formatResponse(200, 'Commande found', commande);

        } catch (error: any) {

            return { status: 409, message: String(error) };

        }

    }
    
}