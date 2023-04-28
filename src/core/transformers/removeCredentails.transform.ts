import { CreateManagerDto } from "src/modules/managers/dto/create-manager.dto";
import { CreateStudentDto } from "src/modules/students/dto/create-student.dto";
import { CreateTeacherDto } from "src/modules/teachers/dto/create-teacher.dto";

export default function removeCredentails(
	dto: CreateStudentDto | CreateManagerDto | CreateTeacherDto
) {
	delete dto["email"];
	delete dto["user_name"];
	delete dto["user_name"];
}
