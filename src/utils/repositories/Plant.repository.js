import Plant from "../../app/models/Plant.model.js";
import { IPlant, IPlantRequest } from "../interfaces/Plant.interface.js";

export default class PlantRepository {
    /**
     * Método que crea una planta
     * @param {IPlantRequest} plant 
     * @return
     */
    static async crearPlant (plant) {
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
     * @param {import("mongoose").ObjectId} id 
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
    

    static async contarPlantas() {
        try {
            const conteo = await Plant.countDocuments({})
            return conteo
        } catch (error) {
            console.log("❌ Error System (PlantRepository ~ contarPlantas()):", error)
            return 0
        }
    }
}