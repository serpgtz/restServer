const express = require('express')


class Server {
    


    constructor(){
        this.app = express();
        this.port=process.env.PORT;


        //middlewares

        this.middlewares()
        //rutas de mi aplicacion

        this.routes();
       
    }
    middlewares(){
        //Directorio publico
        this.app.use(express.static("public"))
    }


    routes(){
        this.app.get('/api',  (req, res)=> {
            res.send('Hello World');
          })
          
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log("Servidor corriendo en :",this.port)
        })
        
    }
}




module.exports = Server