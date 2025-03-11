import { Router } from "express";
import {signIn, signUp, verifyToken} from "../controllers/users.controller.js";


const usersRoutes = Router()


usersRoutes.post('/signUp', signUp)
usersRoutes.post('/signIn',signIn)
usersRoutes.get('/verifyToken', verifyToken)

export default usersRoutes