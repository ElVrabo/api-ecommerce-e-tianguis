import { Router } from "express";
import { deleteProductById, getProductByCategory, getProductById, getProductByName, getProducts, saveProduct, updateProductById } from "../controllers/products.controller.js";
import {authRequired} from "../middlewares/validatorToken.js"



const productsRoutes = Router()


productsRoutes.get('/products',authRequired,getProducts)
productsRoutes.get('/products/:id',getProductById)
productsRoutes.get('/searchProduct', getProductByName)
productsRoutes.get('/searchProductByCategory', getProductByCategory)
productsRoutes.post('/products',authRequired,saveProduct)
productsRoutes.put('/products/:id')
productsRoutes.delete('/products/:id',deleteProductById)
productsRoutes.put('/products/:id', updateProductById )

export default productsRoutes
