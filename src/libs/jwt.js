import { TOKEN_SECRET } from "../config.js"
import jwt from "jsonwebtoken"

export const createAccesToken = (payload)=>{
    return new Promise((resolve, reject) => {
        /*el metodo sign nos pide primero un payload(dato que se quiere guardar dentro del token)
   el secretOrPrivateKey que es un string para cifrar o desifrar el contenido, las opciones
   de cuanto queremos que dure y algoritmo*/
   jwt.sign(
       payload,
       TOKEN_SECRET,{
          expiresIn:"1d"
      },(err,token)=>{
         if(err) reject(err)
         resolve(token)
            
         
      })
   })
}