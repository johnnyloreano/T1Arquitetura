import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import DateUtils from '../utils/DateUtils';

import Order from '../models/Order';
import OrderDAO from '../DAO/Implementation/OrderDao';

import EcommerceController from '../controllers/EcommerceController';
import ProductController from '../controllers/ProductController';
import CustomerController from '../controllers/CustomerController';

export default class OrderController {
    orderDAO: OrderDAO;
    private static instance: OrderController;

    private constructor(){
        this.orderDAO = new OrderDAO();
    }

    public static getInstance() : OrderController{
        if(!OrderController.instance)
        OrderController.instance = new OrderController();
            return OrderController.instance;
    }

    async create(request: Request, response: Response) {
        const {
            selectEcommerce,
            listProducts,
            requestDate,
            deliverDate,
            status
        } = request.body;

        const schemaRequest = Yup.object().shape({
            selectEcommerce: Yup.string().required(),
            listProducts: Yup.array(
                Yup.object().shape({
                    name: Yup.string().required()
                })
            ),
            requestDate: Yup.string().required(),
            deliverDate: Yup.string().required(),
            status: Yup.mixed().oneOf(['Pronto', 'Postado', 'A Caminho', 'Chegou']).required()
        });

        await schemaRequest.validate(request.body, {
            abortEarly: false
        });

        const productController = new ProductController();

        const ecommerceController = new EcommerceController();
        const customerController = new CustomerController();

        const ecommerce = await ecommerceController.getEcommerceById(selectEcommerce);
        const customer = await customerController.getCustomerById(1);
        const products = await productController.addProducts(listProducts);
        const orderRepository = getRepository(Order);

        const orderDate = new Date(requestDate);
        const deliveryDate = new Date(deliverDate);
        const estimatedDeliveryDate = new Date(DateUtils.addTenDays(orderDate).toString());

        const data = {
            ecommerce,
            customer,
            products,
            orderDate,
            deliveryDate,
            estimatedDeliveryDate,
            status
        }

        const schema = Yup.object().shape({
            ecommerce: Yup.object().shape({
                id: Yup.number().required(),
                name: Yup.string()
            }),
            customer: Yup.object().shape({
                id: Yup.number().required(),
                name: Yup.string()
            }),
            products: Yup.array(
                Yup.object().shape({
                    id: Yup.number().required(),
                    name: Yup.string()
                })
            ),
            orderDate: Yup.date().required(),
            deliveryDate: Yup.date().required(),
            estimatedDeliveryDate: Yup.string().required()
        });

        await schema.validate(data, {
            abortEarly: false
        });

        const order = orderRepository.create(data);

        await orderRepository.save(order);

        return response.status(201).json(order);
    }

    async getOrdersByEcommerce(request: Request, response: Response) {
        const { id } = request.params;

        const schemaRequest = Yup.object().shape({
            id: Yup.string().required()
        });

        await schemaRequest.validate(request.params, {
            abortEarly: false
        });

        const orderRepository = getRepository(Order);

        const ecommerceController = new EcommerceController();
        const customerController = new CustomerController();

        const ecommerce = await ecommerceController.getEcommerceById(Number(id));
        const customer = await customerController.getCustomerById(1);

        const customerOrders = await orderRepository.find({
            relations: ['products'],
            where: [
                { ecommerce: ecommerce }
            ]
        });

        return response.json(customerOrders);
    }

    async getOrdersByParams(request: Request, response: Response) {
        const {
            ecommerceId,
            orderDate,
            deliveredOnTime,
            status
        } = request.query;

        const schemaRequest = Yup.object().shape({
            ecommerceId: Yup.string().nullable(),
            orderDate: Yup.string().nullable(),
            deliveredOnTime: Yup.boolean().nullable(),
            status: Yup.mixed().oneOf(['Pronto', 'Postado', 'A Caminho', 'Chegou']).nullable()
        }).nullable();

        await schemaRequest.validate(request.query, {
            abortEarly: false
        });
        const orderRepository = getRepository(Order);

        const ecommerceController = new EcommerceController();

        const ecommerce = ecommerceId && await ecommerceController.getEcommerceById(Number(ecommerceId));
        const orderDateFormat = orderDate && DateUtils.toDate(String(orderDate));

        let filter = {};
        if ( ecommerce ) filter = { ecommerce: ecommerce };
        if ( orderDateFormat ) filter = { orderDate: orderDateFormat };
        if ( status ) filter = { status: status };

        let customerOrders = await orderRepository.find({
            relations: ['products', 'ecommerce'],
            where: filter
        });

        if (deliveredOnTime) {
            customerOrders = customerOrders.filter(element => DateUtils.compareTo(element.deliveryDate, element.estimatedDeliveryDate));
        }
        return response.json(customerOrders);
    }
}
