import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { StatusTask } from "./tasks.model";

@Entity()
export class Task extends BaseEntity {

    @PrimaryGeneratedColumn()
    private id: number;
    @Column()
    private title:string;
    @Column()
    private description: string;
    @Column()
    private status: StatusTask;
}