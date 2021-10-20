import { Router } from "express";
import {getUsers,createUser,getUser,deleteUser,updateUSer} from '../controllers/users.controller'

const router = Router();

router.route('/')
    .get(getUsers)
    .post(createUser)
export default router;

router.route('/:userId')
    .get(getUser)
    .delete(deleteUser)
    .put(updateUSer)
