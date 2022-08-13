import { Repository } from "typeorm"
import { Product } from "../entities/product"

export default class ProductRepository extends Repository<Product> 
{
    public async findByName(name: string): Promise<Product | null>
    {
        let product = this.findOne({
            where: {
                name,
            }
        });
        return product;
    }
    public async findOn
}