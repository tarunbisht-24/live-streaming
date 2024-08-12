import express from 'express'
import { login, register } from '../controllers/userController.js'
import { signUpSchema, validate } from '../models/UserModel.js'

const router=express.Router()

router.route('/register').post(validate(signUpSchema),register)
router.route('/login').post(login)

export default router