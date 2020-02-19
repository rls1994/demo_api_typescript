import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();


export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    try {

        // const token = req.query['x-access-token'] || req.headers['x-access-token']
        // if(!token)  res.status(403).send({success: false, message: "No token Provided"});
        // const decoded = jwt.verify(token, "secret");

        const token = req.headers.authorization!.split(" ")[1];
        const decoded = jwt.verify(token, process.env.AUTH_SECRET!);
        // req.permissions = decoded.permissions
        req.permissions = [
            
            "userRole.add",
            "userRole.find",
            "userRole.update",
            "userRole.delete",            
        ]
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed',
            Error: error
        });
    }
};

// const token = jwt.sign(
//     {
//         permissions: ['a','b','c'],
//         Name:"Ram",
//     },
//     process.env.AUTH_SECRET!
//     ,
//     { expiresIn: 99999}
// );