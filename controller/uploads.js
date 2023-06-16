
const path = require("path")
const fs = require("fs")
const { response } = require("express");
const { subirArchivo } = require("../helpers")

const {Usuario, Producto} = require("../models/");
const { model } = require("mongoose");



const cargarArchivo = async(req,res=response) => {
   
  
    
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


        //Limpiar imagenes previas  

        if ( modelo.img){

            //hay que borrar la imagen del servidor 
            const pathImagen = path.join(__dirname,"../uploads",coleccion,modelo.img);
            if(fs.existsSync(pathImagen)){// verifica si exsite el path
                fs.unlinkSync(pathImagen)//borra el archivo
            }
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