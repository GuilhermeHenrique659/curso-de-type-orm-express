import AppError from "@shared/errors/AppError";
import MockCustomersRepository from "../typeorm/repositories/mock/MockCustomerRepository";
import CreateCustomerService from "./CreateCustomerService";
import DeleteCustomerService from "./DeleteCustomerService";
import ShowCustomerService from "./ShowCustomerService";

let mockcustomerRepository: MockCustomersRepository
let deletecustomerservice: DeleteCustomerService
let createcustomerservice: CreateCustomerService
let showcustomerservice: ShowCustomerService

describe("Delete customer test", () => {
    beforeEach(() => {
        mockcustomerRepository = new MockCustomersRepository();
        deletecustomerservice = new DeleteCustomerService(mockcustomerRepository);
        createcustomerservice = new CreateCustomerService(mockcustomerRepository);
        showcustomerservice = new ShowCustomerService(mockcustomerRepository);
    });
    it("Should create and delete customer two time", async () => {
        const customer = await createcustomerservice.execute({
            name: "teste",
            email: "teste@gmail.com"
        });
        expect(customer).toHaveProperty("id");
        if (!customer.id) throw Error("no id")

        await expect(deletecustomerservice.execute({
            id: customer.id
        }));
        await expect(deletecustomerservice.execute({
            id: customer.id
            })
        ).rejects.toBeInstanceOf(AppError)
    });
});