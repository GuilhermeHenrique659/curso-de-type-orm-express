import { Product } from "@modules/products/typeorm/entities/product"
import { DataSource } from "typeorm"
import { CreateProducts1660307075935 } from "./migrations/1660307075935-CreateProducts"
import { CreateUsers1660398825183 } from "./migrations/1660398825183-CreateUsers"


export const connection = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "docker",
    database: "apivendas",
    synchronize: true,
    logging: true,
    entities: [ 
        "./src/modules/products/typeorm/entities/product.ts" ,
        "./src/modules/users/typeorm/entities/users.ts"
        ],
    migrations: [
        CreateProducts1660307075935,
        CreateUsers1660398825183
    ],
})