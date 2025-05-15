import { Router } from "express";
import { deleteProductById, getProductByCategory, getProductById, getProductByName, getProducts, getProductsOffer, getProductsOfferByCategory, getReviewProduct, insertReviewProduct, saveProduct, updateProductById } from "../controllers/products.controller.js";
import {authRequired} from "../middlewares/validatorToken.js"
import reviewProducts from "../models/reviewProducts.js";



const productsRoutes = Router()


productsRoutes.get('/products',getProducts)
productsRoutes.get('/productsOffer',getProductsOffer)
productsRoutes.get('/productsOfferCategory',getProductsOfferByCategory)
productsRoutes.get('/products/:id',getProductById)
productsRoutes.get('/searchProduct', getProductByName)
productsRoutes.get('/searchProductByCategory', getProductByCategory)
productsRoutes.get('/reviewProducts/:id', getReviewProduct)
productsRoutes.post('/products',authRequired,saveProduct)
productsRoutes.post('/reviewProducts',insertReviewProduct)
productsRoutes.put('/products/:id')
productsRoutes.delete('/products/:id',deleteProductById)
productsRoutes.put('/products/:id', updateProductById )

export default productsRoutes
