import { validationResult } from "express-validator"
import ClimaRepositry from "../../../utils/repositories/Clima.repository.js"
import HuertoRepositry from "../../../utils/repositories/Huerto.repository.js"

export default class ArduinoController {
    constructor() { }


    /**
     * Crea un registro del clima para un huerto.
     * @param {import("express").Request} req - Request de la función.
     * @param {import("express").Response} res - Response de la función.
     */
    static async crearClima(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).send({
                    ok: false,
                    http_code: 4001,
                    message: errors.array()[0].msg,
                    data: null
                })
            }
            const { user, id_huerto, temperatura, humedad  } = req.body

            const exist_huerto = HuertoRepositry.existeHuertoId(user._id, id_huerto)

            if (!exist_huerto) {
                return res.status(400).json({
                    ok: false,
                    http_code: 4003,
                    message: "Lo sentimos, no pudimos encontrar resultados.",
                    data: null
                })
            }

            const clima = await ClimaRepositry.crearClima(id_huerto, temperatura, humedad)
            
            if(clima === null) {
                return res.status(400).json({
                    ok: false,
                    http_code: 5001,
                    message: "Lo sentimos, no se puede registrar el clima del huerto en este momento.",
                    data: null
                })
            }

            return res.status(200).json({
                ok: true,
                http_code: 2000,
                message: "Esta es la lista de registros de climas.",
                data: clima
            })

        } catch (error) {
            console.log("❌ Error System (ArduinoController):", error)
            return res.status(500).json({
                ok: false,
                http_code: 5001,
                message: "Lo sentimos, tenemos probelmas en nuestros servicios.",
                data: null
            })
        }
    }

    /**
     * Lista el registro de climas de un huerto.
     * @param {import("express").Request} req - Request de la función.
     * @param {import("express").Response} res - Response de la función.
     * @returns 
     */
    static async listarClimas(req, res) {
        try {
            const { user } = req.body
            const { id, limit, page } = req.params


            const new_limit = parseInt(limit)
            const new_page = parseInt(page)

            if(new_page <= 0) {
                return res.status(400).json({
                    ok: false,
                    http_code: 4001,
                    message: "El número de paginas comienza desde 1.",
                    data: [],
                    pages: 0
                })
            }

            if( typeof new_limit !== 'number' ||  typeof new_page !== 'number') {
                return res.status(400).json({
                    ok: false,
                    http_code: 4001,
                    message: "Los valores tienen un tipo de dato que no corresponde.",
                    data: [],
                    pages: 0
                })
            }

            const exist_huerto = HuertoRepositry.existeHuertoId(user._id, id)

            if (!exist_huerto) {
                return res.status(400).json({
                    ok: false,
                    http_code: 4003,
                    message: "Lo sentimos, no pudimos encontrar resultados.",
                    data: [],
                    pages: 0
                })
            }

            const climas = await ClimaRepositry.listarRegistroDeClimas(id, limit, page-1 )
            const count = await ClimaRepositry.countarClimas(id)

            return res.status(200).json({
                ok: true,
                http_code: 2000,
                message: "Esta es la lista de registros de climas.",
                data: climas,
                pages: Math.ceil(count / limit)
            })
        } catch (error) {
            console.log("❌ Error System (ArduinoController):", error)
            return res.status(500).json({
                ok: false,
                http_code: 5000,
                message: "Lo sentimos, tenemos probelmas en nuestros servicios.",
                data: [],
                pages: 0
            })
        }
    }
}
