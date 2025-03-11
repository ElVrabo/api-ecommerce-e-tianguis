import { createAccesToken } from "../libs/jwt.js";
import User from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();



export async function signUp(req, res) {
  try {
    const {
      name,
      email,
      phone,
      bussinessName,
      bussinessType,
      ine,
      password,
      password2,
      role,
      date,
      buyerAddress,
    } = req.body;

    if(role === 'vendedor'){
      const existingSeller = await User.findOne({ email });
    if (existingSeller) {
      return res.status(409).json({ error: "El correo ya está registrado" });
    }
    // Verificar si las contraseñas coinciden
    if (password !== password2) {
      return res.status(400).json({ error: "Las contraseñas no coinciden" });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    // Crear nuevo vendedor
    const newSeller = new User({
      name,
      email,
      phone,
      role,
      password: hashPassword,
      bussinessName,
      bussinessType,
      ine,
      // buyerAddress,
      date,
    });

    await newSeller.save();
    return res
    .status(201)
    .json({ message: "El vendedor se registró con éxito" });
    }
      
    const existingBuyer = await User.findOne({email})
    if(existingBuyer){
      return res.status(409).json({error:'El correo ya esta registrado'})
    }
    if (password !== password2) {
      return res.status(400).json({ error: "Las contraseñas no coinciden" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newBuyer = new User({
      name,
      email,
      phone,
      role,
      password: hashPassword,
      buyerAddress
  })
   await newBuyer.save();
   return res.status(201).json({message:"El comprador se segistro con exito"})

   
  } catch (error) {
    console.error("Error en signUpSeller:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;
  try {
    const foundUserByEmail = await User.findOne({ email });
    // const foundSellerByName = await Seller.findOne({name})
    if (!foundUserByEmail) {
      return res.status(404).json({ error: "El usuario no existe" });
    }
    const isMatch = await bcrypt.compare(password, foundUserByEmail.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }
    const token = await createAccesToken({ id: foundUserByEmail._id, role:foundUserByEmail.role });
    res.cookie("token", token);
    return res.status(200).json({ message: "Iniciaste sesion con exito", user:{
      role:foundUserByEmail.role
    } });
  } catch (error) {}
}

export async function verifyToken(req, res) {
  // const token = req.headers["authorization"]?.split(" ")[1];
  const token = req.cookies.token
  if (!token) {
    return res.status(404).json({ error: "No hay token" });
  }
  jwt.verify(token, process.env.TOKEN_SECRET, async (err, user) => {
    if (err) {
      return res.status(401).json({ error: "El token es invalido" });
    }
    const foundUser = await User.findById(user.id);
    if (!foundUser) {
      return res.status(404).json({ message: "No se encontro al usuario" });
    }
    return res.status(200).json({user:{
      id: foundUser._id,
      name: foundUser.name,
      email: foundUser.email,
      phone: foundUser.phone,
      role: foundUser.role
    }});
  });
}
