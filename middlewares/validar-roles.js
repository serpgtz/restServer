const { response } = require("express")



const esAdminrole = (req, res = response, next) => {

    if(!req.usuario){
        return res.status(500).json({
            msg:"Se quiere verificar el role sin validar el token primero"
        })
    }

    const {rol, nombre} = req.usuario;

    if( rol !=="Admin_Role"){
        return res.status(401).json({
            msg:`${nombre} no es administrador- No puede hacer esto`
        })
    }



    next()
}





module.exports = {
    esAdminrole
}