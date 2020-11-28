import IDAO from './IDAO';

export default interface IOrderDAO extends IDAO{
    getOrdersByEcommerce(): Object;
    getOrdersByParams(): Object;
}
