import ICustomerDAO from '../Interface/ICustomerDao';
import Customer from '../../models/Customer'
import { getRepository } from 'typeorm';

export default class CustomerDAO implements ICustomerDAO {

    getById(id: number): Promise<Object> {
        throw new Error('Method not implemented.');
    }
    save(arg0: Object): void {
        throw new Error('Method not implemented.');
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
