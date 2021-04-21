import { ConflictException, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { create } from 'eslint/lib/rules/*';
import { QueryBuilder } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {

    private logger = new Logger(AuthService.name);

    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository){

    }

    singUp(createUserDto: CreateUserDto){
        
        this.logger.log( { message: "starting singUp for a user", contextMap: {username: createUserDto.username}});        
        this.userRepository.signUp(createUserDto);
        this.logger.log({message: "finished singUp for a user", contextMap : { username: createUserDto.username}});       
    }    
    
    async singIn(createUserDto: CreateUserDto){
        this.logger.log({message: "starting singIn a user", contextMap : { username: createUserDto.username}});        
        let username = await this.userRepository.validatePassword(createUserDto);
        this.logger.debug({message: 'called validate Password credentials returned', contextMap: {result: username}});

        if(!username){
            this.logger.error({message: 'credentials of the user is invalid',  contextMpap: {result: createUserDto.username}});
            throw new UnauthorizedException('Credentials invalid');
        }
        
    }
}
