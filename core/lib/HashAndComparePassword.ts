import bcrypt from "bcrypt";

export default class HashAndComparePassword{

    //to hash a password using bcrypt
    public static hashPassword(plainPassword:string):string{
        return bcrypt.hashSync(plainPassword, 10);
    }

    public static comparePassword(plainPassword:string,passwordHash:string):boolean{
        return bcrypt.compareSync(plainPassword, passwordHash);
    }
}