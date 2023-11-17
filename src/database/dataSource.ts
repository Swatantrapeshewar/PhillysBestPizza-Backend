import { DataSource } from 'typeorm';
// import { getConfig } from "../config/config";
import * as mysqlDriver from 'mysql2';
import { DataSourceOptions } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export function getConfig() {
	return {
		driver: mysqlDriver,
		type: 'mysql',
		host: 'localhost',
		port: 3306,
		username: 'root',
		password: '',
		database: 'phillypizza_local',
		synchronize: false,
		migrations: ['src/database/migrations/*.ts'],
		entities: ['src/database/entities/*.ts'],
	} as DataSourceOptions;
}

const datasource = new DataSource(getConfig());
void datasource.initialize();
export default datasource;
