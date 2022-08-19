import { connection } from "@shared/typeorm";
import { In, Repository } from "typeorm"
import Product  from "../entities/product"

interface IRequest {
    id: string;
}

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
    public async findAllByIds( products : Array<IRequest>): Promise< Array<Product> >
    {
        const productsIds = products.map(product => product.id);

        const productsExists = await this.ormRepository.find({
            where: {
                id: In(productsIds)
            }
        })

        return productsExists;
    }

    public async save(product: Product): Promise<void>
    {
        await this.ormRepository.save(product);

    }

    public async updateQuantity(products: { id: string, quantity: number}[]): Promise<void>
    {

        await this.ormRepository.save(products)
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