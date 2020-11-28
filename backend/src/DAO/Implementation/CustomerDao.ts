import ICustomerDAO from '../Interface/ICustomerDao';

export default class CustomerDAO implements ICustomerDAO {
    getById(id: number): Promise<Object> {
        throw new Error('Method not implemented.');
    }
    save(arg0: Object): void {
        throw new Error('Method not implemented.');
    }
    getAll(): Object {
        throw new Error('Method not implemented.');
    }
    update(oldObj: Object, newObj: Object): void {
        throw new Error('Method not implemented.');
    }
    delete(arg0: Object): void {
        throw new Error('Method not implemented.');
    }
}
