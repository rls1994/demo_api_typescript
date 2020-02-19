import express from 'express'
import {getUserRoles, addUserRole, updateUserRole, deleteUserRole} from '../handler/userRoleHandler'
import { checkAuth } from '../middleware/chechAuth';
import multer from "multer"
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      cb(null,(file.originalname).replace(/ /g,'_').toLowerCase())
    }
  })
  
let upload = multer({ storage: storage })


const router = express.Router()

router.put('/',checkAuth, upload.fields([{name:"pic",maxCount:5}]), addUserRole);

router.post('/',checkAuth, getUserRoles);

router.patch('/',checkAuth,updateUserRole);

router.delete('/:id',checkAuth, deleteUserRole);


export default router