import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5000,
    username: 'postgres',
    password: 'postgres',
    database: 'task_db',
    entities: [__dirname + '/../**/*.entity.ts'],
    synchronize: true
}