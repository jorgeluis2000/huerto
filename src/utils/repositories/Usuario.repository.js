import Usuario from "../../app/models/Usuario.model.js";

export default class UsuarioRepositry {

    /**
     * Obtener el usaurio para la session.
     * @param {string} id - Identificador consecutivo en la tabla.
     * @param {string} nick - Identificador para la autenticación.
     * @returns {Promise<{_id: import("mongoose").ObjectId,nick: string; createdAt: Date; updatedAt: Date} | null>}
     */
    static async obtenerUsuarioAuth(id, nick) {
        try {
            const usuario = await Usuario.findOne({ _id: id, nick }).select("-password -__v")
            return usuario
        } catch (error) {
            console.log("❌ Error System (UsuarioRepository):", error);
            return null
        }
    }

    /**
     * Verificar si existe un usuario en especifico, usando el nick de la persona.
     * @param {string} nick - Nick o identificador del usuario.
     * @returns {Promise<boolean>} devuelve un boolean.
     */
    static async existeUsuario(nick) {
        try {
            const usuario = await Usuario.findOne({ nick })
            return (usuario !== null) ? true : false
        } catch (error) {
            console.log("❌ Error System (UsuarioRepository):", error);
            return false
        }
    }

    /**
     * Método para confirmar que los datos de autenticación son validos.
     * @param {string} nick - Apodo o identificador del usuario.
     * @param {string} password - Contraseña del usuario.
     * @returns {Promise<{_id: import("mongoose").ObjectId;nick: string; password: string; createdAt: Date; updatedAt: Date} | null>}
     */
    static async autenticarUsuario(nick, password) {
        try {
            const usuario = await Usuario.findOne({ nick, password }).select("-__v")
            return usuario
        } catch (error) {
            console.log("❌ Error System (UsuarioRepository):", error);
            return null
        }
    }

    /**
     * Registra un usuario nuevo.
     * @param {string} nick - Apodo o identificador del usuario.
     * @param {string} password - Contraseña del usuario.
     * @returns {Promise<{_id: import("mongoose").ObjectId;nick: string; password: string; createdAt: Date; updatedAt: Date} | null>}
     */
    static async registrarUsuario(nick, password) {
        try {
            let usuario = new Usuario({
                nick,
                password
            })
            await usuario.save()
            return usuario
        } catch (error) {
            console.log("❌ Error System (UsuarioRepository):", error);
            return null
        }
    }
}