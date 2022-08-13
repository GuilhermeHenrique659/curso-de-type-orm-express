import { Product } from "@modules/products/typeorm/entities/product"
import { DataSource } from "typeorm"
import { CreateProducts1660307075935 } from "./migrations/1660307075935-CreateProducts"


export const connection = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "docker",
    database: "apivendas",
    synchronize: true,
    logging: true,
    entities: [ Product ],
    migrations: [
        CreateProducts1660307075935
    ],
})