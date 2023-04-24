import { Router } from "express"
import UsuarioController from "../../controllers/usuario/Usuario.controller.js"
import GuardianMiddleware from "../../../utils/middlewares/guardian.middleware.js"
import HuertoController from "../../controllers/arduino/Huerto.controller.js"


export default class UserRoutes {
    constructor() {
        this.router = Router()
        this.guardian = new GuardianMiddleware()
        this.userRouterPost()
    }

    userRouterPost() {
        this.router.post("/register", UsuarioController.registrarUsuario)
        this.router.post("/login", UsuarioController.autenticarUsuario)
        this.router.post("/register-huerto", this.guardian.responseGuardianAuthentication, HuertoController.registrarHuerto)
        this.router.get("/huertos/:limit/:page", this.guardian.responseGuardianAuthentication, HuertoController.obtenerHuertos)
    }
}