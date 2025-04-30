import { Router } from "express";
import { authRequired } from "../middlewares/validatorToken.js";
import { getFavoriteProducts, saveFavoriteProducts } from "../controllers/favoriteProducts.controller.js";


const favoriteProductsRoutes = Router()

favoriteProductsRoutes.get('/favoriteProducts',authRequired,getFavoriteProducts)
favoriteProductsRoutes.post('/favoriteProducts',authRequired,saveFavoriteProducts)
favoriteProductsRoutes.delete('/favoriteProducts/:id',saveFavoriteProducts)

export default favoriteProductsRoutes