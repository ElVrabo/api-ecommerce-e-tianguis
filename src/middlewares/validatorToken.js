  import jwt from "jsonwebtoken"
  import dotenv from "dotenv"

  dotenv.config()
  export async function authRequired(req,res,next){
    const {token} = req.cookies
    if(!token){
        return res.status(401).json({error:"No hay token"})
    }
    try {
         jwt.verify(token,process.env.TOKEN_SECRET,(err,user)=>{
          if(err){
            return res.status(401).json({error:"token invalido"})
          }else{
            req.user = user
            next()
          }
         })
    } catch (error) {
        
    }
  }