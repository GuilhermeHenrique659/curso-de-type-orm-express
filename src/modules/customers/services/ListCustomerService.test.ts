import Customer from "../typeorm/entities/customers";
import { ICustomerPaginate } from "../typeorm/repositories/CustomersRepository";
import MockCustomersRepository from "../typeorm/repositories/mock/MockCustomerRepository";
import ListCustomerService from "./ListCustomerService";



let mockcustomerRepository: MockCustomersRepository;
let listcustomerservice: ListCustomerService;

describe("Should return a array of Customers", () => {
    beforeEach( () => {
        mockcustomerRepository = new MockCustomersRepository;
        listcustomerservice = new ListCustomerService(mockcustomerRepository);
    });
    it("return a empty list os customer", async () => {
        await expect(listcustomerservice.execute({
            page: 0,
            limit: 10
        }) ).resolves.toHaveProperty("data")
    });
});
