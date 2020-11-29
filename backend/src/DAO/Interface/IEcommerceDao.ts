import IDAO from './IDao';

export default interface IEcommerceDAO extends IDAO{
    getById(id: number): Promise<Object>;
}
