import { Router } from "express";
import { addCartProduct, deleteCartProductById, getCartProducts } from "../controllers/cartProducts.controller.js";
import { authRequired } from "../middlewares/validatorToken.js";



const cartProductsRoutes = Router()

cartProductsRoutes.get('/cartProducts',authRequired, getCartProducts)
cartProductsRoutes.post('/cartProducts',authRequired, addCartProduct)
cartProductsRoutes.delete('/cartProducts/:id',deleteCartProductById)

export default cartProductsRoutes