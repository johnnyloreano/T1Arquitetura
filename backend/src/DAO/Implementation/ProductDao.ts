import Product from '../../models/Product';
import IProductDAO from '../Interface/IProductDAO';
import { getRepository } from 'typeorm';


export default class ProductDAO implements IProductDAO {

    async save(product: Product): Promise<Product> {
        let productRepository = getRepository(Product);
        const newProduct = productRepository.create(product);
        return (await productRepository.save(newProduct).then(
            (newProduct) => { return newProduct }
        ).catch(
            (err) => { return err }
        )
        );
    }
    async getAll(): Promise<Product> {
        let productRepository = getRepository(Product);
        return productRepository.find().then(
            (productList) => { return productList; }
        ).catch(
            (err) => { return err; }
        );
    }
    async getByName(name: string): Promise<Product> {
        let productRepository = getRepository(Product);
        return productRepository.find({name}).then(
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
