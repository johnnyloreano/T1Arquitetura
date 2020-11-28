import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Ecommerce from '../models/Ecommerce';
import EcommerceDao from '../DAO/Implementation/EcommerceDAO'
export default class EcommerceController {

    ecommerceDao:EcommerceDao;

    EcommerceController(){
        this.ecommerceDao = new EcommerceDao();
    }

    async create(request: Request, response: Response) {
        const { name } = request.body;
        const schemaRequest = Yup.object().shape({
            name: Yup.string().required()
        });
        await schemaRequest.validate(request.body, {
            abortEarly: false
        });

        const ecommerceRepository = getRepository(Ecommerce);

        const newEcommerce = new Ecommerce();
        newEcommerce.name = name;

        const ecommerce = this.ecommerceDao.save(newEcommerce);

        return response.status(201).json(ecommerce);
    }

    async getEcommerceById(id: number) {
        const schemaRequest = Yup.number().required()
        await schemaRequest.validate(id, {
            abortEarly: false
        });
        return this.ecommerceDao.getById(id);
    }
    async index(request: Request, response: Response) {
        return this.ecommerceDao.getAll();
    }
}
