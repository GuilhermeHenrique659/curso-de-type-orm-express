import CreateCustomerService from "./CreateCustomerService";
import DeleteCustomerService from "./DeleteCustomerService";
import ListCustomerService from "./ListCustomerService";
import ShowCustomerService from "./ShowCustomerService";
import UpdateCustomerService from "./UpdateCustomerService";

export default interface ICustomerServiceFactory
{
    GetCreateCustomerService(): CreateCustomerService;
    GetShowCustomerService(): ShowCustomerService;
    GetListCustomerService(): ListCustomerService;
    GetUpdateCustomerService(): UpdateCustomerService;
    GetDeleteCustomerService(): DeleteCustomerService;
}