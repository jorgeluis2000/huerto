import Plant from "../../app/models/Plant.model.js";
import { IPlant, IPlantRequest } from "../interfaces/Plant.interface.js";

export default class PlantRepository {
    /**
     * Método que crea una planta
     * @param {IPlantRequest} plant 
     * @returns
     */
    static async crearPlant(plant) {
        try {
            const newPlant = new Plant(plant)
            await newPlant.save()
            return newPlant
        } catch (error) {
            console.log("❌ Error System (PlantRepository ~ crearPlant()):", error)
            return null
        }
    }

    /**
     * 
     * @param {string} id - Identificador unico de una planta
     * @returns {Promise<boolean>}
     */
    static async existePlanta(id) {
        try {
            const existPlant = await Plant.findById(id)
            if (existPlant !== null) {
                return true
            }
            return false
        } catch (error) {
            console.log("❌ Error System (PlantRepository ~ existePlanta()):", error)
            return false
        }
    }

    /**
     * Método que actualiza valores de una planta
     * @param {string} id - Identificador unico de una planta.
     * @param {IPlantRequest} plantEdit - Valores de la planta que se van a editar.
     * @returns
     */
    static async editarPlant(id, plantEdit) {
        try {
            const updatePlant = await Plant.updateOne({ _id: id }, plantEdit, { returnDocument: "after", sanitizeFilter: true })
            return updatePlant
        } catch (error) {
            console.log("❌ Error System (PlantRepository ~ editarPlant()):", error)
            return null
        }
    }

    /**
     * 
     * @param {import("mongoose").ObjectId} id - Identificador unico
     * @returns {Promise<IPlant | null>}
     */
    static async obtenerPlant(id) {
        try {
            const plant = await Plant.findById(id).select("-__v")
            return plant
        } catch (error) {
            console.log("❌ Error System (PlantRepository ~ obtenerPlant()):", error)
            return null
        }
    }

    /**
     * Método que lista las plantas.
     * @param {number} limit - Limite de items por pagina.
     * @param {number} page - Pagina qu se quiere que se liste.
     * @returns
     */
    static async listarPlants(limit, page) {
        try {
            const skip = limit * page
            const plants = await Plant.find({}).limit(limit).skip(skip).select("_id name_plant description type_fruit height updatedAt")
            return plants
        } catch (error) {
            console.log("❌ Error System (PlantRepository ~ listarPlants()):", error)
            return []
        }
    }

    /**
     * Método que cuenta el número de plantas que hay en un documento y con respecto a un filtro.
     * @param {{name_plant: string} | {}} filter - Filtro
     * @returns {Promise<number>}
     */
    static async contarPlantas(filter = {}) {
        try {
            const conteo = await Plant.countDocuments(filter)
            return conteo
        } catch (error) {
            console.log("❌ Error System (PlantRepository ~ contarPlantas()):", error)
            return 0
        }
    }
    
    /**
     * 
     * @param {string} id 
     * @returns 
     */
    static async eliminarPlantas(id) {
        try {
            const plant = await Plant.deleteOne({ _id: id })
            return plant
        } catch (error) {
            console.log("❌ Error System (PlantRepository ~ eliminarPlantas()):", error)
            return null
        }
    } 

}