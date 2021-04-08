import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as config from 'config';

const config_db = config.get("db");

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || config_db.host,
    port: parseInt(process.env.POSTGRES_PORT) || config_db.port,
    username: process.env.POSTGRES_USER || config_db.user,
    password: process.env.POSTGRES_PASSWORD || config_db.password,
    database: process.env.POSTGRES_DB || config_db.name_db,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: process.env.SYNCHRONIZE || config_db.synchronize
}