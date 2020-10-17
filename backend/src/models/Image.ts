import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import Foothold from './Foothold'

@Entity('images')
export default class Image {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path: string;

    @ManyToOne(() => Foothold, foothold => foothold.images)
    @JoinColumn({ name: 'foothold_id' })
    foothold: Foothold
    
}