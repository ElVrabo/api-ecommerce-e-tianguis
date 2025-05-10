import { Router } from "express";
import { authRequired } from "../middlewares/validatorToken.js";
import { deleteFavoriteProduct, getFavoriteProducts, saveFavoriteProducts } from "../controllers/favoriteProducts.controller.js";


const favoriteProductsRoutes = Router()

favoriteProductsRoutes.get('/favoriteProducts',authRequired,getFavoriteProducts)
favoriteProductsRoutes.post('/favoriteProducts',authRequired,saveFavoriteProducts)
favoriteProductsRoutes.delete('/favoriteProducts/:id',deleteFavoriteProduct)

export default favoriteProductsRoutes