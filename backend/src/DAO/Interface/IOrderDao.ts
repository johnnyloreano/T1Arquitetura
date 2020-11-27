import IDao from '../Interface/IDao';

export default interface IOrderDao extends IDao{
    getOrdersByEcommerce(): Object;

    getOrdersByParams(): Object;
}
