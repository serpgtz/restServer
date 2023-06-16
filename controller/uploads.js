
 
const { response } = require("express");
const { subirArchivo } = require("../helpers")

const {Usuario, Producto} = require("../models/");
const { model } = require("mongoose");



const cargarArchivo = async(req,res=response) => {
   
  
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
      res.status(400).send('No hay archivos que subir.');
      return;
    }

    try {
        //  const nombre = await subirArchivo(req.files,["txt"],"textos"); aqui un ejemplo como le paso que formato quiero que acepte y el nombre de la carperta en donde quiero que se guarden
         const nombre = await subirArchivo(req.files,undefined,"imgs");

         res.json({
         nombre
    })
    } catch (msg) {
        res.status(400).json({msg})
    }   

    
    
  
  
  
    
}

const actualizarImagen = async( req, res=response ) => {

        const {id, coleccion} = req.params;


        let modelo;
    

        switch (coleccion) {
            case "usuarios":

                modelo = await Usuario.findById(id);
                if( !modelo ){
                    return res.status(400).json({
                        msg:`No existe el usuario con el id ${id}`
                    })
                }
                
                break;
            case "productos":

                modelo = await Producto.findById(id);
                if( !modelo ){
                    return res.status(400).json({
                        msg:`No existe Producto con el id ${id}`
                    })
                }
                
                break;
        
            default:
                return res.status(500).json({msg:"No existe validacion para esta opcion"})
                
        }

        const nombre = await subirArchivo(req.files,undefined,coleccion);
        modelo.img = nombre;

        await modelo.save();



        res.json(modelo)


}


module.exports = {
    cargarArchivo,
    actualizarImagen,
}