import { Optional } from "sequelize";

export interface CredentialAttributes {
    credential_id: number;
    user_name: string;
    email: string;
    password: string;
}

export type CredentialCreationAttributes = Optional<
    CredentialAttributes,
    "credential_id"
>;
