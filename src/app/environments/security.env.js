import pkg from "dotenv";
pkg.config();


export const SECRET_KEY = process.env.SECRET_KEY
export const SECRET_KEY_TOKEN = process.env.SECRET_KEY_TOKEN
export const SECRET_KEY_ENCRYPT = process.env.SECRET_KEY_ENCRYPT