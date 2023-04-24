import HuertoRepositry from "../../../utils/repositories/Huerto.repository.js"

export default class HuertoController {

    /**
     * Registrar el huerto para el usuario.
     * @param {import("express").Request} req - Request del controlador.
     * @param {import("express").Response} res - Response del controlador
     */
    static async registrarHuerto(req, res) {
        const { name, user } = req.body
        try {
            const existe_huerto = await HuertoRepositry.existeHuerto(user._id, name)
            if (existe_huerto) {
                return res.status(200).json({
                    ok: false,
                    message: "Lo sentimos, ya existe un huerto con ese mismo nombre.",
                    data: null
                })
            }
            const huerto_registrado = await HuertoRepositry.crearHuerto(user._id, name)

            return res.status(201).json({
                ok: true,
                message: "Bienvenido, ahora puedes autenticarte con los mismos datos que digitaste.",
                data: huerto_registrado
            })
        } catch (error) {
            console.log("❌ Error System (HuertoController):", error)
            return res.status(500).json({
                ok: false,
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
    static async obtenerHuertos(req, res) {
        const { user } = req.body
        const { limit, page } = req.params
        try {
            const huertos = await HuertoRepositry.listarHuertos(user._id, limit, page)
            const count = await HuertoRepositry.countarHuertos(user._id)
            return res.status(200).json({
                ok: true,
                message: "Esta es la lista de huertos.",
                data: huertos,
                pages: count / limit
            })
        } catch (error) {
            console.log("❌ Error System (HuertoController):", error)
            return res.status(500).json({
                ok: false,
                message: "Lo sentimos, tenemos probelmas en nuestros servicios.",
                data: []
            })
        }
    }
}