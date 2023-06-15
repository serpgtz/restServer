

const {Usuario,Categoria,Role,Producto} = require("../models/")


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

//validacion de categorias

const existeCategoriabyId = async (id) => {
    const existeCategoria = await Categoria.findById(id)
        if(!existeCategoria){
        throw new Error (`El Id: ${id} no existe`)
    };
}

const existeProductobyId = async (id) => {
    const existeProducto = await Producto.findById(id)
        if(!existeProducto){
        throw new Error (`El Id: ${id} no existe`)
    };
}

const coleccionesPermitidas = (coleccion= "", colecciones = []) => {

    const incluida = colecciones.includes(coleccion)
    if(!incluida) {
        throw new Error(`La coleccion ${coleccion} no es permitida las permitidas son : ${colecciones}`)
    }
    return true;


}






module.exports = {
    esRoleValido,
    existeEmailValidator,
    existeUsuariobyId,
    existeCategoriabyId,
    existeProductobyId,
    coleccionesPermitidas,
    
    
}