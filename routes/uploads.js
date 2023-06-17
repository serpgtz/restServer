const {Router} = require("express");
const { check } = require("express-validator");
const { validarCampos,validarArchivoSubir } = require("../middlewares");
const { cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require("../controller/uploads");
const {coleccionesPermitidas} = require("../helpers");
const { route } = require("./auth");




const router = Router()


router.post("/",validarArchivoSubir, cargarArchivo)

router.put("/:coleccion/:id",[
    check("id", "EL id debe de ser de Mongo Id").isMongoId(),
    check("coleccion").custom(c=>coleccionesPermitidas(c,["usuarios","productos"])),
    validarArchivoSubir,
    validarCampos
],actualizarImagenCloudinary)
// actualizarImagen)

router.get("/:coleccion/:id",[
    check("id", "EL id debe de ser de Mongo Id").isMongoId(),
    check("coleccion").custom(c=>coleccionesPermitidas(c,["usuarios","productos"])),
    validarCampos,
    mostrarImagen
])


module.exports = router;