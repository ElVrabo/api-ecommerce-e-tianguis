import mongoose from "mongoose";

const reviewProductsSchema = new mongoose.Schema({
    /*Hace referencia al id del producto en el modelo product*/ 
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
    required: true,
  },
  /*Se establece una referencia al modelo User, significa que el campo user tendra
      un objectID que se relaciona con un documento en la coleccion 'User'*/ 
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  rating: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  date: {
    type:Date,
    default:Date.now
},
});

export default mongoose.model("review", reviewProductsSchema);
