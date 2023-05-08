import { z } from "zod";
import { IPlantRequest } from "../interfaces/Plant.interface.js";

/**
 * 
 * @param {IPlantRequest} plant - planta requerida
 * @returns
 */
export function validationRegisterPlant(plant) {
    const plantRequest = z.object({
        name_plant: z.string({ invalid_type_error: "Verifica los valores que envías.", required_error: "El nombre de la planta es requerido." }).trim().nonempty("Faltan campos por completar."),
        description: z.string({ invalid_type_error: "Verifica los valores que envías.", required_error: "La descripción de la planta es requerida." }).trim().nonempty("Faltan campos por completar."),
        clime: z.string({ invalid_type_error: "Verifica los valores que envías.", required_error: "El clima de la planta es requerido." }).trim().nonempty("Faltan campos por completar."),
        flora: z.string({ invalid_type_error: "Verifica los valores que envías.", required_error: "El momento o mento en el que florece la planta es requerido." }).trim().nonempty("Faltan campos por completar."),
        height: z.number({ invalid_type_error: "Verifica los valores que envías.", required_error: "El tamaño de la planta es requerido." }).positive("El tamaño o altura de la planta debe ser positivo."),
        humidity: z.array(z.number({ invalid_type_error: "Verifica los valores que envías." }).positive("Los valores del rango deben ser mayores a 0."), { invalid_type_error: "Debes ingresar un rango de humedad." }).nonempty("No has ingresado ningún valor del rango de humedad.").length(2, "Verifica que hayas ingresado un valor minimo y maximo de la humedad."),
        light: z.number({ invalid_type_error: "Verifica los valores que envías.", required_error: "Este campo es requerido." }),
        pests: z.array(z.string({ invalid_type_error: "Verifica los valores que envías." }), { invalid_type_error: "Debes ingresar una lista de pestes.", required_error: "Se requiere que ingreses por lo menos una peste" }),
        solutions: z.array(z.string({ invalid_type_error: "Verifica los valores que envías." }), { invalid_type_error: "Debes ingresar una lista de soluciones para las pestes mencionadas.", required_error: "Se requiere que ingreses por lo menos una solución" }),
        space_earth: z.number({ invalid_type_error: "Verifica los valores que envías.", required_error: "Este campo es requerido." }).positive("El tamaño que habarca la planta en metros cuadrados no puede ser negativo."),
        specific_care: z.string({ invalid_type_error: "Verifica los valores que envías." }).trim().nonempty("Faltan campos por completar"),
        type_earth: z.string({ invalid_type_error: "Verifica los valores que envías.", required_error: "Este campo es requerido." }).trim().nonempty("Faltan campos por completar."),
        type_fruit: z.string({ invalid_type_error: "Verifica los valores que envías.", required_error: "Este campo es requerido." }).trim().nonempty("Faltan campos por completar."),
    })

    return plantRequest.safeParse(plant)
}

/**
 * 
 * @param {number} limit - Limite.
 * @param {number} page - Pagina actual.
 * @returns 
 */
export function validationParamsListPlants(limit, page) {
    const paramsListPlants = z.object({
        limit: z.number({ required_error: "No haz dicho cual es el limite que se requiere.", invalid_type_error: "El limite debe ser un valor entero númerico." }).int("El limite debe ser un entero númerico.").min(5, "El limite minimo es de 5 filas."),
        page: z.number({ required_error: "Necesitas mencionar cual es la pagina que quiere mostrar." }).min(1, "La paginación inicia desde 1.")
    })

    return paramsListPlants.safeParse({ limit, page })
}

/**
 * 
 * @param {string} id 
 * @returns 
 */
export function validarParametrosObtenerPlanta(id) {
    const idValidation = z.string({ invalid_type_error: "El id debe ser una cadena de caracteres (string).", required_error: "Es necesario proporcionar la id de la planta a obtener." })
    return idValidation.safeParse(id)
}

/**
 * 
 * @param {IPlantRequest} planta 
 * @returns 
 */
export function validarEditarPlanta(planta) {
    const plantRequest = z.object({
        name_plant: z.string({ invalid_type_error: "Verifica los valores que envías." }).trim().optional(),
        description: z.string({ invalid_type_error: "Verifica los valores que envías."}).trim().optional(),
        clime: z.string({ invalid_type_error: "Verifica los valores que envías." }).trim().optional(),
        flora: z.string({ invalid_type_error: "Verifica los valores que envías."}).trim().optional(),
        height: z.number({ invalid_type_error: "Verifica los valores que envías."}).positive("El tamaño o altura de la planta debe ser positivo.").optional(),
        humidity: z.array(z.number({ invalid_type_error: "Verifica los valores que envías." }).positive("Los valores del rango deben ser mayores a 0."), { invalid_type_error: "Debes ingresar un rango de humedad." }).length(2, "Verifica que hayas ingresado un valor minimo y maximo de la humedad.").optional(),
        light: z.number({ invalid_type_error: "Verifica los valores que envías."}).optional(),
        pests: z.array(z.string({ invalid_type_error: "Verifica los valores que envías." }), { invalid_type_error: "Debes ingresar una lista de pestes." }).optional(),
        solutions: z.array(z.string({ invalid_type_error: "Verifica los valores que envías." }), { invalid_type_error: "Debes ingresar una lista de soluciones para las pestes mencionadas." }).optional(),
        space_earth: z.number({ invalid_type_error: "Verifica los valores que envías."}).positive("El tamaño que habarca la planta en metros cuadrados no puede ser negativo.").optional(),
        specific_care: z.string({ invalid_type_error: "Verifica los valores que envías." }).trim().optional(),
        type_earth: z.string({ invalid_type_error: "Verifica los valores que envías."}).trim().optional(),
        type_fruit: z.string({ invalid_type_error: "Verifica los valores que envías."}).trim().optional()
    })
    return plantRequest.safeParse(planta)
}