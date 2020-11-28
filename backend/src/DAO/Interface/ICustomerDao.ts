import IDAO from './IDAO';

export default interface ICustomerDAO extends IDAO{
    getById(id: number): Promise<Object>;
}
