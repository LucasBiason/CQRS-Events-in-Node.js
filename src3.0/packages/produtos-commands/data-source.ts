import "reflect-metadata";
import { DataSource } from "typeorm";

require('dotenv').config()

export const AppDataSource = new DataSource({
    migrationsTableName: 'migrations',
    type: "postgres",
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT || "5432"),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_DATABASE,
    logging: false,
    synchronize: true,
    name: 'default',
    entities: [__dirname + "/models/*.{ts,js}",],
    migrations: [__dirname + "/migrations/*.{ts,js}",],
});

