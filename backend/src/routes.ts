import { Router } from 'express';
import CustomerController from './controllers/CustomerController';

import EcommerceController from './controllers/EcommerceController';
import OrderController from './controllers/OrderController';
import ProductController from './controllers/ProductController';

const productController = new ProductController();


const routes = Router();

routes.post('/ecommerce/add', EcommerceController.create);
routes.get('/ecommerce/all', EcommerceController.index);

routes.post('/order/add', OrderController.create);
routes.get('/order/getOrdersByEcommerce/:id', OrderController.getOrdersByEcommerce);
routes.get('/order/getOrdersByParams', OrderController.getOrdersByParams);

routes.post('/product/add', productController.create);

routes.post('/customer/add', CustomerController.create);


export default routes;
