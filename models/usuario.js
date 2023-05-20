

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

// Este código se utiliza para definir la forma en que se serializa un objeto de usuario en una cadena JSON. El método toJSON() elimina las propiedades __v y password del objeto de usuario devuelto, lo que garantiza que no se incluyan en la cadena JSON.
//Para proteger la seguridad del usuario, se eliminan las propiedades sensibles, como la contraseña, antes de enviar el objeto de usuario como una cadena JSON.
UsuarioSchema.methods.toJSON = function(){
    const { __v, password,_id, ...usuario } = this.toObject();
    usuario.uid = _id
    return usuario
}


module.exports = model( "Usuario", UsuarioSchema );