import Product from '../../models/Product';
export default interface IProductDao{
    save(arg0: Product): void;
    getAll(): Product;
    update(oldObj: Product , newObj: Product): void;
    delete(arg0: Product): void;
}