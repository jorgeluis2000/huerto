import { Router } from "express"
import { body } from "express-validator"
import PlantController from "../../controllers/plant/plant.controller.js"


let router = Router()

router.post("/register", [
    body('name_plant', "Revisa que no te haya faltado ningun campo por completar.").trim().not().isEmpty(),
    body('description', "Revisa que no te haya faltado ningun campo por completar.").trim().not().isEmpty(),
    body('clime', "Revisa que no te haya faltado ningun campo por completar.").trim().not().isEmpty(),
    body('flora', "Revisa que no te haya faltado ningun campo por completar.").trim().not().isEmpty(),
    body('specific_care', "Revisa que no te haya faltado ningun campo por completar.").trim().not().isEmpty(),
    body('type_earth', "Revisa que no te haya faltado ningun campo por completar.").trim().not().isEmpty(),
    body('type_fruit', "Revisa que no te haya faltado ningun campo por completar.").trim().not().isEmpty()
],PlantController.registrarPlanta)


router.get("/list/:limit/:page/:name?", PlantController.listarPlantas)

router.get("/plant/:id", PlantController.obtenerPlanta)


export default router