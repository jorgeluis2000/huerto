import cors from "cors"
import express, { response } from "express"
import AppRoutes from "../app/routes/app.routes.js";
import { REST_PORT } from "../app/environments/server.env.js";


export default class ServerApp {
    constructor() {
        this.app = express()
        this.routes()
        this.middlewares()
    }

    /**
     * Método que implementa las rutas.
     */
    routes() {
        const router = new AppRoutes()
        this.app.use(router.app_routes)
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