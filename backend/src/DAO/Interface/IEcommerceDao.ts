import IDAO from './IDAO';

export default interface IEcommerceDAO extends IDAO{
    getById(id: number): Promise<Object>;
}
