const {Router} = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { cargarArchivo, actualizarImagen } = require("../controller/uploads");
const {coleccionesPermitidas} = require("../helpers")




const router = Router()


router.post("/", cargarArchivo)

router.put("/:coleccion/:id",[
    check("id", "EL id debe de ser de Mongo Id").isMongoId(),
    check("coleccion").custom(c=>coleccionesPermitidas(c,["usuarios","productos"])),
    validarCampos
],actualizarImagen)


module.exports = router;