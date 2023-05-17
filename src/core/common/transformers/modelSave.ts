import { Model } from "sequelize-typescript";

export const saveModel = (model: Model) => model.save();
