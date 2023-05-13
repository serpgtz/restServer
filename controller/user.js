const { response,} = require("express");
const Usuario = require("../models/usuario")
const bcryptjs = require("bcryptjs")


const usuariosGet = (req, res = response)=> {

    const {nombre, Apellido, edad} = req.query
    res.json({  
        msg:"get API-Cntrolador",
        nombre,
        Apellido,
        edad
    });
  
}

const usuarioPut = (req, res = response)=> {

    const id = req.params.id;
    res.json({
        msg:"put API-Controller",
        id
     });
    }

const usuarioPost = async (req, res = response)=> {
    const {nombre,correo, rol, password} = req.body


    const usuario = new Usuario({
        nombre,
        correo,
        rol,
        password
    })

     //verificar si el correo existe



    // encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password,salt);
   
    // guardar bd
    await usuario.save();
 
    res.status(201).json({    
        msg:"post API-COntroller",
        usuario
        });


    }
const usuarioDelete = (req, res = response)=> {
    res.json({      
        msg:"delete API-controler"  
        });
    }

const usuarioPatch = (req, res = response)=> {
    res.json({      
        msg:"patch API-controler"  
        });
    }    




module.exports = {
    usuariosGet,
    usuarioPut,
    usuarioPost,
    usuarioDelete,
    usuarioPatch,
}