import { Router } from "express";
import {changePassword, getUserById, signIn, signUp, updateUserById, verifyToken} from "../controllers/users.controller.js";
import { authRequired } from "../middlewares/validatorToken.js";


const usersRoutes = Router()


usersRoutes.post('/signUp', signUp)
usersRoutes.post('/signIn',signIn)
usersRoutes.get('/user/:id', getUserById)
usersRoutes.put('/user/:id', updateUserById)
usersRoutes.put('/changePassword', authRequired,changePassword)
usersRoutes.get('/verifyToken', verifyToken)

export default usersRoutes