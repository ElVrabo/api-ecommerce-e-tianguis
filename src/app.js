import express from 'express';
import cors from "cors"
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import usersRoutes from './routes/users.routes.js';
import connectDB from './db.js';
import productsRoutes from './routes/products.routes.js';
import cartProductsRoutes from './routes/cartProducts.routes.js';
const app = express()

connectDB()

app.use(cors({
    origin:"http://localhost:5173",
    // origin:"http://localhost:3000",
    methods:['GET','POST','PUT','DELETE'],
    /*Establece las cookies en ese dominio*/ 
    credentials:true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(morgan('dev'))
app.use('/api', usersRoutes)
app.use('/api', productsRoutes)
app.use('/api', cartProductsRoutes)


export default app