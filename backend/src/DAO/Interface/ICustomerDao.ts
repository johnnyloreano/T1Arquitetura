import IDAO from './IDao';

export default interface ICustomerDAO extends IDAO{
    getById(id: number): Promise<Object>;
}
