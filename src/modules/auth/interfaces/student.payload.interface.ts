import { CredentialAttributes } from "src/modules/credentials/interfaces/credential.interface";
import { StudentAttributes } from "src/modules/students/interfaces/student.interface";

export default interface StudentPayload {
	credentail_id: CredentialAttributes["credential_id"];
	user_name: CredentialAttributes["user_name"];
	student_id: StudentAttributes["student_id"];
}
