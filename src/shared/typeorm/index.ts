import Product from "@modules/products/typeorm/entities/product"
import User from "@modules/users/typeorm/entities/users"
import UserToken from "@modules/users/typeorm/entities/userToken"
import { DataSource } from "typeorm"
import { CreateProducts1660307075935 } from "./migrations/1660307075935-CreateProducts"
import { CreateUsers1660398825183 } from "./migrations/1660398825183-CreateUsers"
import { CreateUserTokens1660569258886 } from "./migrations/1660569258886-CreateUserTokens"
import { CreateCustomers1660651141467 } from "./migrations/1660651141467-CreateCustomers"


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
        "./src/src/modules/users/typeorm/entities/users.ts",
        "./src/modules/users/typeorm/entities/userToken.ts",
        "./src/modules/customers/typeorm/entities/customers.ts"
        ],
    migrations: [
        CreateProducts1660307075935,
        CreateUsers1660398825183,
        CreateUserTokens1660569258886,
        CreateCustomers1660651141467
    ],
})