import UserRoleMongoose, { IUserRoleMongoose } from '../models/user_role'
import UserRole from '../../model/UserRole'
import '../index.js' // for connnecting with DB
import mongoose from 'mongoose'
import {  OtherError, ValidationError, NotFoundError } from '../../../Error/AppError'


class UserRoleDataMapper {


    /***************** From Mongoose Model To Domain Model Start *****************/
    private static _fromMongooseToUserRole = (userRoleMongoose: IUserRoleMongoose) => {
        return new UserRole(
            userRoleMongoose.name,
            userRoleMongoose.permissions,
            userRoleMongoose._id
        )
    }
    /***************** From Mongoose Model To Domain Model End *****************/

    

    /***************** From Domain Model To Mongoose Model Start *****************/
    private static _fromUserRoleToMongoose = (userRole: UserRole) => {
       
        const userRoleMongoose: IUserRoleMongoose = {
            _id: new mongoose.Types.ObjectId(),
            name: userRole.getName(),
            permissions: userRole.getPermissions(),
            modified_on: new Date()
        }

        return userRoleMongoose;
    }
    /***************** From Domain Model To Mongoose Model End *****************/

    static count = async() =>{
        return await UserRoleMongoose.countDocuments({});
    }

    static find = async (filter: any) => {
        if(filter.id) {
            if(!mongoose.Types.ObjectId.isValid(filter.id)) throw new ValidationError("UserRole.id is not a valid Id")
        }
        let searchFilter:any = {};
        let offset:number = 0;
        let limit:number = 200;
        if(filter.offset) offset = filter.offset
        if(filter.limit) limit = filter.limit
        if(filter.search){
            let regex = new RegExp((filter.search).replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&"), 'gi')
            searchFilter.$or=[{name:regex}]
        }
        if(filter.id) searchFilter._id = filter.id
        if(filter.name) searchFilter.name = filter.name

        const responseMongooseArray = await UserRoleMongoose.find(searchFilter).skip(offset).limit(limit).exec();
        if(responseMongooseArray.length==0) throw new NotFoundError("No UserRole found")
        const response = responseMongooseArray.map(it => UserRoleDataMapper._fromMongooseToUserRole(it));

        return response
    }

    static save = async (userRole:UserRole)=>{
        const responseMongoose = await UserRoleMongoose.create(UserRoleDataMapper._fromUserRoleToMongoose(userRole));
        return UserRoleDataMapper.find({id:responseMongoose._id})
    }

    static update = async (userRole: UserRole) =>{

        let filter = {_id: userRole.getId()}
        let updateData = UserRoleDataMapper._fromUserRoleToMongoose(userRole);

        delete updateData._id;

        const responseMongoose = await UserRoleMongoose.findOneAndUpdate(filter, updateData, {new: true});

        if(responseMongoose)
            return UserRoleDataMapper.find({id:responseMongoose._id})
        else throw new OtherError();
    }

    static delete = async (userRoleId:string) =>{
        if(!mongoose.Types.ObjectId.isValid(userRoleId)) throw new ValidationError("UserRole.id is not a valid Id")
        
        let filter = {_id: userRoleId}
        const response = await UserRoleMongoose.deleteOne(filter).exec();

        if(response.ok == 1 && (response.deletedCount)?(response.deletedCount>0)?true:false:false) 
            return {message: "UserRole Deleted Successfully"}
        else throw new OtherError("No UserRole Found !");

    }

}

export default UserRoleDataMapper