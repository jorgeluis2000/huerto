import { Router } from "express"
import { body, param } from "express-validator"
import UsuarioController from "../../controllers/usuario/Usuario.controller.js"
import GuardianMiddleware from "../../../utils/middlewares/guardian.middleware.js"
import HuertoController from "../../controllers/arduino/Huerto.controller.js"

const guardian = new GuardianMiddleware()
let router = Router()

router.post("/register", [
    body('nick', "Revisa que no te haya faltado ningun campo por completar.").trim().not().isEmpty(),
    body('password', "Revisa que no te haya faltado ningun campo por completar.").trim().not().isEmpty()
],UsuarioController.registrarUsuario)
router.post("/login", [
    body('nick', "Revisa que no te haya faltado ningun campo por completar.").trim().not().isEmpty(),
    body('password', "Revisa que no te haya faltado ningun campo por completar.").trim().not().isEmpty()
],UsuarioController.autenticarUsuario)
router.post("/register-huerto", guardian.responseGuardianAuthentication, HuertoController.registrarHuerto)
router.get("/huertos/:limit/:page", [
], guardian.responseGuardianAuthentication, HuertoController.obtenerHuertos)

export default router