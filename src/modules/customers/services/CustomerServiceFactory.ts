import { connection } from "@shared/typeorm";
import Customer from "../typeorm/entities/customers";
import CustomersRepository from "../typeorm/repositories/CustomersRepository";
import ICustomersRepository from "../typeorm/repositories/ICustomersRepository";
import CreateCustomerService from "./CreateCustomerService";
import DeleteCustomerService from "./DeleteCustomerService";
import ICustomerServiceFactory from "./ICustomerServiceFactory";
import ListCustomerService from "./ListCustomerService";
import ShowCustomerService from "./ShowCustomerService";
import UpdateCustomerService from "./UpdateCustomerService";


class CustomerServiceFactory implements ICustomerServiceFactory
{
    private customerRepository: ICustomersRepository;

    constructor(customerRepository: ICustomersRepository){
        this.customerRepository = customerRepository;
    }

    public GetCreateCustomerService(): CreateCustomerService {
        return new CreateCustomerService(this.customerRepository);
    }

    public GetDeleteCustomerService(): DeleteCustomerService {
        return new DeleteCustomerService(this.customerRepository);
    }

    public GetListCustomerService(): ListCustomerService {
        return new ListCustomerService(this.customerRepository);
    }

    public GetShowCustomerService(): ShowCustomerService {
        return new ShowCustomerService(this.customerRepository);
    }

    public GetUpdateCustomerService(): UpdateCustomerService {
        return new UpdateCustomerService(this.customerRepository);
    }
}

const customersRepository = new CustomersRepository(connection.getRepository(Customer));

export const customerServiceFactory = new CustomerServiceFactory(customersRepository);