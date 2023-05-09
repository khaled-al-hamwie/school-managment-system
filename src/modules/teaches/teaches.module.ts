import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Teach } from "./entities/teach.entity";
import { TeachesService } from "./teaches.service";

@Module({
    imports: [SequelizeModule.forFeature([Teach])],
    providers: [TeachesService],
})
export class TeachesModule {}
