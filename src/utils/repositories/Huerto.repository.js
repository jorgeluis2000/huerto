import Huerto from "../../app/models/Huerto.model.js";

export default class HuertoRepositry {
    
    /**
     * 
     * @param {import("mongoose").ObjectId} idUsuario - Id del usuario que le pertenece el Huerto.
     * @param {import("mongoose").ObjectId} idHuerto - Id del Huerto.
     * @returns {Promise<{_id: import("mongoose").ObjectId; id_usuario: import("mongoose").ObjectId; name_huerto: string; createdAt: Date; updatedAt: Date} | null>}
     */
    static async obtenerHuerto(idUsuario, idHuerto){
        try {
            const huerto = await Huerto.findOne({id_usuario: idUsuario, _id: idHuerto}).select("-__v")
            return huerto
        } catch (error) {
            console.log("❌ Error System (HuertoRepository):", error);
            return null
        }
    }

    /**
     * Crea un nuevo huerto para un usuario.
     * @param {import("mongoose").ObjectId} idUsuario - Identificador del dueño del huerto.
     * @param {string} name - Nombre del huerto.
     * @returns {Promise<{_id: import("mongoose").ObjectId; id_usuario: import("mongoose").ObjectId; name_huerto: string; createdAt: Date; updatedAt: Date} | null>}
     */
    static async crearHuerto(idUsuario, name) {
        try {
            let huerto = new Huerto({
                id_usuario: idUsuario,
                name_huerto: name
            })
            await huerto.save()
            return huerto
        } catch (error) {
            console.log("❌ Error System (HuertoRepository):", error);
            return null
        }
    }

    /**
     * Verifica si el usuario ya tiene un huerto llamado igual.
     * @param {import("mongoose").ObjectId} idUsuario - Identificador del dueño del huerto.
     * @param {string} name - Nombre del huerto.
     * @returns {Promise<boolean>}
     */
    static async existeHuerto(idUsuario, name) {
        try {
            const huerto = await Huerto.findOne({id_usuario: idUsuario, name_huerto: name})
            return (huerto !== null) ? true : false
        } catch (error) {
            console.log("❌ Error System (HuertoRepository):", error);
            return false
        }
    }

    /**
     * 
     * @param {import("mongoose").ObjectId} idUsuario - Identificador del dueño del huerto.
     * @returns {Promise<[{_id: import("mongoose").ObjectId; id_usuario: import("mongoose").ObjectId; name_huerto: string; createdAt: Date; updatedAt: Date}]>}
     */
    static async listarHuertos(idUsuario) {
        try {
            const huertos = await Huerto.find({ id_usuario: idUsuario })
            return huertos
        } catch (error) {
            console.log("❌ Error System (HuertoRepository):", error);
            return []
        }
    }
}