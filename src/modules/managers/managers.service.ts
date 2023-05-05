import {
	ForbiddenException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Op, WhereOptions } from "sequelize";
import removeCredentails from "src/core/transformers/removeCredentails.transform";
import { AuthService } from "../auth/auth.service";
import { CreateAuthDto } from "../auth/dto/create-auth.dto";
import { CredentialsService } from "../credentials/credentials.service";
import { Credential } from "../credentials/entities/credential.entity";
import { CreateManagerDto } from "./dto/create-manager.dto";
import { FindAllManagerDto } from "./dto/findAll-manager.dto";
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
	findAll(query: FindAllManagerDto, page: number = 0) {
		const whereOptions: WhereOptions<ManagerAttributes> = {};
		for (const key in query) {
			if (Object.prototype.hasOwnProperty.call(query, key)) {
				whereOptions[key] = { [Op.regexp]: query[key] };
			}
		}
		return this.ManagerEntity.findAll({
			where: whereOptions,
			attributes: { exclude: ["credential_id"] },
			include: {
				model: Credential,
				attributes: { exclude: ["password"] },
			},
			offset: page * 5,
			limit: 5,
			order: [["first_name", "ASC"]],
		});
	}

	async findOne(options: WhereOptions<ManagerAttributes>) {
		return this.ManagerEntity.findOne({
			where: options,
			limit: 1,
		});
	}

	async update(
		manager_id: ManagerAttributes["manager_id"],
		updateManagerDto: UpdateManagerDto
	) {
		const manager = await this.findOne({ manager_id });
		if (!manager) throw new NotFoundException("manager dosen't exists");
		manager.update(updateManagerDto).then((output) => output.save());
		if (updateManagerDto.password)
			this.credentailsService.update(
				manager.credential_id,
				updateManagerDto.password
			);
		return "done";
	}
}
