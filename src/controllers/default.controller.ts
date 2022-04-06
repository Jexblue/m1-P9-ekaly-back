import { Body, Controller, Get, Post } from "routing-controllers";


@Controller('')
export class DefaultController {

    @Get()
    async loadLandingPage(): Promise<string> {

        return 'E-KALY WORKS FINE!';

    }

}