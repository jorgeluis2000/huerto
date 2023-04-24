import { request, response } from "express"
import UsuarioRepositry from "../repositories/Usuario.repository.js"
import { decodeJsonWebToken } from "../services/security.service.js"

export default class GuardianMiddleware {

    /**
     * Un middleware que valida el token enviado por el usuario y devuelve los datos del usuario.
     * @param {import("express").Request} [req] - El objeto de la solicitud.
     * @param {import("express").Response} [res] - El objeto de respuesta.
     * @param {import("express").NextFunction} next - La siguiente función de middleware en el ciclo de solicitud-respuesta de la
     * aplicación.
     * @returns return res.status(400).send({
     *         ok: false,
     *         message: 'Lo sentimos, no puedes autenticarte ahora con esa cuenta, intentalo de nuevo
     * más tarde.'
     *     })
     */
    async responseGuardianAuthentication(req = request, res = response, next) {
        const apiKey = req.headers["authorization"]
        if (!apiKey && !apiKey?.toLowerCase()?.startsWith("bearer")) {
            return res.status(401).send({
                ok: false,
                message: "Lo sentimos, no puedes acceder a este usuario.",
            })
        }

        const token = apiKey.substring(7)

        try {
            /**
             * @type {{
             * credential: {
             * id: import("mongoose").ObjectId;
             * nick: string
             * };
             * check: boolean;
             * date: date;
             * }}
             */
            const decode_token = decodeJsonWebToken(token)
            const usuario = await UsuarioRepositry.obtenerUsuarioAuth(decode_token.credential?.id.toString(), decode_token.credential?.nick)
            if (usuario === null) throw Error("¡¡Token invalido!!")
            req.body.user = usuario

        } catch (error) {
            console.log("❌ Error System:", error)
            return res.status(401).send({
                ok: false,
                message: 'Lo sentimos, no puedes autenticarte ahora con esa cuenta, intentalo de nuevo más tarde.'
            })
        }

        next()
    }

}