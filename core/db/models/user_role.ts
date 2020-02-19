import mongoose from "mongoose";

export interface IUserRoleMongoose {
  _id: any,
  name: string,
  permissions:string[],
  created_on?: Date,
  modified_on?: Date
}


export interface IUserRoleMongooseDocument  extends IUserRoleMongoose, mongoose.Document{}

const userRoleSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name:{ type: String, required: [true,"Role Name is Required"] },
  permissions:{ type: [String], required: [true, "Role Permissions Required"]},
  created_on: {type: Date, default: Date.now},
  modified_on: {type: Date, default: Date.now}
});

export default mongoose.model<IUserRoleMongooseDocument>('UserRole', userRoleSchema)