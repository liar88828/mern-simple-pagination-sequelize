import {db} from "./db.mjs";
import {DataTypes} from "sequelize";

export const User = db.define('user', {
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			gender: DataTypes.STRING,
		}, {freezeTableName: true}
)