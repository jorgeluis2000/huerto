import pkg from "dotenv";
pkg.config();

/**
 * @type {string} - URL de la conexión con la base de datos de mongodb.
 */
export const DB_URL = process.env.DB_URL