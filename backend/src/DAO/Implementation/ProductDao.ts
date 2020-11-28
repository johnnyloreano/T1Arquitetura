import Product from '../../models/Product';
import IProductDAO from '../Interface/IProductDAO';
import { getRepository } from 'typeorm';


export default class ProductDAO implements IProductDAO {

    productRepository = getRepository(Product);
    async save(product: Product): Promise<Product> {
        const newProduct = this.productRepository.create(product);
        return (await this.productRepository.save(newProduct).then(
            (newProduct) => { return newProduct }
        ).catch(
            (err) => { return err }
        )
        );
    }
    async getAll(): Promise<Product> {
        return this.productRepository.find().then(
            (productList) => { return productList; }
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
