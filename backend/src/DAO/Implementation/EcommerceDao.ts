import IEcommerceDAO from '../Interface/IEcommerceDAO';

import Ecommerce from '../../models/Ecommerce';
import { getRepository } from 'typeorm';

export default class EcommerceDAO implements IEcommerceDAO {

    EcommerceRepository = getRepository(Ecommerce);
    async save(Ecommerce: Ecommerce): Promise<Ecommerce> {
        const newEcommerce = this.EcommerceRepository.create(Ecommerce);
        return (await this.EcommerceRepository.save(newEcommerce).then(
            (newEcommerce) => { return newEcommerce }
        ).catch(
            (err) => { return err }
        )
        );
    }
    async getAll(): Promise<Ecommerce> {
        return this.EcommerceRepository.find().then(
            (EcommerceList) => { return EcommerceList; }
        ).catch(
            (err) => { return err; }
        );
    }
    async getById(idNumber: number): Promise<Ecommerce> {
        return this.EcommerceRepository.findOne(idNumber).then(
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
