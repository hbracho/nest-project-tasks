import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(UserRepository) private userRepository: UserRepository){

    }

    async singUp(createUserDto: CreateUserDto): Promise<void>{
        this.userRepository.signUp(createUserDto);
    }
}
