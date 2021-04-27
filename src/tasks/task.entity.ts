import { User } from '../auth/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { StatusTask } from "./task-status.enum";

@Entity()
export class Task extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    title:string;
    @Column()
    description: string;
    @Column()
    status: StatusTask;

    @ManyToOne(type=> User, user => user.tasks, {eager: false})
    user: User;

    @Column()
    userId:number;
}