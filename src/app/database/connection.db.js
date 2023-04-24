
import mongoose from "mongoose";
import { database } from "../environments/database.env.js"

try {
    await mongoose.connect(database.DB_URL)
    console.log('👋 Conexión establecida con la base de datos. 👋');
} catch (error) {
    console.log('❌ Conexión no establecida con la base de datos. ❌', error.message)
}
