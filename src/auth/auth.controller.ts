import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){

    }

    @Post('singup')
    singUP(@Body() createUserDto: CreateUserDto){
        console.log(createUserDto);
        this.authService.singUp(createUserDto);
    }
}
