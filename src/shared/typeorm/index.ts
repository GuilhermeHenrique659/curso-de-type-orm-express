import Product from "@modules/products/typeorm/entities/product"
import User from "@modules/users/typeorm/entities/users"
import UserToken from "@modules/users/typeorm/entities/userToken"
import { DataSource } from "typeorm"
import { CreateProducts1660307075935 } from "./migrations/1660307075935-CreateProducts"
import { CreateUsers1660398825183 } from "./migrations/1660398825183-CreateUsers"
import { CreateUserTokens1660569258886 } from "./migrations/1660569258886-CreateUserTokens"
import { CreateCustomers1660651141467 } from "./migrations/1660651141467-CreateCustomers"
import { CreateOrders1660666513647 } from "./migrations/1660666513647-CreateOrders"
import { AddCustomerIdToOrders1660666813412 } from "./migrations/1660666813412-AddCustomerIdToOrders"
import { CreateOrdersProducts1660667293518 } from "./migrations/1660667293518-CreateOrdersProducts"
import { AddOrderIdToOrdersProducts1660667739372 } from "./migrations/1660667739372-AddOrderIdToOrdersProducts"
import { AddProductIdToOrdersProducts1660669569643 } from "./migrations/1660669569643-AddProductIdToOrdersProducts"


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
        "./src/modules/customers/typeorm/entities/customers.ts",
        "./src/modules/orders/typeorm/entities/Order.ts",
        "./src/modules/orders/typeorm/entities/OrdersProducts.ts",
        ],
    migrations: [
        CreateProducts1660307075935,
        CreateUsers1660398825183,
        CreateUserTokens1660569258886,
        CreateCustomers1660651141467,
        CreateOrders1660666513647,
        CreateOrdersProducts1660667293518,
        AddCustomerIdToOrders1660666813412,
        AddOrderIdToOrdersProducts1660667739372,
        AddProductIdToOrdersProducts1660669569643
    ],
})