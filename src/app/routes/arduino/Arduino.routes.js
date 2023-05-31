import { Router } from "express"
import { body } from "express-validator"
import ArduinoController from "../../controllers/arduino/Arduino.controller.js"
import GuardianMiddleware from "../../../utils/middlewares/guardian.middleware.js"

const router = Router()

const guardian = new GuardianMiddleware()


router.post("/register-climate", [
    body('id_huerto', "Revisa que no te haya faltado ningun campo por completar.").trim().not().isEmpty(),
    body('temperatura', "Revisa que no te haya faltado ningun campo por completar.").trim().not().isEmpty(),
    body('humedad', "Revisa que no te haya faltado ningun campo por completar.").trim().not().isEmpty(),
    body('humedad_ambiental', "Revisa que no te haya faltado ningun campo por completar.").trim().not().isEmpty(),
], guardian.responseGuardianAuthentication, ArduinoController.crearClima)

router.get("/climates/:id/:limit/:page", guardian.responseGuardianAuthentication, ArduinoController.listarClimas)

export default router