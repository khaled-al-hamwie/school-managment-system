import { CredentialAttributes } from "src/modules/credentials/interfaces/credential.interface";
import { TeacherAttributes } from "src/modules/teachers/interfaces/teacher.interface";

export default interface TeacherPayload {
	credentail_id: CredentialAttributes["credential_id"];
	user_name: CredentialAttributes["user_name"];
	teacher_id: TeacherAttributes["teacher_id"];
}
