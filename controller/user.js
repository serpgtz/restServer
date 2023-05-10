const { response} = require("express");


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

const usuarioPost = (req, res = response)=> {
    const body = req.body
    res.status(201).json({    
        msg:"post API-COntroller",
        body,
        });

        console.log(body)
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