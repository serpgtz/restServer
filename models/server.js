const express = require('express')
const cors = require("cors");
const { dbConnection } = require('../db/config');


class Server {
    


    constructor(){
        this.app = express();
        this.port=process.env.PORT || 3000;

        this.paths = {
            usuarios:"/api/usuarios",
            categorias:"/api/categorias",
            auth: "/api/auth"
        }
      

        //conectar a base de datos

        this.conectarDB();



        //middlewares

        this.middlewares()
        //rutas de mi aplicacion

        this.routes();
       
    }

   async conectarDB(){
        await dbConnection()
    }

    middlewares(){

        //cors
        this.app.use(cors())
        // parseo y lectura del body
        this.app.use(express.json())
        //Directorio publico
        this.app.use(express.static("public"))
        //
        
    }


    routes(){
        this.app.use(this.paths.auth, require("../routes/auth"))
        this.app.use(this.paths.usuarios, require("../routes/user"))
        this.app.use(this.paths.categorias,require("../routes/categorias"))
          
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log("Servidor corriendo en :",this.port)
        })
        
    }
}




module.exports = Server
