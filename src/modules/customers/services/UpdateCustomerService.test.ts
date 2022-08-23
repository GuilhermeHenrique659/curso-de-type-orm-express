import MockCustomersRepository from "../typeorm/repositories/mock/MockCustomerRepository";
import CreateCustomerService from "./CreateCustomerService";
import ListCustomerService from "./ListCustomerService";
import UpdateCustomerService from "./UpdateCustomerService";
import { v4 as uuidv4 } from "uuid"
import AppError from "@shared/errors/AppError";


let mockcustomerRepository: MockCustomersRepository;
let updatecustomerservice: UpdateCustomerService;
let createcustomerservice: CreateCustomerService;


describe("update customer test", () => {
    beforeEach( () => {
        mockcustomerRepository = new MockCustomersRepository();
        updatecustomerservice = new UpdateCustomerService(mockcustomerRepository);
        createcustomerservice = new CreateCustomerService(mockcustomerRepository);
    });
    it("update a customer there not exist", async () => {
        await expect(updatecustomerservice.execute({
            id: uuidv4(),
            name: "teste",
            email: "teste@gmail.com"
        })).rejects.toBeInstanceOf(AppError);
    });

    it("update a customer there exist with same email", async () => {
        const customer = await createcustomerservice.execute({
            name: "teste",
            email: "teste@gmail.com"
        });
        expect(customer).toHaveProperty("id");
        if (!customer.id) throw Error("no id")

        await expect(updatecustomerservice.execute({
            id: customer.id,
            name: "teste teste",
            email: "teste@gmail.com"
        })).resolves.toEqual({         
            id: customer.id,
            name: "teste teste",
            email: "teste@gmail.com"
        },);
    });

    it("update a customer with diferent values", async () => {
        const customer = await createcustomerservice.execute({
            name: "teste",
            email: "teste@gmail.com"
        });
        expect(customer).toHaveProperty("id");
        if (!customer.id) throw Error("no id")

        const customerUpdate = {
            id: customer.id,
            name: "teste teste",
            email: "teste123@gmail.com"
        }

        await expect(updatecustomerservice.execute(customerUpdate)).resolves.toEqual(customerUpdate);
    });
    it("update a customer with email equal other customer email", async () => {
        const customer = await createcustomerservice.execute({
            name: "teste",
            email: "teste@gmail.com"
        });
        expect(customer).toHaveProperty("id");
        if (!customer.id) throw Error("no id")

        const orthercustomer = await createcustomerservice.execute({
            name: "teste2",
            email: "teste123@gmail.com"
        });
        expect(orthercustomer).toHaveProperty("id");
        
        const customerUpdate = {
            id: customer.id,
            name: "teste teste",
            email: "teste123@gmail.com"
        }

        await expect(updatecustomerservice.execute(customerUpdate)).rejects.toBeInstanceOf(AppError)
    });
    
});