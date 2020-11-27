import Product from '../../models/Product';
import IProductDAO from '../Interface/IProductDAO';

export default class ProductDao implements IProductDAO{
    save(Product: any): void {
        throw new Error('Method not implemented.');
    }
    getAll(): Product {
        throw new Error('Method not implemented.');
    }
    update(oldObj: Product, newObj: Product): void {
        throw new Error('Method not implemented.');
    }
    delete(Product: any): void {
        throw new Error('Method not implemented.');
    }



}