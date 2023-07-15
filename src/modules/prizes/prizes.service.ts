import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { saveModel } from "src/core/common/transformers/modelSave";
import { CreatePrizeDto } from "./dto/create-prize.dto";
import { UpdatePrizeDto } from "./dto/update-prize.dto";
import { Prise } from "./entities/prise.entity";
import { PriseAttributes } from "./interfaces/prise.interface";

@Injectable()
export class PrizesService {
    constructor(
        @InjectModel(Prise) private readonly PriseEntity: typeof Prise,
    ) {}
    async create(createPrizeDto: CreatePrizeDto, image_path: string) {
        const prize = await this.PriseEntity.create({
            ...createPrizeDto,
            picture: image_path ? image_path : null,
        });
        return prize.toJSON();
    }

    async findAll() {
        const prizes = await this.PriseEntity.findAll();
        return prizes;
    }

    async findOne(prise_id: PriseAttributes["prise_id"]) {
        const prize = await this.PriseEntity.findByPk(prise_id);
        return prize ? prize : null;
    }

    async update(
        prise_id: PriseAttributes["prise_id"],
        updatePrizeDto: UpdatePrizeDto,
    ) {
        const prise = await this.checkprise(prise_id);
        prise.update(updatePrizeDto).then(saveModel);
        return "done";
    }

    async remove(prise_id: PriseAttributes["prise_id"]) {
        const prise = await this.checkprise(prise_id);
        await prise.destroy();
        return "done";
    }

    async checkprise(prise_id: PriseAttributes["prise_id"]) {
        const prise = await this.findOne(prise_id);
        if (!prise) throw new NotFoundException("prise doesn't exist");
        return prise;
    }
}
