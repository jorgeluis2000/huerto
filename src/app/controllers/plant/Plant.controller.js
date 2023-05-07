import { request, response } from "express"
import { validationResult } from "express-validator"
import { IParamsPlantList, IPlantRequest } from "../../../utils/interfaces/Plant.interface.js"
import PlantRepository from "../../../utils/repositories/Plant.repository.js"
import { validationParamsListPlants, validationRegisterPlant } from "../../../utils/services/validation.service.js"

export default class PlantController {
    constructor() { }

    /**
     * Controlador que registra una planta
     * @param {import("express").Request} req - Request del controlador.
     * @param {import("express").Response} res - Response del controlador.
     */
    static async registrarPlanta(req = request, res = response) {
        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).send({
                    ok: false,
                    message: errors.array()[0].msg,
                    http_code: 4001,
                    data: null
                })
            }

            /**
             * @type {IPlantRequest}
             */
            const plantBody = await req?.body

            const validation = validationRegisterPlant(plantBody)
            
            if(validation?.success !== true) {
                return res.status(400).send({
                    ok: false,
                    message: validation.error.issues[0].message,
                    http_code: 4001,
                    data: null
                })
            }
            

            const planta = await PlantRepository.crearPlant(plantBody)

            if (planta === null) {
                return res.status(400).send({
                    ok: false,
                    message: "No se pudo registrar la planta.",
                    http_code: 4002,
                    data: planta
                })
            }

            return res.status(201).json({
                ok: true,
                http_code: 2001,
                message: "¡Se ha registrado una nueva planta!",
                data: planta
            })
        } catch (error) {
            console.log("❌ Error System (PlantController ~ registrarPlanta):", error)
            return res.status(500).json({
                ok: false,
                http_code: 5000,
                message: "Lo sentimos, tenemos problemas en nuestros servicios.",
                data: null
            })
        }
    }

    /**
     * Controlador que lista las plantas
     * @param {import("express").Request} req - Request del controlador.
     * @param {import("express").Response} res - Response del controlador.
     */
    static async listarPlantas(req = request, res = response) {
        try {
            /**
             * @type {IParamsPlantList}
             */
            const params = req.params

            const validationParams = validationParamsListPlants(Number(params.limit), Number(params.page))
            if (validationParams?.success !== true) {
                return res.status(400).send({
                    ok: false,
                    message: validationParams.error.issues[0].message,
                    http_code: 4001,
                    data: [],
                    pages: 0
                })
            }

            const { limit, page } = params

            const plantas = await PlantRepository.listarPlants(limit, page -1)
            const count = await PlantRepository.contarPlantas()

            return res.status(200).json({
                ok: true,
                http_code: 2000,
                message: "Hemos encontrado resultados de tu busqueda.",
                data: plantas,
                pages: Math.ceil(count / limit)
            })
            
        } catch (error) {
            console.log("❌ Error System (PlantController ~ listarPlantas()):", error)
            return res.status(500).json({
                ok: false,
                http_code: 5000,
                message: "Lo sentimos, tenemos problemas en nuestros servicios.",
                data: [],
                pages: 0
            })
        }
    }
}