import { z } from "zod";

/**
 * Validaro de parametros de una lisat de huertos.
 * @param {number} limit - Limite de filas a mostrar en la lista
 * @param {number} page - Fila o pagina en la que se va paginando.
 * @param {string} [name] - Filtro por nombre.
 * @returns 
 */
export function validarParamsHuertos(limit, page, name) {
    const response = z.object({
        limit: z.number({ required_error: "Falta ingresar el parametro limit.", invalid_type_error: "El limite debe ser númerico" }).int("El limite debe ser un valor númerico entero").min(5, "El limite minimo de filas a mostrar es de 5."),
        page: z.number({ required_error: "Falta ingresar el parametro limit.", invalid_type_error: "El limite debe ser númerico" }).int("El limite debe ser un valor númerico entero").min(1, "Las paginas inician desde la 1."),
        name: z.string({ invalid_type_error: "El nombre debe ser una cadena de texto alfanumerica." }).optional()
    })
    return response.safeParse({ limit, page, name })
}