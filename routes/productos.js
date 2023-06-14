
const {Router} = require("express");
const { check } = require("express-validator");

const {validarCampos,validarJWT, esAdminrole} = require("../middlewares")

const {crearProducto, 
       obtenerProductos,
       obtenerProducto,
       actualizarProducto,
       borrarProducto} = require("../controller/productos")

const { existeCategoriabyId, existeProductobyId } = require("../helpers/db-validators");




const router = Router();

// Obtener todas las categorias-publico
router.get("/",obtenerProductos)

//Obtener una categoria por id-publico
router.get("/:id",[
    check("id", "No es un id  de Mongo valido").isMongoId(),
    check("id").custom(existeProductobyId),
    validarCampos,
],obtenerProducto)

//creat categoria -privado -cualquier persona con token valido

router.post("/",[validarJWT,
check("nombre","El nombre es Obligatorio").not().isEmpty(),
check("categoria","No es un id de Mongo").isMongoId(),
check("categoria").custom(existeCategoriabyId),
validarCampos,crearProducto],)

// Actualizar - privado -cualquiera con token valido
router.put("/:id",[
    validarJWT,
    // check("categoria","No es un id de Mongo").isMongoId(),
    check("id").custom(existeProductobyId),
    validarCampos,
],actualizarProducto)

//Borrar una categoria_debe de ser Admin

router.delete("/:id",[
    validarJWT,
    esAdminrole,
    check("id", "No es un id  de Mongo valido").isMongoId(),
    check("id").custom(existeProductobyId),
    validarCampos
],borrarProducto)


module.exports = router;

