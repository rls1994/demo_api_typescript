import UserRoleDataMapper from '../db/datamapper/UserRoleDataMapper'
import { AuthenticationError } from '../../Error/AppError';
import UserRole from '../model/UserRole';

class UserRoleController {

    static addUserRole = async (data:UserRole,permissions:string[]) =>{
        if(!permissions.includes("userRole.add")) throw new AuthenticationError();
        const response = await UserRoleDataMapper.save(data);

        return response;
    }

    static getUserRole = async(filter:{}, permissions:string[]) => {
        if(!permissions.includes("userRole.find")) throw new AuthenticationError();
        const response = await UserRoleDataMapper.find(filter);

        return response;
    }

    static countUserRole = async(permissions:string[]) => {
        if(!permissions.includes("userRole.find")) throw new AuthenticationError();
        return await UserRoleDataMapper.count();
    }

    static updateUserRole = async(Data: UserRole, permissions:string[]) =>{
        if(!permissions.includes("userRole.update")) throw new AuthenticationError();
        const response = await UserRoleDataMapper.update(Data);

        return response;
    }

    static deleteUserRole = async(Id: string, permissions:string[]) =>{
        if(!permissions.includes("userRole.delete")) throw new AuthenticationError();
        const response = await UserRoleDataMapper.delete(Id);
        
        return response;
    }

}

export default UserRoleController
