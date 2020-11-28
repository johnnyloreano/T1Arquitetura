import { Router } from 'express';

import CustomerController from './controllers/CustomerController';
import EcommerceController from './controllers/EcommerceController';
import OrderController from './controllers/OrderController';
import ProductController from './controllers/ProductController';

const customerController = CustomerController.Instance;
const ecommerceController =  EcommerceController.getInstance();
const orderController = OrderController.getInstance();
const productController = ProductController.getInstance();
const routes = Router();

routes.post('/ecommerce/add', ecommerceController.create);
routes.get('/ecommerce/all', ecommerceController.index);

routes.post('/order/add', orderController.create);
routes.get('/order/getOrdersByEcommerce/:id', orderController.getOrdersByEcommerce);
routes.get('/order/getOrdersByParams', orderController.getOrdersByParams);

routes.post('/product/add', productController.create);
routes.get('/product/get', productController.getAll);

routes.post('/customer/add', customerController.create);
routes.get('/customer/get', customerController.getAllCustomer);

export default routes;
