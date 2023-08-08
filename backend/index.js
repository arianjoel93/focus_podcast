import express from "express"
import connectDB from "./config/db.js"
import dotenv from 'dotenv'
import usersRoutes from "./routes/usersRoutes.js"
import cors from "cors"

//init express
const app = express()
app.use(express.json())

//config env
dotenv.config()

//config database MongoDB
connectDB()

//config cors
const whiteList = ['http://localhost:3000']

const corsOptions = {
    origin: function(origin, callback){
        if (whiteList.includes(origin)){
            callback(null, true)
        }else{
            callback(new Error("Error de Cors"))
        }
    }
}

app.use(cors(corsOptions))

//Routing
app.use('/api/users', usersRoutes)

//init server
app.listen(4000, () => {
    console.log(`Servidor corriendo en el puerto 4000`)
})