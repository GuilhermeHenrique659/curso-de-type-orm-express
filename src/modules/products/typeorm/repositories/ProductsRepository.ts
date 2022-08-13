import { connection } from "@shared/typeorm";
import { Repository } from "typeorm"
import { Product } from "../entities/product"


export default class ProductRepository
{
    private ormRepository: Repository<Product>;

    constructor() {
        this.ormRepository = connection.getRepository(Product)
    }

    public async findByName(name: string): Promise<Product | null>
    {
        let product = await this.ormRepository.findOne({
            where: {
                name,
            }
        });
        return product;
    }

    public async findOneById(id: string): Promise<Product | null>
    {
        let product = await this.ormRepository.findOne({
            where: {
                id,
            }
        })
        return product
    }

    public async save(product: Product): Promise<void>
    {
        await this.ormRepository.save(product);

    }
    public async findAll(): Promise<Array<Product> >{
        let listProduct = await this.ormRepository.find()
        return listProduct
    }

    public async remove(product: Product): Promise<void>
    {
        await this.ormRepository.remove(product)
    }
}