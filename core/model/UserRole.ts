import { ValidationError } from "../../Error/AppError"
import HashAndComparePassword from "../lib/HashAndComparePassword"

export default class UserRole {

    private name: string = ""
    private permissions: string[] = []
    private id: string | null = null
    private createdOn: Date | null = null;
    private modifiedOn: Date | null = null;
    constructor(
        name: string,
        permissions: string[],
        id:string | null = null,
        createdOn?: Date,
        modifiedOn?: Date
    ) {
        this.setName(name)
        this.setPermissions(permissions)
        this.setId(id)
        if(createdOn) this.setCreatedOn(createdOn)
        if(modifiedOn) this.setModifiedOn(modifiedOn)
    }
    
    getId = () => this.id
    getName = () => this.name
    getPermissions = () => this.permissions
    getCreatedOn = () => {
        if(!this.createdOn) return  null;
        else return this.createdOn
    }
    getModifiedOn = () => this.modifiedOn

    setId = (id:string | null) => {
        this.id = id
    }

    setName = (name: string) => {
        if(!name) throw new ValidationError('Role.name is Required')
        if (name.length === 0)
            throw new ValidationError('Role.name length is 0')
        
        if (name.length > 60)
            throw new ValidationError('Role.name length should not be more than 60')

        this.name = name
    }

    setPermissions = (permissions: string[]) => {
        if(!permissions) throw new ValidationError('Role.permissions is Required')
        if(permissions.length==0) throw new ValidationError('Role.permissions is Required')
        this.permissions = permissions
    }
    private setCreatedOn = (createdOn:Date) =>{
        this.createdOn = createdOn;
    }

    private setModifiedOn =(modifiedOn:Date) =>{
        this.modifiedOn = modifiedOn;
    }
}