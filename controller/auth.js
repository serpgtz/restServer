const {response} = require("express");
const Usuario = require("../models/usuario")
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");
const { googleVerify } = require("../helpers/google-verify");



const login = async(req,res = response)=> {

    const {correo,password} = req.body;

    try {

        // verificar si el email existe
        const usuario = await Usuario.findOne({correo});

        if(!usuario){
            return res.status(400).json({
                msg:"Usuario/Password no son correctos-correo"
            })
        }

        // verificar si el usuario esta activo

        if(!usuario.estado){// es igual a if(usuario.estado===false)
            return res.status(400).json({
                msg: "Usuario/Password no son correctos-estado:false"
            })
        }
        
        // Verificar contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);//regresa booleano

        if(!validPassword){
            return res.status(400).json({
                msg: "Usuario/Password no son correctos-password"
            })
        }


        //generar jwt

        const token = await generarJWT(usuario.id)




        res.json({
            msg: "Login ok",
            usuario,
            token
            
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg:"Hable con el administrador"
        })
    }

    
}


const googleSignIn = async(req, res = response) => {

    const { id_token } = req.body;
    
    try {
        const {nombre,img, correo} = await googleVerify( id_token );
    

        let usuario = await Usuario.findOne({ correo });

        if ( !usuario ) {
            // Tengo que crearlo
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                google: true
            };

            usuario = new Usuario( data );
            await usuario.save();
        }

        // Si el usuario en DB
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );
        
        res.json({
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            msg: 'Token de Google no es válido'
            
        })

    }



}


module.exports = {
    login,
    googleSignIn
}


