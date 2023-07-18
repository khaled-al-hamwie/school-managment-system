import { Optional } from "sequelize";

export interface HomeworkSubmissionAttributes {
    homework_submission_id: number;
    record_id: number;
    homework_id: number;
    drive_link: string;
    is_checked: boolean;
    grade: number;
}

export type HomeworkSubmissionCreationAttributes = Optional<
    HomeworkSubmissionAttributes,
    "homework_submission_id"
>;
