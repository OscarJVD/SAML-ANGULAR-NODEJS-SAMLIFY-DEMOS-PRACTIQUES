import { Router } from "express";

import {checkRequest} from '../controllers/login.controller'

const router = Router()

router.route('/login')
    .post(checkRequest)