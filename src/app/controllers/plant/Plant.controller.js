import { request, response } from "express"
import { validationResult } from "express-validator"
import { IParamsPlantList, IPlantRequest } from "../../../utils/interfaces/Plant.interface.js"
import PlantRepository from "../../../utils/repositories/Plant.repository.js"
import { validarEditarPlanta, validarParametrosObtenerPlanta, validationParamsListPlants, validationRegisterPlant } from "../../../utils/services/validation.service.js"

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

            if (validation?.success !== true) {
                return res.status(400).send({
                    ok: false,
                    message: validation.error.issues[0].message,
                    http_code: 4001,
                    data: null
                })
            }


            const planta = await PlantRepository.crearPlant(plantBody)
            planta
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

            const { limit, page, name } = params
            /**
             * @type {{ name_plant: string }}
             */
            let filter = {}
            if (name !== undefined && name !== "") {
                filter = { name_plant: name }
            }

            const plantas = await PlantRepository.listarPlants(limit, page - 1)
            const count = await PlantRepository.contarPlantas(filter)

            if (plantas <= 0) {
                return res.status(400).send({
                    ok: false,
                    message: "Lo sentimos, no encontramos resultados para tu busqueda.",
                    http_code: 4004,
                    data: plantas,
                    pages: 0
                })
            }

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

    /**
     * Controlador obtiene una planta en especifico.
     * @param {import("express").Request} req - Request del controlador.
     * @param {import("express").Response} res - Response del controlador.
     */
    static async obtenerPlanta(req = request, res = response) {
        try {
            /**
             * @type {{ id: string }}
             */
            const params = req.params

            const validationParams = validarParametrosObtenerPlanta(params.id)

            if (validationParams?.success !== true) {
                return res.status(400).send({
                    ok: false,
                    message: validationParams.error.issues[0].message,
                    http_code: 4001,
                    data: null
                })
            }
            const { id } = params
            const planta = await PlantRepository.obtenerPlant(id)

            if (planta === null) {
                return res.status(400).send({
                    ok: false,
                    message: "Lo sentimos, no encontramos resultados para tu busqueda.",
                    http_code: 4004,
                    data: planta
                })
            }

            return res.status(200).json({
                ok: true,
                http_code: 2000,
                message: "Hemos encontrado resultados de tu busqueda.",
                data: planta
            })
        } catch (error) {
            console.log("❌ Error System (PlantController ~ obtenerPlanta()):", error)
            return res.status(500).json({
                ok: false,
                http_code: 5000,
                message: "Lo sentimos, tenemos problemas en nuestros servicios.",
                data: null
            })
        }
    }

    /**
     * Controlador que edita una planta en especifico.
     * @param {import("express").Request} req - Request del controlador.
     * @param {import("express").Response} res - Response del controlador.
     */
    static async editarPlanta(req = request, res = response) {
        try {
            /**
             * @type {IPlantRequest}
             */
            const bodyPlant = req?.body

            /**
             * @type {{ id: string }}
             */
            const paramsPlant = req?.params

            const validationParams = validarParametrosObtenerPlanta(paramsPlant.id)
            const validationBody = validarEditarPlanta(bodyPlant)

            if (validationParams?.success !== true) {
                return res.status(400).send({
                    ok: false,
                    message: validationParams.error.issues[0].message,
                    http_code: 4001,
                    data: false
                })
            }


            if (validationBody?.success !== true) {
                return res.status(400).send({
                    ok: false,
                    message: validationBody.error.issues[0].message,
                    http_code: 4001,
                    data: false
                })
            }

            const existPlant = await PlantRepository.existePlanta(paramsPlant.id)
            if (!existPlant) {
                return res.status(400).send({
                    ok: false,
                    message: "Lo sentimos, no encontramos resultados sobre la planta a actualizar.",
                    http_code: 4004,
                    data: false
                })
            }

            const planta = await PlantRepository.editarPlant(paramsPlant.id, bodyPlant)
            if(planta === null) {
                return res.status(400).send({
                    ok: false,
                    message: "Lo sentimos, hubo algunos problemas en nuestros servicios.",
                    http_code: 5002,
                    data: false
                })
            }

            return res.status(200).json({
                ok: true,
                http_code: 2000,
                message: "Se han actualizado los datos correctamente.",
                data: true
            })
        } catch (error) {
            console.log("❌ Error System (PlantController ~ obtenerPlanta()):", error)
            return res.status(500).json({
                ok: false,
                http_code: 5000,
                message: "Lo sentimos, tenemos problemas en nuestros servicios.",
                data: false
            })
        }
    }


    static async eliminarPlanta(req = request, res = response){
        try {

            /**
             * @type {{ id: string }}
             */
            const paramsPlant = req?.params

            const validationParams = validarParametrosObtenerPlanta(paramsPlant.id)

            if (validationParams?.success !== true) {
                return res.status(400).send({
                    ok: false,
                    message: validationParams.error.issues[0].message,
                    http_code: 4001,
                    data: false
                })
            }

            const existPlant = await PlantRepository.existePlanta(paramsPlant.id)
            if (!existPlant) {
                return res.status(400).send({
                    ok: false,
                    message: "Lo sentimos, no encontramos resultados sobre la planta a eliminar.",
                    http_code: 4004,
                    data: false
                })
            }

            const planta = await PlantRepository.eliminarPlantas(paramsPlant.id)

            if (planta === null) {
                return res.status(400).send({
                    ok: false,
                    message: "Lo sentimos, hubo algunos problemas en nuestros servicios.",
                    http_code: 5002,
                    data: false
                })
            }

            return res.status(200).json({
                ok: true,
                http_code: 2000,
                message: "Se ha eliminado la planta.",
                data: true
            })
        } catch (error) {
            console.log("❌ Error System (PlantController ~ eliminarPlanta()):", error)
            return res.status(500).json({
                ok: false,
                http_code: 5000,
                message: "Lo sentimos, tenemos problemas en nuestros servicios.",
                data: false
            })
        }
    }
}