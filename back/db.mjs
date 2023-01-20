import {Sequelize} from "sequelize";

export const db = new Sequelize('pagenate_db',
		'root', '',
		{
			host: 'localhost',
			dialect: 'mysql'
		})