const {Router} = require("express");
const { check } = require("express-validator");

const {validarCampos,validarJWT} = require("../middlewares")

const {crearCategoria, obtenerCategorias,obtenerCategoria} = require("../controller/categorias");
const { existeCategoriabyId } = require("../helpers/db-validators");




const router = Router();

// Obtener todas las categorias-publico
router.get("/",obtenerCategorias)

//Obtener una categoria por id-publico
router.get("/:id",[
    check("id", "No es un id  de Mongo valido").isMongoId(),
    check("id").custom(existeCategoriabyId),
    validarCampos,
],obtenerCategoria)

//creat categoria -privado -cualquier persona con token valido

router.post("/",[validarJWT,
check("nombre","El nombre es Obligatorio").not().isEmpty(),
validarCampos,crearCategoria],)

// Actualizar - privado -cualquiera con token valido
router.put("/:id",(req,res)=>{
    res.json("put ok")
})

//Borrar una categoria_debe de ser Admin

router.delete("/:id",(req,res)=>{
    res.json("delete ok")
})


module.exports = router;

