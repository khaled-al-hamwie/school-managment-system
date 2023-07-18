import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FindOptions } from "sequelize";
import { saveModel } from "src/core/common/transformers/modelSave";
import { StudentsBusesService } from "../students/services/students.buses.service";
import { CreateBusDto } from "./dto/create-bus.dto";
import { UpdateBusDto } from "./dto/update-bus.dto";
import { Bus } from "./entities/bus.entity";
import { BusAttributes } from "./interfaces/bus.interface";

@Injectable()
export class BusesService {
    constructor(
        @InjectModel(Bus) private readonly BusEntity: typeof Bus,
        private readonly studentsbusesService: StudentsBusesService,
    ) {}
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

    findOne(options: FindOptions<BusAttributes>) {
        return this.BusEntity.findOne(options);
    }

    async update(bus_id: BusAttributes["bus_id"], updateBusDto: UpdateBusDto) {
        const bus = await this.checkBus(bus_id);
        bus.update(updateBusDto).then(saveModel);
        return "done";
    }

    async remove(bus_id: BusAttributes["bus_id"]) {
        const bus = await this.checkBus(bus_id);
        this.removeAsync(bus);
        return `done`;
    }

    async removeAsync(bus: Bus) {
        await this.studentsbusesService.removeStudentBus(bus.bus_id);
        await bus.destroy();
    }

    async checkBus(bus_id: BusAttributes["bus_id"]) {
        const Bus = await this.findOne({
            where: { bus_id },
        });
        if (!Bus) throw new NotFoundException("Bus doesn't exist");
        return Bus;
    }
}
