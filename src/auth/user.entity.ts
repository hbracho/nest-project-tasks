import { IsOptional } from "class-validator";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcryptjs from "bcryptjs";
import { Task } from '../tasks/task.entity';
@Entity()
@Unique(['username'])
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    username: string;

    @Column()
    password: string;
    @Column()
    salt: string;

    @OneToMany(type=>Task, task=> task.user, {eager: true})
    tasks: Task[];
    async validatePassword(passwod: string): Promise<boolean>{

        
        const hash = await bcryptjs.hash(passwod, this.salt);
        // console.log('hash',hash)
        // console.log('password', this.password)
        return hash === this.password;
    }
}