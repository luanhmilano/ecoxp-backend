import * as dotenv from 'dotenv';
dotenv.config();

const ormconfig = {
	type: 'mysql',
	host: process.env.DB_HOST || 'localhost',
	port: parseInt(process.env.DB_PORT || '3306', 10),
	username: process.env.DB_USERNAME || 'root',
	password: process.env.DB_PASSWORD || '',
	database: process.env.DB_DATABASE || 'ecoxp',
	entities: [__dirname + '/../**/*.entity{.ts,.js}', __dirname + '/../entities/*{.ts,.js}'],
	migrations: [__dirname + '/../migrations/*{.ts,.js}'],
	synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true' || true,
	logging: process.env.TYPEORM_LOGGING === 'true' || false,
  connectorPackage: 'mysql2'
};

export default ormconfig;
