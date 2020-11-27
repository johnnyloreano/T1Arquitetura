import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';

import Order from './Order';

@Entity("customers")
export default class Customer {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @OneToMany(() => Order, order => order.ecommerce, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'customer_id' })
    orders: Order[];
}