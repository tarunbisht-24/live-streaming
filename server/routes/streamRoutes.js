import express from 'express'
import { doStream } from '../controllers/streamController.js'
import {isAuthenticated} from '../middlewares/auth.js'

const router=express.Router()

router.route('/auth').post(isAuthenticated,doStream)


export default router