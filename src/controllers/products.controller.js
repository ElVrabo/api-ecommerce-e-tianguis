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
  const {category} = req.query
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
            products = await Product.find({category})
        }else if(user.role === "comprador"){
            products = await Product.find({category})
        }else if(user.role === "vendedor"){
            products = await Product.find({
                category,
                user:user.id
            })
        }
        if(products.length === 0){
          return res.status(404).json({error:'No hay productos en esta categoria'})
        }
        return res.status(200).json(products)
    } catch (error) {
        return res.status(500).json({ error: "Error del servidor" });
    }
}
export async function getProductsOffer(req,res){
  const {token} = req.cookies
  const offer = true
  let user;
  let productsOffer = []
  if(token){
    try {
      /*se verifica el usuario autenticado, si todo sale bien, se almacena el objeto en user*/
      user = jwt.verify(token, process.env.TOKEN_SECRET)
      // console.log(user)
    } catch (error) {
      return res.status(401).json({error:"Token invalido"})
    }
  }
  if(!user){
    productsOffer = await Product.find({offer})
  }else if(user.role === 'comprador'){
     productsOffer = await Product.find({offer})
  }else if(user.role === 'vendedor'){
    productsOffer = await Product.find({offer,user:user.id})
  }
  if(productsOffer.length === 0 ){
    return res.status(404).json({error:"No hay productos en oferta"})
  }
   console.log(productsOffer)
   return res.status(200).json(productsOffer)
}
export async function getProductsOfferByCategory(req,res){
  const {category} = req.query
  const {token} = req.cookies
  let productsOfferCategory = []
  let user;
  const offer = true
  try {
     user = jwt.verify(token,process.env.TOKEN_SECRET)
  } catch (error) {
    return res.status(401).json({error:"Token invalido"})
  }
  if(user){
    productsOfferCategory = await Product.find({offer,category,user:user.id})
  }
  return res.status(200).json(productsOfferCategory)
}

export async function saveProduct(req, res) {
  const { name, description, category, price, offerPrice, stock, file, offer,offerExpire, date } = req.body;
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
      offerPrice:`$ ${offerPrice} MXN`,
      stock,
      file,
      offer,
      offerExpire,
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
  let productData = req.body;
  productData.offer = productData.offer === "true" || productData.offer === true;

  if(productData.offer){
    const priceValue = productData.offerPrice
      ?.toString()
      .replace(/[^0-9.]/g, ""); // elimina símbolos como $, MXN, espacios

    productData.offerPrice = `$ ${priceValue} MXN`;
  }else{
     productData.offerPrice = ""
     productData.offerExpire = ""
  }
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


