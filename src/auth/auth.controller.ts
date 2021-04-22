import { Body, Controller, Logger, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {

    private logger = new Logger(AuthController.name);
    constructor(private authService: AuthService){

    }

    @Post('singup')
    singUP(@Body(ValidationPipe) createUserDto: CreateUserDto){
        
        try{

            this.authService.singUp(createUserDto);
        }catch(e){
            this.logger.error({message: 'error'});
        }
    }


    @Post('singin')
    async singIn(@Body(ValidationPipe) createUserDto: CreateUserDto):Promise<{accessToken:string}>{
        try{

            return await this.authService.singIn(createUserDto);
        }catch(e){
            this.logger.error({message: 'error harold bracho', thrown: {message: e.message, stackTrace: e.stack} });
            throw e;
        }
    }
}