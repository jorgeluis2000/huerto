
/**
 * Modelo de una planta.
 * @param {import("mongoose").ObjectId} _id - Id o identificador unico de la planta.
 * @param {string} name_plant - Nombre de la planta.
 * @param {string} description - Descripcion o resumen sobre la planta.
 * @param {number} height - Tamaño/Altura de la planta.
 * @param {string} type_fruit - Tipo o fruta que genera la planta (sí la tiene).
 * @param {String} flora - Fecha en la que florece o tiempo que tarda en florecer
 * @param {string} type_earth - Tipo de tiera o abono que se utiliza.
 * @param {number} light - Cuanta iluminidad debe darle a la planta
 * @param {string} clime - Clima de la planta
 * @param {Array<number>} humidity - Rango de humedad de la planta
 * @param {string} space_earth - Espacio de tierra minima que requiera la planta
 * @param {string} specific_care - Precauciones especificas que se deben tener.
 * @param {Array<string>} pests - Pestes de la planta
 * @param {Array<string>} solutions - Soluciones a las pestes
 * @param {Date} createdAt - Fecha de creación
 * @param {Date} updatedAt - Fecha de ultima actualización
 */
export function IPlant(
    _id,
    name_plant,
    description,
    height,
    type_fruit,
    flora,
    type_earth,
    light,
    clime,
    humidity,
    space_earth,
    specific_care,
    pests,
    solutions
) {
    this._id = _id
    this.name_plant = name_plant
    this.description = description
    this.height = height
    this.type_fruit = type_fruit
    this.flora = flora
    this.type_earth = type_earth
    this.light = light
    this.clime = clime
    this.humidity = humidity
    this.space_earth = space_earth
    this.specific_care = specific_care
    this.pests = pests
    this.solutions = solutions
}


/**
 * Modelo de una planta.
 * @param {string} name_plant - Nombre de la planta.
 * @param {string} description - Descripcion o resumen sobre la planta.
 * @param {number} height - Tamaño/Altura de la planta.
 * @param {string} type_fruit - Tipo o fruta que genera la planta (sí la tiene).
 * @param {String} flora - Fecha en la que florece o tiempo que tarda en florecer
 * @param {string} type_earth - Tipo de tiera o abono que se utiliza.
 * @param {number} light - Cuanta iluminidad debe darle a la planta
 * @param {string} clime - Clima de la planta
 * @param {Array<number>} humidity - Rango de humedad de la planta
 * @param {string} space_earth - Espacio de tierra minima que requiera la planta
 * @param {string} specific_care - Precauciones especificas que se deben tener.
 * @param {Array<string>} pests - Pestes de la planta
 * @param {Array<string>} solutions - Soluciones a las pestes
 */
export function IPlantRequest(
    name_plant,
    description,
    height,
    type_fruit,
    flora,
    type_earth,
    light,
    clime,
    humidity,
    space_earth,
    specific_care,
    pests,
    solutions
) {
    this.name_plant = name_plant
    this.description = description
    this.height = height
    this.type_fruit = type_fruit
    this.flora = flora
    this.type_earth = type_earth
    this.light = light
    this.clime = clime
    this.humidity = humidity
    this.space_earth = space_earth
    this.specific_care = specific_care
    this.pests = pests
    this.solutions = solutions
}

/**
 * 
 * @param {number} limit 
 * @param {number} page 
 * @param {string} name 
 */
export function IParamsPlantList(
    limit,
    page,
    name
) {
    this.limit = limit
    this.page = page
    this.name = name
}