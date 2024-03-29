import Clima from "../../app/models/Clima.model.js";

export default class ClimaRepositry {

    /**
     * Crea un registro de clima de un huerto.
     * @param {import("mongoose").ObjectId} idHuerto - Identificador del huerto
     * @param {number} temperatura - Temperatura registrada del clima.
     * @param {number} humedad - Humedad registrada del clima.
     * @param {number} humedad_ambiental - Humedad del ambiente registrada del clima.
     * @returns {Promise<{_id: import("mongoose").ObjectId; id_huerto: import("mongoose").ObjectId; temperatura: number; humedad: number; humedad_ambiental: number; createdAt: Date; updatedAt: Date} | null>}
     */
    static async crearClima(idHuerto, temperatura, humedad, humedad_ambiental) {
        try {
            const clima = new Clima({
                id_huerto: idHuerto,
                temperatura,
                humedad,
                humedad_ambiental
            })
            await clima.save()
            return clima
        } catch (error) {
            console.log("❌ Error System (ClimaRepositry):", error)
            return null
        }
    }

    /**
     * Lista el registro de climas de un huerto.
     * @param {import("mongoose").ObjectId} idHuerto - Identificadro del huerto.
     * @param {number} limit - Limite de filas que se traera sobre los registros del clima.
     * @param {number} page - Pagina a la cual se va a listar.
     * @returns {Promise<[{_id: import("mongoose").ObjectId; id_huerto: import("mongoose").ObjectId; temperatura: number; humedad: number; humedad_ambiental: number; createdAt: Date; updatedAt: Date}]>}
     */
    static async listarRegistroDeClimas(idHuerto, limit, page) {
        try {
            const skip = limit * page
            const climas = await Clima.find({ id_huerto: idHuerto }).limit(limit).skip(skip).select("-__v")
            return climas
        } catch (error) {
            console.log("❌ Error System (ClimaRepositry):", error);
            return []
        }
    }

    /**
     * 
     * @param {import("mongoose").ObjectId} idHuerto 
     * @param {number} typeOrden 
     * @returns {Promise<{_id: import("mongoose").ObjectId; id_huerto: import("mongoose").ObjectId; temperatura: number; humedad: number; humedad_ambiental: number; createdAt: Date; updatedAt: Date}>}
     */
    static async getLastOrFirstRegisterOfClime(idHuerto, typeOrden) {
        try {
            const ording = (typeOrden === 1) ? 'asc' : 'desc'
            const climas = await Clima.find({ id_huerto: idHuerto }).sort([['createdAt', ording]]).limit(1).select("-__v")
            if (climas.length > 0) {
                return climas[0]
            }
            return null
        } catch (error) {
            console.log("❌ Error System (ClimaRepositry ~ getLastOrFirstRegisterOfClime):", error);
            return null
        }
    }

    /**
     * Conteo de registro de climas de un huerto.
     * @param {import("mongoose").ObjectId} idHuerto - Identificadro del huerto.
     * @returns {Promise<number>}
     */
    static async countarClimas(idHuerto) {
        try {
            const count_huertos = await Clima.countDocuments({ id_huerto: idHuerto })
            return count_huertos
        } catch (error) {
            console.log("❌ Error System (ClimaRepositry):", error);
            return 0
        }
    }
}
