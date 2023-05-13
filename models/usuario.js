

const { Schema, model} = require("mongoose")


const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required: [true,"El nombre es Obligatorio"]
    },
    correo:{
        type: String,
        required: [true,"El correo es Obligatorio"],
        unique: true
    },
    password:{
        type: String,
        required: [true,"La contraseña es Obligatorio"]
    },
    img:{
        type: String
    },
    rol:{
        type: String,
        required: [true,"El rol es Obligatorio"],
        enum: ["ADMIN_ROL","USER_ROL"]
    },
    estado:{
        type: Boolean,
      default:true
    },
    google:{
        type: Boolean,
        default:false
    },

   

})


module.exports = model( "Usuario", UsuarioSchema );