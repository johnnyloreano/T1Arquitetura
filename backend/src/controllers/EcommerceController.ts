import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Ecommerce from '../models/Ecommerce';
import EcommerceDao from '../DAO/Implementation/EcommerceDao'
export default class EcommerceController {
    ecommerceDao:EcommerceDao;
    private static instance: EcommerceController;

    public constructor(){
        this.ecommerceDao = new EcommerceDao();
    }

    public static getInstance() : EcommerceController{
        if(!EcommerceController.instance)
        EcommerceController.instance = new EcommerceController();
            return EcommerceController.instance;
    }

    async create(request: Request, response: Response) {
        const { name } = request.body;
        const schemaRequest = Yup.object().shape({
            name: Yup.string().required()
        });
        await schemaRequest.validate(request.body, {
            abortEarly: false
        });

        const newEcommerce = new Ecommerce();
        newEcommerce.name = name;

        const ecommerce = await EcommerceController.instance.ecommerceDao.save(newEcommerce);

        return response.status(201).json(ecommerce);
    }

    async getEcommerceById(id: number) {
        const schemaRequest = Yup.number().required()
        await schemaRequest.validate(id, {
            abortEarly: false
        });
        return await EcommerceController.instance.ecommerceDao.getById(id);
    }
    async index(request: Request, response: Response) {
        return await EcommerceController.instance.ecommerceDao.getAll();
    }
}
