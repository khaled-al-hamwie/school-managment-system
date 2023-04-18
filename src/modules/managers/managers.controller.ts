import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { CreateAuthDto } from "../auth/dto/create-auth.dto";
import { CreateManagerDto } from "./dto/create-manager.dto";
import { UpdateManagerDto } from "./dto/update-manager.dto";
import { ManagersService } from "./managers.service";

@Controller("managers")
export class ManagersController {
	constructor(private readonly managersService: ManagersService) {}

	@Post()
	create(@Body() createManagerDto: CreateManagerDto) {
		return this.managersService.create(createManagerDto);
	}

	@Post("/login")
	@HttpCode(HttpStatus.OK)
	login(@Body() body: CreateAuthDto) {
		return this.managersService.login(body);
	}

	@Get()
	findAll() {
		return this.managersService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.managersService.findOne(+id);
	}

	@Patch(":id")
	update(
		@Param("id") id: string,
		@Body() updateManagerDto: UpdateManagerDto
	) {
		return this.managersService.update(+id, updateManagerDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.managersService.remove(+id);
	}
}
