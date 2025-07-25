import { Controller, Get } from "@nestjs/common";
import { GetAllPermssionUseCase } from "../application/use-cases/query/get-all-permssion.use-case";

@Controller('permission')
export class PermissionController {
    constructor(
        private readonly getAllPermssionUseCase: GetAllPermssionUseCase
    ) {}
    @Get()
    getAll() {
        return this.getAllPermssionUseCase.execute()
    }
}