import { Credential } from "src/modules/credentials/entities/credential.entity";
import Manager from "src/modules/managers/entities/manager.entity";
import Student from "src/modules/students/entities/student.entity";
import Teacher from "src/modules/teachers/entities/teacher.entity";

export default async function cleanCredential() {
    await Manager.destroy({ where: {} });
    await Teacher.destroy({ where: {} });
    await Student.destroy({ where: {} });
    await Credential.destroy({ where: {} });
}
