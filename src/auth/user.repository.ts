import { EntityRepository, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async signUp(createUserDto:CreateUserDto){
        const {username, password} = createUserDto;
        const user = new User()
        user.username=username;
        user.password = password;
        await user.save();
        console.log(user);
    }
}