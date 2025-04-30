import favoriteProducts from "../models/favoriteProducts.model.js"


export async function getFavoriteProducts (req,res){
  try {
    const listFavoriteProducts = await favoriteProducts.find({
        user:req.user.id
    })
    if(listFavoriteProducts.length === 0){
        return res.status(404).json({error:'No tienes productos favoritos'})
    }
      return res.status(200).json(listFavoriteProducts)
  } catch (error) {
    console.log('a ocurrido el siguiente error', error)
    return res.status(500).json(error)
  }
}

export async function saveFavoriteProducts(req,res){
    const {name,description,category,price,stock,file,date} = req.body
    try {
        const saveFavoriteProduct = new favoriteProducts({
            name,
            description,
            category,
            price,
            stock,
            image:file,
            date,
            user:req.user.id
        })
        await saveFavoriteProduct.save()
        return res.status(201).json({message:'El producto se añadio a favoritos'})
    } catch (error) {
        return res.status(500).json({error})
    }
}

export async function deleteFavoriteProduct (req,res){
    const {id} = req.params
    try {
        const favoriteProduct = await favoriteProducts.findByIdAndDelete(id)
        if(!favoriteProduct){
            return res.status(404).json({error:'No se encontro el producto favorito'})
        }
             return res.status(204)
    } catch (error) {
        
    }
}