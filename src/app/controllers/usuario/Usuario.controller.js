import { request, response } from "express"
import { validationResult } from "express-validator"
import UsuarioRepositry from "../../../utils/repositories/Usuario.repository.js"
import { createToken } from "../../../utils/services/security.service.js"

export default class UsuarioController {

    constructor() { }

    /**
     * Controlador que registra un usuario
     * @param {import("express").Request} req - Request del controlador.
     * @param {import("express").Response} res - Response del controlador.
     */
    static async registrarUsuario(req = request, res = response) {
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
             * @type {{
             * nick: string;
             * password: string;
             * }}
             */
            const { nick, password } = await req?.body
            const existe_usuario = await UsuarioRepositry.existeUsuario(nick)

            if (existe_usuario) {
                return res.status(400).json({
                    ok: false,
                    http_code: 4002,
                    message: "Lo sentimos, ya existe un usuario con ese mismo nick.",
                    data: null
                })
            }

            const usuario_registrado = await UsuarioRepositry.registrarUsuario(nick, password)

            return res.status(201).json({
                ok: true,
                http_code: 2001,
                message: "Bienvenido, ahora puedes autenticarte con los mismos datos que digitaste.",
                data: usuario_registrado
            })
        } catch (error) {
            console.log("❌ Error System (UsuarioController):", error)
            return res.status(500).json({
                ok: false,
                http_code: 5000,
                message: "Lo sentimos, tenemos problemas en nuestros servicios.",
                data: null
            })
        }
    }

    /**
     * Controlador que autentica un usuario.
     * @param {import("express").Request} req - Request del controlador.
     * @param {import("express").Response} res - Response del controlador.
     */
    static async autenticarUsuario(req = request, res = response) {
        try {

            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).send({
                    ok: false,
                    http_code: 4000,
                    message: errors.array()[0].msg,
                    data: null
                })
            }

            /**
             * @type {{
             * nick: string;
             * password: string;
             * }}
             */
            const { nick, password } = req.body
            const usuario = await UsuarioRepositry.autenticarUsuario(nick, password)
            if (usuario === null) {
                return res.status(400).json(
                    {
                        ok: false,
                        http_code: 4003,
                        message: "Lo sentimos, aún no te has registrado en nuestra plataforma.",
                        data: null
                    }
                )
            }
            const payLoad = {
                nick: usuario.nick,
                id: usuario._id
            }
            const token = createToken(payLoad)
            res.cookie("huerto-token", token, { expires: new Date(Date.now() + (1000 * 60 * 60 * 24 * 30 * 12)) })
            return res.status(200).json({
                ok: true,
                http_code: 2000,
                message: `¡Bienvenido ${usuario.nick}! Navega por toda la plataforma.`,
                data: token
            })
        } catch (error) {
            console.log("❌ Error System (UsuarioController):", error)
            return res.status(500).json({
                ok: false,
                http_code: 5000,
                message: "Lo sentimos, tenemos problemas en nuestros servicios.",
                data: null
            })
        }
    }
}