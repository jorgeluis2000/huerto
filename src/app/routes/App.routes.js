import express from "express"
import path from "path"
import { cwd } from "process"
import UsuarioRouter from "./user/User.routes.js"
import ArduinoRouter from "./arduino/Arduino.routes.js"

const app = express()

app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(cwd(), "src", "utils", "views", "index.html"))
    // return res.status(200).json({
    //     ok: true,
    //     message: "Este es el microservicio de los huertos."
    // })
})

app.use('/api/v1/user', UsuarioRouter)
app.use('/api/v1/arduino', ArduinoRouter)


export default app