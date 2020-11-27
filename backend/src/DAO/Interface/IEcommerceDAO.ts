import Product from '../../models/Product';
export default interface IProductDao{
    save(arg0: Product): Promise<Product>;
    getAll(): Promise<Product>;
    getById(id: number): Promise<Product>;
    update(oldObj: Product , newObj: Product): void;
    delete(arg0: Product): void;
}