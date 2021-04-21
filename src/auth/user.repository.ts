import { ConflictException, InternalServerErrorException, Logger } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import * as bcryptjs from 'bcryptjs';

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    private logger = new Logger(UserRepository.name);

    async signUp(createUserDto: CreateUserDto): Promise<void> {
        
        const { username, password } = createUserDto;
        const user = new User()
        user.username = username;
        user.salt = await bcryptjs.genSalt();
        user.password = await this.hashpassword(password, user.salt);

        try{
            const result = await user.save();  
            this.logger.debug({message: 'user saved', contextMap:{user: result.username, id: result.id}})
        } catch(error){            
            if(error.code === '23505'){//duplicate username
                throw new ConflictException('The username already existis')
            }else{
                throw new InternalServerErrorException();
            }
        }

    }

    async findtoUser(username: string): Promise<User>{

        const query = this.createQueryBuilder('user');
        query.andWhere('username=:username',{username})
        return await query.getOne();
    }

    private async hashpassword(password: string, salt: string): Promise<string>{

        return await bcryptjs.hash(password, salt);
    }

    async validatePassword(user: CreateUserDto): Promise<string>{

        this.logger.debug({message: 'starting validatePassswotd', contextMap:{user: user.username}});
        const {username, password} = user;

        const result = await this.findOne({username});
        
        this.logger.debug({message: 'the user exists: ', contextMap:{user: result}});
       
        if (result){

            let isValidate= await result.validatePassword(password)
            this.logger.debug({message: 'is valid credentials: ', contextMap:{result: isValidate}});
            if (isValidate){
                return username;
            }else {
                return null;
            }
        } else{
            return null
        }
    }
}