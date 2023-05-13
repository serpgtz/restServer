const {Router} = require("express");
const { usuariosGet, usuarioPut, usuarioPost, usuarioDelete, usuarioPatch } = require("../controller/user");
const { check } = require("express-validator");


const router = Router();


router.get('/', usuariosGet )

router.put('/:id',  usuarioPut )

router.post('/',[
    check("correo", "el correo no es valido").isEmail(),
], usuarioPost  )

router.delete('/', usuarioDelete)

router.patch("/", usuarioPatch)
  






module.exports = router;