import Ecommerce from '../../models/Ecommerce';
import IEcommerceDAO from '../Interface/IEcommerceDAO';
import { getRepository } from 'typeorm';


export default class EcommerceDao implements IEcommerceDAO {
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
    async getById(idNumber : number): Promise<Ecommerce>{
        return this.EcommerceRepository.findOne(idNumber).then(
            (newEcommerce) => { return newEcommerce }
        ).catch(
            (err) => { return err }
        );
    }
    update(oldObj: Ecommerce, newObj: Ecommerce): void {
        throw new Error('Method not implemented.');
    }
    delete(Ecommerce: any): void {
        throw new Error('Method not implemented.');
    }

}