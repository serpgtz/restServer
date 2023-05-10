const {Router} = require("express");
const { usuariosGet, usuarioPut, usuarioPost, usuarioDelete, usuarioPatch } = require("../controller/user");


const router = Router();


router.get('/', usuariosGet )

router.put('/:id',  usuarioPut )

router.post('/', usuarioPost  )

router.delete('/', usuarioDelete)

router.patch("/", usuarioPatch)
  






module.exports = router;