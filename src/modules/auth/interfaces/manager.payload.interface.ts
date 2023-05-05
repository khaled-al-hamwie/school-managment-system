import { CredentialAttributes } from "src/modules/credentials/interfaces/credential.interface";
import { ManagerAttributes } from "src/modules/managers/interfaces/manager.interface";

export default interface ManagerPayload {
    credentail_id: CredentialAttributes["credential_id"];
    user_name: CredentialAttributes["user_name"];
    manager_id: ManagerAttributes["manager_id"];
}
