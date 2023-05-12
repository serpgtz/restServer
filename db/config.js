const mongoose = require("mongoose")
const colors = require("colors")



const dbConnection = async()=> {

    try {
       await mongoose.connect(process.env.MONGODB_CNN)

       console.log("Base de Datos Online papuyo ".blue);
    } catch (error) {
        console.log(error)
        throw new Error("Error a la hora de iniciar base de datos")
    }



}



module.exports = {
    dbConnection,
}