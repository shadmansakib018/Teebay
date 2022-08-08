import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Post } from "./entity/Post";

import 'dotenv/config'


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: process.env.POSTGRES_PASSWORD,
    database: "teebaydb",
    synchronize: true,
    logging: false,
    entities: [User, Post],
    migrations: [],
    subscribers: [],
})
