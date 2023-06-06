const {Router} = require("express");
const { check } = require("express-validator");

const {validarCampos,validarJWT} = require("../middlewares")

const {crearCategoria} = require("../controller/categorias")




const router = Router();

// Obtener todas las categorias-publico
router.get("/",(req,res)=>{
    res.json("get ok")
})

//Obtener una categoria por id-publico
router.get("/:id",(req,res)=>{
    res.json("get id ok")
})

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

