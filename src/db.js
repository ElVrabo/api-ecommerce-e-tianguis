import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

async function connectDB(){
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.9fxfoaa.mongodb.net/?retryWrites=true&w=majority`,{
            dbName:process.env.DB_NAME
        })
        console.log('Base de datos conectada con exito')
    } catch (error) {
        console.log('A ocurrido el siguiente error', error)
    }
}
export default connectDB