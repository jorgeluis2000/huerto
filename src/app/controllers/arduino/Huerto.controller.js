import { validationResult } from "express-validator"
import HuertoRepositry from "../../../utils/repositories/Huerto.repository.js"

export default class HuertoController {

    constructor() { }

    /**
     * Registrar el huerto para el usuario.
     * @param {import("express").Request} req - Request del controlador.
     * @param {import("express").Response} res - Response del controlador
     */
    static async registrarHuerto(req = request, res = response) {
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

            const { name, user } = req.body
            const existe_huerto = await HuertoRepositry.existeHuerto(user._id, name)
            if (existe_huerto) {
                return res.status(400).json({
                    ok: false,
                    http_code: 4002,
                    message: "Lo sentimos, ya existe un huerto con ese mismo nombre.",
                    data: null
                })
            }
            const huerto_registrado = await HuertoRepositry.crearHuerto(user._id, name)

            return res.status(201).json({
                ok: true,
                http_code: 2001,
                message: "Bienvenido, ahora puedes autenticarte con los mismos datos que digitaste.",
                data: huerto_registrado
            })
        } catch (error) {
            console.log("❌ Error System (HuertoController):", error)
            return res.status(500).json({
                ok: false,
                http_code: 5000,
                message: "Lo sentimos, tenemos probelmas en nuestros servicios.",
                data: null
            })
        }
    }

    /**
     * Obtener huertos del usuario.
     * @param {import("express").Request} req - Request del controlador.
     * @param {import("express").Response} res - Response del controlador
     */
    static async obtenerHuertos(req = request, res = response) {
        try {

            const { user } = req.body
            const { limit, page } = req.params

            const new_limit = parseInt(limit)
            const new_page = parseInt(page)

            if (new_page <= 0) {
                return res.status(400).json({
                    ok: false,
                    http_code: 4001,
                    message: "El número de paginas comienza desde 1.",
                    data: [],
                    pages: 0
                })
            }

            if (typeof new_limit !== 'number' || typeof new_page !== 'number') {
                return res.status(400).json({
                    ok: false,
                    http_code: 4001,
                    message: "Los valores tienen un tipo de dato que no corresponde.",
                    data: [],
                    pages: 0
                })
            }

            const huertos = await HuertoRepositry.listarHuertos(user._id, limit, page - 1)
            const count = await HuertoRepositry.countarHuertos(user._id)
            return res.status(200).json({
                ok: true,
                http_code: 2000,
                message: "Esta es la lista de huertos.",
                data: huertos,
                pages: Math.ceil(count / limit)
            })
        } catch (error) {
            console.log("❌ Error System (HuertoController):", error)
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