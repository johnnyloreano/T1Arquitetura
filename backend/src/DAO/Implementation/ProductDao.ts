import IDao from '../Interface/IDao';

export default class ProductDao implements IDao{
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
