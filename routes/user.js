const {Router} = require("express");
const { usuariosGet, usuarioPut, usuarioPost, usuarioDelete, usuarioPatch } = require("../controller/user");
const { check } = require("express-validator");
const {validarCampos} = require("../middlewares/validar-campos")
const Role = require("../models/role")


const router = Router();


router.get('/', usuariosGet )

router.put('/:id',  usuarioPut )

router.post('/',[
    check("correo", "el correo no es valido").isEmail(),
    check("nombre", "Debes agregar Nombre").not().isEmpty(),
    check("password", "Debes de tener al menos 6 caracteres").isLength({min:6}),
    // check("rol", "no es un rol  valido").isIn(["ADMIN_ROL","USER_ROL"]),
    check("rol").custom(async(rol="")=>{
        const existeRol = await Role.findOne({rol});
        if(!existeRol){
            throw new Error(`El rol ${rol} no esta registrado en BD`)
        }
    }),
    validarCampos
], usuarioPost  )

router.delete('/', usuarioDelete)

router.patch("/", usuarioPatch)
  






module.exports = router;