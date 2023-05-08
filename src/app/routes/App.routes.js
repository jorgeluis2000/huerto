import express from "express"
import path from "path"
import { cwd } from "process"
import UsuarioRouter from "./user/User.routes.js"
import ArduinoRouter from "./arduino/Arduino.routes.js"
import PlantRouter from "./plant/Plant.routes.js"

const app = express()

app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(cwd(), "src", "utils", "views", "index.html"))
})

app.use('/api/v1/user', UsuarioRouter)
app.use('/api/v1/arduino', ArduinoRouter)
app.use('/api/v1/plant', PlantRouter)
app.use(function(req, res){
    res.status(404).json({
        ok: false,
        message: "Esta ruta no existe, dentro del servidor. Por favor verifica la GUIA de la API en https://huerto.onreder.com/"
    });
});

export default app