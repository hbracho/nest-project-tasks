import { User } from './user.entity';
import * as bycrypt from 'bcryptjs';  
describe('UserEntity', ()=>{

    let user: User;

    beforeEach(()=>{
        user = new User();
        user.password ='testPassword';
        user.salt ='testSalt'
        bycrypt.hash = jest.fn();

    })
    describe('validatePassword', ()=>{

        it('returns true as password is valid', async () => {
            bycrypt.hash.mockResolvedValue('testPassword');
            expect(bycrypt.hash).not.toHaveBeenCalled();
            const result = await user.validatePassword('12345');
            expect(bycrypt.hash).toHaveBeenCalledWith('12345', 'testSalt');
            expect(result).toEqual(true);
            console.log(result)
        })

        it('returns false as password is invalid', async ()=>{
            bycrypt.hash.mockResolvedValue('wrongPassword');
            expect(bycrypt.hash).not.toHaveBeenCalled();
            const result = await user.validatePassword('testPassword');
            expect(bycrypt.hash).toHaveBeenCalledWith('testPassword', 'testSalt');
            expect(result).toEqual(false);            
        })
    })
})