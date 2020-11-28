import ICustomerDAO from '../Interface/ICustomerDao';
import Customer from '../../models/Customer'
import { getRepository } from 'typeorm';

export default class CustomerDAO implements ICustomerDAO {

    getById(id: number): Promise<Object> {
        let customerRepository = getRepository(Customer);
        return customerRepository.findByIds([id]).then(
            (customer) => {
                return customer; }
        ).catch(
            (err) => { return err; }
        );
    }
    save(customer: Customer): void {
        let customerRepository = getRepository(Customer);
        let newC = new Customer();
        newC.name = customer.name;
        customerRepository.save(newC).then(
            () => {return;}
        ).catch(
            (err) => { return err; }
        );
    }
    getAll(): Object {
        let customerRepository = getRepository(Customer);
        return customerRepository.find().then(
            (customerList) => {
                return customerList; }
        ).catch(
            (err) => { return err; }
        );
    }
    update(oldObj: Object, newObj: Object): void {
        throw new Error('Method not implemented.');
    }
    delete(arg0: Object): void {
        throw new Error('Method not implemented.');
    }
}
