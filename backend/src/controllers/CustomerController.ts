import { request, Request, response, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Customer from '../models/Customer';
import CustomerDAO from '../DAO/Implementation/CustomerDao';

export default class CustomerController {
    customerDAO: CustomerDAO;
    private static instance: CustomerController;

    constructor() {
        this.customerDAO = new CustomerDAO();
    }

    public static get Instance() : CustomerController{
        if(!CustomerController.instance){
        CustomerController.instance = new CustomerController();
        }
        return CustomerController.instance;
    }
    async create(request: Request, response: Response) {
        const { name } = request.body;
        const schemaRequest = Yup.object().shape({
            name: Yup.string().required()
        });

        await schemaRequest.validate(request.body, {
            abortEarly: false
        });

        const customerToAdd = new Customer();
        customerToAdd.name = name;
        const newCustomer = await CustomerController.Instance.customerDAO.save(customerToAdd);

        return response.status(201).json({success: 'true'});
    }
    async getAllCustomer(request: Request, response: Response) {
        let res = await CustomerController.instance.customerDAO.getAll();
        return response.status(201).json(res);
    }
    async getCustomerById(id: number) {
        const schemaRequest = Yup.number().required();

        await schemaRequest.validate(id, {
            abortEarly: false
        });

        const customer = await CustomerController.Instance.customerDAO.getById(id);

        return customer;
    }
}
