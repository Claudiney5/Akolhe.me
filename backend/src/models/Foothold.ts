import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Image from './Image'

@Entity('footholds')
export default class Foothold {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    owner: string;

    @Column()
    latitude: number;

    @Column()
    longitude: number;

    @Column()
    name: string;

    @Column()
    phone: number;

    @Column()
    whatsapp: boolean;

    @Column()
    city: string;

    @Column()
    day_max: number;

    @Column()
    cost: number;

    @Column()
    energy: boolean;

    @Column()
    water: boolean;

    @Column()
    bathroom: boolean;

    @Column()
    shower: boolean;

    @Column()
    extra_info: string;

    @OneToMany(() => Image, image => image.foothold, {
        cascade: ['insert', 'update']
    })
    @JoinColumn({ name: 'foothold_id' })
    images: Image[]
}