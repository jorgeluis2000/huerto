import express from "express"
import path from "path"
import UserRoutes from "./user/User.routes.js"
import ArduinoRoutes from "./arduino/Arduino.routes.js"
import { cwd } from "process"


export default class AppRoutes {

    constructor() {
        this.app_routes = express()
        this.checkHealthRoute()
        this.routes()
    }

    /**
     * Método que enlaza todas las rutas sub divididas.
     */
    routes() {
        const user_routes = new UserRoutes()
        const arduino_routes = new ArduinoRoutes()
        this.app_routes.use('/api/v1/user', user_routes.router)
        this.app_routes.use('/api/v1/arduino', arduino_routes.router)
    }
    /**
     * Método que genera la ruta de comprobación de actividad del microservicio
     */
    checkHealthRoute() {
        this.app_routes.get('/', this.controllerCheckHealthRoute)
    }

    /**
     * Método controlador para saber si un microservicio esta activo.
     * @param {import("express").Request} req - Request de la ruta
     * @param {import("express").Response} res - Response de la ruta
     */
    controllerCheckHealthRoute(req, res) {
        const agent = req.headers["user-agent"]
        const ip = req.ip
        const ips = req.ips

        return res.status(200).sendFile(path.join(cwd(), "src", "utils", "views", "index.html"))
        // return res.status(200).json({
        //     ok: true,
        //     message: "Este es el microservicio de los huertos."
        // })
    }
}
