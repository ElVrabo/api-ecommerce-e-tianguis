import mongoose from "mongoose";

const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category:{
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  offerPrice:{
    type:String
  },
  stock: {
    type: String,
    required: true,
  },
  file: {
    type: String,
    required: true,
  },
  offer:{
    type:Boolean
  },
  offerExpire:{
    type:String
  },
  date: {
    type:Date,
    default:Date.now
},
user:{
      /*el tipo de datos es un ObjectId de MongoDB. Los ObjectId son identificadores únicos de
       12 bytes generados automáticamente por MongoDB para cada documento en una colección.*/
      type:mongoose.Schema.Types.ObjectId,
      /*Se establece una referencia al modelo User, significa que el campo user tendra
      un objectID que se relaciona con un documento en la coleccion 'User'*/ 
      ref:'user',
      required:true
  },
});

export default mongoose.model('product',productsSchema)
