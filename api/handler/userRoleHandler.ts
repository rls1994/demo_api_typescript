import express, { RequestHandler, NextFunction, Response, Request } from 'express'
import '../../modulepatch/expresspatch'
import { ValidationError, OtherError } from '../../Error/AppError'
import UserRole from '../../core/model/UserRole'
import UserRoleResponse from '../responseFormatter/UserRoleResponse'
import UserRoleController from '../../core/controller/userRoleController'


export const getUserRoles = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let rs = await UserRoleController.getUserRole(req.body, req.permissions);

        if(req.body.search || req.body.id || req.body.name) req.count = rs.length
        else req.count = await UserRoleController.countUserRole(req.permissions)
        req.data = UserRoleResponse.format(rs)
        next()
    }
    catch (e) {
        next(e)
    }
}


export const addUserRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let rq = req.body;

        let data = new UserRole(
            rq.name,
            rq.permissions
        );
        let rs = await UserRoleController.addUserRole(data, req.permissions);
        req.data = UserRoleResponse.format(rs);
        req.count = rs.length;
        next()
    }
    catch (e) {
        next(e)
    }
}


export const updateUserRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let rq = req.body;
        if (!rq.id) throw new ValidationError("userRole.id is Required")
        let data = new UserRole(
            rq.name,
            rq.permissions,
            rq.id
        );

        let rs = await UserRoleController.updateUserRole(data, req.permissions);
        req.count = 1;
        req.data = UserRoleResponse.format(rs);
        next()
    }
    catch (e) {
        next(e)
    }
}


export const deleteUserRole = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let rs = await UserRoleController.deleteUserRole(req.params.id, req.permissions);

        if (rs?.message) {
            req.message = rs.message;
            next();
        }
        else throw new OtherError();
    }
    catch (e) {
        next(e)
    }
}