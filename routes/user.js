const {Router} = require("express");
const { check } = require("express-validator");
const { usuariosGet, usuarioPut, usuarioPost, usuarioDelete, usuarioPatch } = require("../controller/user");

const {validarCampos} = require("../middlewares/validar-campos")
const {esRoleValido,existeEmailValidator,existeUsuariobyId} = require("../helpers/db-validators")




const router = Router();


router.get('/', usuariosGet )

router.put('/:id', [
    check("id","No es un Id Valido tracala").isMongoId(),
    check("id").custom(existeUsuariobyId),
    check("rol").custom(esRoleValido),
    validarCampos], usuarioPut )

router.post('/',[
    check("correo", "el correo no es valido").isEmail(),
    check("nombre", "Debes agregar Nombre").not().isEmpty(),
    check("password", "Debes de tener al menos 6 caracteres").isLength({min:6}),
    // check("rol", "no es un rol  valido").isIn(["ADMIN_ROL","USER_ROL"]),
    check("rol").custom(esRoleValido),
    check("correo","El correo ya esta Registrado").custom(existeEmailValidator),
    validarCampos
], usuarioPost  )

router.delete('/:id',[
    check("id","No es un Id Valido tracala").isMongoId(),
    check("id").custom(existeUsuariobyId),
],validarCampos, usuarioDelete)

router.patch("/", usuarioPatch)
  






module.exports = router;