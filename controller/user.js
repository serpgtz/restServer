const { response} = require("express");


const usuariosGet = (req, res = response)=> {
    res.json({  
        msg:"get API-Cntrolador"
    });
}

const usuarioPut = (req, res = response)=> {
    res.json({
        msg:"put API-Controller"
     });
    }

const usuarioPost = (req, res = response)=> {
    res.status(201).json({    
        msg:"post API-COntroller"
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