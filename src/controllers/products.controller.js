import Product from "../models/products.model.js"


export async function getProducts(req,res){
    let products;
    try {
        if(req.user.role === 'vendedor'){
             products = await Product.find({
                user:req.user.id
             })
        }else if(req.user.role === 'comprador') {
              products = await Product.find()
        }
        return res.status(200).json(products)
     
    } catch (error) {
        
    }
}

export async function getProductById(req,res){
    const {id} = req.params
    try {
     const foundProduct = await Product.findById(id)
     if(!foundProduct){
        return res.status(404).json({error:"No se encontro el producto"})
     }
        return res.status(200).json(foundProduct)
    } catch (error) {
        
    }
}
export async function getProductByName(req,res){
    const {productName} = req.query

    try {
        if(!productName){
            return res.status(400).json({error:"Debes ingresar el nombre del producto"})
        }
        const regex = new RegExp(productName,"i")
        const foundProduct = await Product.find({name:regex})
        if(foundProduct.length === 0){
            return res.status(404).json({error:"El producto no se encontro"})
        }
            return res.status(200).json(foundProduct)
    } catch (error) {
        
    }
}
export async function getProductByCategory(req,res){
      const {category} = req.query
      try {
        const foundProducts = await Product.find({ category: category})
        if(foundProducts.length === 0){
            return res.status(404).json({error:'No hay productos en esa categoria'})
        }
          return res.status(200).json(foundProducts)
      } catch (error) {
        
      }
}
export async function saveProduct (req,res){
   const {name,description,category,price,stock,image,date} = req.body
   try {
    if(!name || !description || !category || !price || !stock || !image){
        return res.status(400).json({error:"Debes completar todos los campos"})
    }
    const newProducts = new Product({
        name,
        description,
        category,
        price,
        stock,
        image,
        date,
        user:req.user.id
    })
    await newProducts.save()
    return res.status(201).json({message:'El producto se creo con exito en la base de datos'})
   } catch (error) {
   }
}

export async function deleteProductById(req,res){
    const {id} = req.params
    try {
      const foundProduct = await Product.findByIdAndDelete(id)
      if(!foundProduct){
        return res.status(404).json({error:"No se encontro el producto"})
      }
       return res.status(20).json({message:"El producto se elimino correctamente"})
    } catch (error) {
        
    }
}

export async function updateProductById(req,res){
    const {id} = req.params
    const productData = req.body
    try {
        const foundProduct = await Product.findByIdAndUpdate(
            id,
            productData,
            {new: true}
        )
        if(!foundProduct){
            return res.status(404).json({error:"No se encontro el producto"})
        }
            return res.status(200).json({message:"El producto se actualizo con exito"})
    } catch (error) {
        
    }
}