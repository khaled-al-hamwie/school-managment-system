import { Op, WhereOptions } from "sequelize";

export default function whereWrapperTransform(query: any) {
    const whereOptions: WhereOptions<any> = {};
    for (const key in query) {
        if (Object.prototype.hasOwnProperty.call(query, key)) {
            whereOptions[key] = { [Op.regexp]: query[key] };
        }
    }
    return whereOptions;
}
