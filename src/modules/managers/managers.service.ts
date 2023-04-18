import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CredentialsService } from "../credentials/credentials.service";
import { CreateManagerDto } from "./dto/create-manager.dto";
import { UpdateManagerDto } from "./dto/update-manager.dto";
import Manager from "./entities/manager.entity";

@Injectable()
export class ManagersService {
	constructor(
		@InjectModel(Manager) private readonly ManagerEntity: typeof Manager,
		private readonly credentailsService: CredentialsService
	) {}
	async create(createManagerDto: CreateManagerDto) {
		const credentail = await this.credentailsService.create({
			email: createManagerDto.email,
			user_name: createManagerDto.user_name,
			password: createManagerDto.password,
		});
		const manager = await this.ManagerEntity.create({
			credential_id: credentail.credential_id,
			first_name: createManagerDto.first_name,
			middle_name: createManagerDto.middle_name,
			last_name: createManagerDto.last_name,
			location: createManagerDto.location,
			phone_number: createManagerDto.phone_number,
			salary: createManagerDto.salary,
		});
		return manager;
	}

	findAll() {
		return `This action returns all managers`;
	}

	findOne(id: number) {
		return `This action returns a #${id} manager`;
	}

	update(id: number, updateManagerDto: UpdateManagerDto) {
		return `This action updates a #${id} manager`;
	}

	remove(id: number) {
		return `This action removes a #${id} manager`;
	}
}
