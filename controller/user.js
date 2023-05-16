const { response,} = require("express");
const Usuario = require("../models/usuario")
const bcryptjs = require("bcryptjs");



const usuariosGet = (req, res = response)=> {

    const {nombre, Apellido, edad} = req.query
    res.json({  
        msg:"get API-Cntrolador",
        nombre,
        Apellido,
        edad
    });
  
}

const usuarioPut = async(req, res = response)=> {

    const id = req.params.id;

    const {password, google,correo, ...restoInfo} = req.body

    // validar contra base de datos
    if (password){
        //encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        restoInfo.password = bcryptjs.hashSync(password,salt);

    }

    const usuario = await Usuario.findByIdAndUpdate(id, restoInfo);


    res.json({
        msg:"put API-Controller",
        usuario
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