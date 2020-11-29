import IDAO from './IDao';

export default interface IProductDAO extends IDAO {
    getByName(name: string): Promise<Object>;
}
