import UsuarioRepositry from "../../../utils/repositories/Usuario.repository.js"
import { createToken } from "../../../utils/services/security.service.js"

export default class UsuarioController {

    /**
     * Controlador que registra un usuario
     * @param {import("express").Request} req - Request del controlador.
     * @param {import("express").Response} res - Response del controlador.
     */
    static async registrarUsuario(req, res) {
        try {
            const { nick, passowrd } = req.body
            const existe_usuario = await UsuarioRepositry.existeUsuario(nick)

            if (existe_usuario) {
                return res.status(200).json({
                    ok: false,
                    message: "Lo sentimos, ya existe un usuario con ese mismo nick.",
                    data: null
                })
            }

            const usuario_registrado = await UsuarioRepositry.registrarUsuario(nick, passowrd)

            return res.status(201).json({
                ok: true,
                message: "Bienvenido, ahora puedes autenticarte con los mismos datos que digitaste.",
                data: usuario_registrado
            })
        } catch (error) {
            console.log("❌ Error System (UsuarioController):", error)
            return res.status(500).json({
                ok: false,
                message: "Lo sentimos, tenemos probelmas en nuestros servicios.",
                data: null
            })
        }
    }

    /**
     * Controlador que autentica un usuario.
     * @param {import("express").Request} req - Request del controlador.
     * @param {import("express").Response} res - Response del controlador.
     */
    static async autenticarUsuario(req, res) {
        try {
            const { nick, passowrd } = req.body
            const usuario = await UsuarioRepositry.autenticarUsuario(nick, passowrd)
            if (usuario !== null) {
                return res.status(200).json(
                    {
                        ok: false,
                        message: "Credencailes "
                    }
                )
            }
            const payLoad = {
                nick: usuario.nick,
                id: usuario._id
            }
            const token = createToken(payLoad)
            return res.status(200).json({
                ok: true,
                message: "¡¡Usuario autenticado!!",
                data: token
            })
        } catch (error) {
            console.log("❌ Error System (UsuarioController):", error)
            return res.status(500).json({
                ok: false,
                message: "Lo sentimos, tenemos probelmas en nuestros servicios.",
                data: null
            })
        }
    }
}