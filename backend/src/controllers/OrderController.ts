import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Order from '../models/Order';
import EcommerceController from '../controllers/EcommerceController';
import ProductController from '../controllers/ProductController';
import CustomerController from '../controllers/CustomerController';

export default {
    async create(request: Request, response: Response) {
        const {
            selectEcommerce,
            listProducts,
            requestDate,
            deliverDate,
            status
        } = request.body;

        const ecommerce = await EcommerceController.getEcommerceById(selectEcommerce);
        const customer = await CustomerController.getCustomerById(1);
        const products = await ProductController.addProducts(listProducts);

        const orderRepository = getRepository(Order);

        const orderDate = new Date(requestDate);
        const deliveryDate = new Date(deliverDate);

        const data = {
            ecommerce,
            customer,
            products,
            orderDate,
            deliveryDate,
            status
        }

        const order = orderRepository.create(data);

        await orderRepository.save(order);

        return response.status(201).json(order);
    },

    async getOrdersByEcommerce(request: Request, response: Response) {
        const { id } = request.params;

        const customerRepository = getRepository(Order);

        const customerOrders = await customerRepository.createQueryBuilder("orders")
            .where("orders.customer_id = :idCustomer", {idCustomer: 1})
            .andWhere("orders.ecommerce_id = :idEcommerce", {idEcommerce: id})
            .getMany();

        return response.json(customerOrders);
    }
}
