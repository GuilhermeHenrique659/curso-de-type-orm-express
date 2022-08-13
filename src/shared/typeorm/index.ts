import { Product } from "@modules/products/typeorm/entities/product"
import { DataSource } from "typeorm"


const connection = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "docker",
    database: "apivendas",
    synchronize: true,
    logging: true,
    entities: [ Product ],
    "migrations": [
        "./src/shared/typeorm/migrations/*.ts"
    ],
})

console.log(connection)
export default connection