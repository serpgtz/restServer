const path = require("path");
const { v4: uuidv4 } = require('uuid');
 
const { response } = require("express");



const cargarArchivo = (req,res=response) => {
   
  
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
      res.status(400).send('No hay archivos que subir.');
      return;
    }
    
  
  
  
    const { archivo } = req.files

    const nombreCortado = archivo.name.split(".");
    console.log(nombreCortado)

    const extension = nombreCortado[nombreCortado.length-1];

    //validar la extension

    const extensionesValidas = ["jpg","jpeg","png","gif"]

    if(!extensionesValidas.includes(extension)){
        return res.status(400).json({
            msg:`La extension ${extension} no es valida para subir a la aplicacion. Estas son las permitidas ${extensionesValidas}`
        })

    }

   
    const nombreTemp = uuidv4() + "." + extension;
    const uploadPath = path.join( __dirname,  '../uploads' ,nombreTemp);
  
    archivo.mv(uploadPath, (err)=> {
      if (err) {
        console.log(err)
        return res.status(500).json({err});
      }
  
      res.json({msg:"file uploaded to "} + uploadPath);
    });

}


module.exports = {
    cargarArchivo,
}