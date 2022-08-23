import AppError from "@shared/errors/AppError";
import MockCustomersRepository from "../typeorm/repositories/mock/MockCustomerRepository";
import CreateCustomerService from "./CreateCustomerService";
import ShowCustomerService from "./ShowCustomerService";
import { v4 as uuidv4 } from "uuid"



let mockcustomerRepository: MockCustomersRepository;
let showcustomerservice: ShowCustomerService;
let createcustomerservice: CreateCustomerService;

describe("Show one customer test", () => {
    beforeEach( () => {
            mockcustomerRepository = new MockCustomersRepository();
            showcustomerservice = new ShowCustomerService(mockcustomerRepository);
            createcustomerservice = new CreateCustomerService(mockcustomerRepository);
        }
    );
    it("Should create and find customer", async () => {
        const customer = await createcustomerservice.execute({
            name: "teste",
            email: "teste@gmail.com"
        });
        expect(customer).toHaveProperty("id");
        if (!customer.id) throw Error("no id")

        await expect(showcustomerservice.execute({
            id: customer.id
        })).resolves.toHaveProperty("id");
    })
    it("Should search a customer wich not exists", async () => {
        await expect(showcustomerservice.execute({
            id: uuidv4()
        })).rejects.toBeInstanceOf(AppError)
    });
});