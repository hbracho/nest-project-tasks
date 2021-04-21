import { IsOptional } from "class-validator";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcryptjs from "bcryptjs";
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

    async validatePassword(passwod: string): Promise<boolean>{

        
        const hash = await bcryptjs.hash(passwod, this.salt);
        // console.log('hash',hash)
        // console.log('password', this.password)
        return hash === this.password;
    }
}