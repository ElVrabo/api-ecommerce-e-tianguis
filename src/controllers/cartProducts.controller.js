import cartProduct from "../models/cartProducts.model.js";

export async function getCartProducts(req, res) {
  try {
    const cartProducts = await cartProduct.find({
        user:req.user.id
    });
    if (cartProducts.length === 0) {
      return res
        .status(404)
        .json({ error: "No hay ningun producto en el carrito" });
    }
    return res.status(200).json(cartProducts);
  } catch (error) {}
}

export async function addCartProduct(req, res) {
  const { name, description, price, stock, file, date } = req.body;
  try {
    const newCartProduct = new cartProduct({
      name,
      description,
      price,
      stock,
      image:file,
      date,
      user:req.user.id
    });
    await newCartProduct.save();
    return res
      .status(201)
      .json({ message: "EL producto se agrego al carrito correctamente" });
  } catch (error) {
    return res.status(500).json({error:error})
  }
}

export async function deleteCartProductById(req, res) {
  const { id } = req.params;
  try {
    const foundCartProduct = await cartProduct.findByIdAndDelete(id);
    if (!foundCartProduct) {
      return res
        .status(404)
        .json({ error: "No se encontro el producto en el carrito" });
    }
    return res.status(204)
     
  } catch (error) {}
}
