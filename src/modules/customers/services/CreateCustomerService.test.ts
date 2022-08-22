import AppError from "@shared/errors/AppError";
import "reflect-metadata"
import MockCustomersRepository from "../typeorm/repositories/mock/MockCustomerRepository";
import CreateCustomerService from "./CreateCustomerService";

let mockcustomerRepository: MockCustomersRepository
let createCusomer: CreateCustomerService


describe("CreateCustomer", () => {
    beforeEach(() => {
        mockcustomerRepository = new MockCustomersRepository();
        createCusomer = new CreateCustomerService(mockcustomerRepository);
    });
    it("should be able to create a new customer", async () => {
        const customer = await createCusomer.execute({
            name: "guilherme",
            email: "guilherme@gmail.com"
        });
        expect(customer).toHaveProperty("id"); 
    });

    it("should not able to create two customer with the same email", async () => {
        const customer = await createCusomer.execute({
            name: "guilherme",
            email: "guilherme@gmail.com"
        });
        expect(createCusomer.execute({
            name: "guilherme",
            email: "guilherme@gmail.com"
        })).rejects.toBeInstanceOf(AppError);
    });
})