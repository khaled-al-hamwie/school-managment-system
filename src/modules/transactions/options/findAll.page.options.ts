import { FindOptions } from "sequelize";
import { TransactionAttributes } from "../interfaces/transaction.interface";

export function findAllPageOptions(
    page: number,
): FindOptions<TransactionAttributes> {
    return { offset: page * 20, limit: 20, order: [["created_at", "DESC"]] };
}
