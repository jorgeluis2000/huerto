import pkg from "dotenv";
pkg.config();

/**
 * @type {number} - Puerto en el que se expondra el microservicio.
 */
export const REST_PORT = process.env.REST_PORT

export const STAGE = process.env.STAGE