import express, { response } from "express"
import cors from "cors"
import AppRoutes from "../app/routes/App.routes.js";
import { REST_PORT } from "../app/environments/server.env.js";
import "../app/database/connection.db.js"


export default class ServerApp {
    constructor() {
        this.app = express()
        this.middlewares()
        this.routes()
    }

    /**
     * Método que implementa las rutas.
     */
    routes() {
        this.app.use(AppRoutes)
    }

    /**
     * Método que implementa los middlewares del microservicio.
     */
    middlewares() {
        this.app.use(cors());
        this.app.use((_, res = response, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
        this.app.use(express.json({ limit: '20mb' }));
        this.app.use(express.text());
        this.app.use(express.urlencoded({ limit: '20mb', extended: true }))
    }

    /**
     * Método que inicia el servidor.
     */
    start() {
        this.app.listen(REST_PORT, () => {
            console.log(`---- Server listening on port ${REST_PORT} ----`);
            console.log("Server starting...👋");
            console.log(`🚀 Visit http://localhost:${REST_PORT}/ 🚀`);
        })
    }
}