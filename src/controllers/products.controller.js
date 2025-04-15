import Product from "../models/products.model.js";
import Review from "../models/reviewProducts.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()
export async function getProducts(req, res) {
    let products;
    try {
        const {token} = req.cookies
        let user = null
        if(token){
            try {
                user =  jwt.verify(token,process.env.TOKEN_SECRET)
            } catch (error) {
                return res.status(401).json({ error: "Token inválido" });
            }
        }
        if(!user){
            products = await Product.find()
        }else if(user.role === "comprador"){
            products = await Product.find()
        }else if(user.role === "vendedor"){
            products = await Product.find({
                user:user.id
            })
        }
        return res.status(200).json(products)
    } catch (error) {
        return res.status(500).json({ error: "Error del servidor" });
    }
    
}

export async function getProductById(req, res) {
  const { id } = req.params;
  try {
    const foundProduct = await Product.findById(id);
    if (!foundProduct) {
      return res.status(404).json({ error: "No se encontro el producto" });
    }
    return res.status(200).json(foundProduct);
  } catch (error) {}
}
export async function getProductByName(req, res) {
  const { productName } = req.query;

  try {
    if (!productName) {
      return res
        .status(400)
        .json({ error: "Debes ingresar el nombre del producto" });
    }
    const regex = new RegExp(productName, "i");
    const foundProduct = await Product.find({ name: regex });
    if (foundProduct.length === 0) {
      return res.status(404).json({ error: "El producto no se encontro" });
    }
    return res.status(200).json(foundProduct);
  } catch (error) {}
}
export async function getProductByCategory(req, res) {
  const { category } = req.query;
  try {
    const foundProducts = await Product.find({ category: category });
    if (foundProducts.length === 0) {
      return res
        .status(404)
        .json({ error: "No hay productos en esa categoria" });
    }
    return res.status(200).json(foundProducts);
  } catch (error) {}
}
export async function saveProduct(req, res) {
  const { name, description, category, price, stock, file, date } = req.body;
  try {
    if (!name || !description || !category || !price || !stock || !file) {
      return res
        .status(400)
        .json({ error: "Debes completar todos los campos" });
    }
    const newProducts = new Product({
      name,
      description,
      category,
      price : `$ ${price} MXN`,
      stock,
      file,
      date,
      user: req.user.id,
    });
    await newProducts.save();
    return res
      .status(201)
      .json({ message: "El producto se creo con exito" });
  } catch (error) {
    console.log('a ocurrido el siguiente error', error)
  }
}

export async function deleteProductById(req, res) {
  const { id } = req.params;
  try {
    const foundProduct = await Product.findByIdAndDelete(id);
    if (!foundProduct) {
      return res.status(404).json({ error: "No se encontro el producto" });
    }
    return res
      .status(20)
      .json({ message: "El producto se elimino correctamente" });
  } catch (error) {}
}

export async function updateProductById(req, res) {
  const { id } = req.params;
  const productData = req.body;
  try {
    const foundProduct = await Product.findByIdAndUpdate(id, productData, {
      new: true,
    });
    if (!foundProduct) {
      return res.status(404).json({ error: "No se encontro el producto" });
    }
    return res
      .status(200)
      .json({ message: "El producto se actualizo con exito" });
  } catch (error) {}
}

export async function insertReviewProduct(req,res){
  const {productId, userId,rating,comment,date} = req.body
  try {
    const review = new Review({
      product:productId,
      user:userId,
      rating,
      comment,
      date
    })
    await review.save()
    return res.status(201).json({message:'La reseña se creo con exito'})
  } catch (error) {
    console.log('A ocurrio el siguiente error', error)
    return res.status(500).json({error:'Errror interno del servidor', error})
  }
}

export async function getReviewProduct(req,res){
  const {id} = req.params
  try {
    const listReviews = await Review.find({product:id})
    if(listReviews.length <=0){
      return res.status(404).json({error:'El producto no tiene reseñas'})
    }
      return res.status(200).json(listReviews)
  } catch (error) {
    console.log('A ocurrido el siguiente error', error)
    return res.status(500).json({error:'Error interno del servidor', error})
  }
}


