import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FindOptions } from "sequelize";
import { CreateBusDto } from "./dto/create-bus.dto";
import { UpdateBusDto } from "./dto/update-bus.dto";
import { Bus } from "./entities/bus.entity";
import { BusAttributes } from "./interfaces/bus.interface";

@Injectable()
export class BusesService {
    constructor(@InjectModel(Bus) private readonly BusEntity: typeof Bus) {}
    async create(createBusDto: CreateBusDto) {
        this.BusEntity.create({
            ...createBusDto,
            arrival_time: "07:30",
            pick_up_time: "12:30",
        });
        return "done";
    }

    findAll(options: FindOptions<BusAttributes>) {
        return this.BusEntity.findAll(options);
    }

    findOne(id: number) {
        return `This action returns a #${id} bus`;
    }

    update(id: number, updateBusDto: UpdateBusDto) {
        return `This action updates a #${id} bus`;
    }

    remove(id: number) {
        return `This action removes a #${id} bus`;
    }
}
