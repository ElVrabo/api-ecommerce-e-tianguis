import { Router } from "express";
import {getUserById, signIn, signUp, verifyToken} from "../controllers/users.controller.js";


const usersRoutes = Router()


usersRoutes.post('/signUp', signUp)
usersRoutes.post('/signIn',signIn)
usersRoutes.get('/user/:id', getUserById)
usersRoutes.get('/verifyToken', verifyToken)

export default usersRoutes