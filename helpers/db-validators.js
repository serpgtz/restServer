const Role = require("../models/role")
const Usuario = require("../models/usuario")


const esRoleValido = async (rol="")=>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en BD`)
    }
}

const existeEmailValidator = async (correo) => {
    const existeEmail = await Usuario.findOne({correo})
        if(existeEmail){
        throw new Error (`El correo ${correo} ya esta registrado`)
    };
}

const existeUsuariobyId = async (id) => {
    const existeUsuario = await Usuario.findById(id)
        if(!existeUsuario){
        throw new Error (`El Id: ${id} no existe`)
    };
}





module.exports = {
    esRoleValido,
    existeEmailValidator,
    existeUsuariobyId
}