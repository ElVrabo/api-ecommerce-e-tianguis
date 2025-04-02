  import jwt from "jsonwebtoken"
  import dotenv from "dotenv"

  dotenv.config()
  export async function authRequired(req,res,next){
    const {token} = req.cookies
    if(!token){
      // req.user = null
      // return next()
      return res.status(401).json({error:"No hay token"})
    }
    try {
         jwt.verify(token,process.env.TOKEN_SECRET,(err,user)=>{
          if(err){
            // req.user = null
            // return next()
            // next()
            return res.status(401).json({error:"Token invalido"})
          }else{
            req.user = user
            next()
          }
         })
    } catch (error) {
        req.user = null
        next()
    }
  }