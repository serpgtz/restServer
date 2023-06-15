
 
const { response } = require("express");
const { subirArchivo } = require("../helpers")



const cargarArchivo = async(req,res=response) => {
   
  
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
      res.status(400).send('No hay archivos que subir.');
      return;
    }

    try {
        //  const nombre = await subirArchivo(req.files,["txt"],"textos"); aqui un ejemplo como le paso que formato quiero que acepte y el nombre de la carperta en donde quiero que se guarden
         const nombre = await subirArchivo(req.files);

         res.json({
         nombre
    })
    } catch (msg) {
        res.status(400).json({msg})
    }   

    
    
  
  
  
    
}

const actualizarImagen = async( req, res=response ) => {

        const {id, coleccion} = req.params;

        res.json({
            id,
            coleccion
        })


}


module.exports = {
    cargarArchivo,
    actualizarImagen,
}