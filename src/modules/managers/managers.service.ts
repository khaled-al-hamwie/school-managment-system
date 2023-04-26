import { ForbiddenException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import removeCredentails from "src/core/transformers/removeCredentails.transform";
import { AuthService } from "../auth/auth.service";
import { CreateAuthDto } from "../auth/dto/create-auth.dto";
import { CredentialsService } from "../credentials/credentials.service";
import { CreateManagerDto } from "./dto/create-manager.dto";
import { UpdateManagerDto } from "./dto/update-manager.dto";
import Manager from "./entities/manager.entity";
import { ManagerAttributes } from "./interfaces/manager.interface";

@Injectable()
export class ManagersService {
	constructor(
		@InjectModel(Manager) private readonly ManagerEntity: typeof Manager,
		private readonly credentailsService: CredentialsService,
		private readonly authService: AuthService
	) {}
	async create(createManagerDto: CreateManagerDto) {
		const credentail = await this.credentailsService.create({
			email: createManagerDto.email,
			user_name: createManagerDto.user_name,
			password: createManagerDto.password,
		});
		removeCredentails(createManagerDto);
		this.ManagerEntity.create({
			credential_id: credentail.credential_id,
			...createManagerDto,
		});
		return "done";
	}
	async login(body: CreateAuthDto) {
		const credentail = await this.credentailsService.verify(body);
		const manager = await this.ManagerEntity.findOne({
			where: {
				credential_id: credentail.credential_id,
			},
		});
		if (!manager) {
			throw new ForbiddenException("account don't exist", {
				description: "Forbidden",
			});
		}
		return this.authService.signToken({
			credentail_id: credentail.credential_id,
			manager_id: manager.manager_id,
			user_name: credentail.user_name,
		});
	}
	findAll() {
		return `This action returns all managers`;
	}

	async findOne(id: ManagerAttributes["manager_id"]) {
		return this.ManagerEntity.findByPk(id);
	}

	update(id: number, updateManagerDto: UpdateManagerDto) {
		return `This action updates a #${id} manager`;
	}

	remove(id: number) {
		return `This action removes a #${id} manager`;
	}
}
