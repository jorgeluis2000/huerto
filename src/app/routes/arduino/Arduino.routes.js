import { Router } from "express"

export default class ArduinoRoutes {
    constructor() {
        this.router = Router()
    }

    arduinoRoutesPost() {
        this.router.post("/register-wether")
    }
}