import mongoose, { mongo } from "mongoose";

const usersSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum: ['vendedor','comprador'],
        required:true
    },
   /*Campos especificos para vendedores*/ 
    bussinessName:{
       type:String,
              /*El campo es requerido si role es seller*/
       required: function (){
        return this.role === 'seller'
       }
    },
    bussinessType:{
        type:String,
               /*El campo es requerido si role es seller*/
        required: function (){
            return this.role === 'seller'
           }
    },
    ine:{
        type:String,
        /*El campo es requerido si role es seller*/
        required: function (){
            return this.role === 'seller'
           }
    },
    /*Campos especificos para compradores*/ 
    buyerAddress :{
        type:String,
        /*El campo solo es requerido si la propieda role es buyer*/
        required: function(){
          return this.role === 'buyer'
        }
    },
   
    date: {
        type:Date,
        default:Date.now
    }

})

export default mongoose.model('user',usersSchema)