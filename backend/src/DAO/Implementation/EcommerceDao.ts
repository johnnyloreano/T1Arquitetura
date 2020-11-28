import IEcommerceDAO from '../Interface/IEcommerceDao';

import Ecommerce from '../../models/Ecommerce';
import { getRepository } from 'typeorm';

export default class EcommerceDAO implements IEcommerceDAO {

    
    async save(newEcommerce: Ecommerce): Promise<Ecommerce> {
        let EcommerceRepository = getRepository(Ecommerce);
        const result = EcommerceRepository.create(newEcommerce);
        return (await EcommerceRepository.save(result).then(
            (newEcommerce) => { return newEcommerce }
        ).catch(
            (err) => { return err }
        )
        );
    }
    async getAll(): Promise<Ecommerce> {
        let EcommerceRepository = getRepository(Ecommerce);
        return EcommerceRepository.find().then(
            (EcommerceList) => { return EcommerceList; }
        ).catch(
            (err) => { return err; }
        );
    }
    async getById(idNumber: number): Promise<Ecommerce> {
        let EcommerceRepository = getRepository(Ecommerce);
        return EcommerceRepository.findOne(idNumber).then(
            (newEcommerce) => { return newEcommerce }
        ).catch(
            (err) => { return err }
        );
    }
    update(oldObj: Object, newObj: Object): void {
        throw new Error('Method not implemented.');
    }
    delete(arg0: Object): void {
        throw new Error('Method not implemented.');
    }
}