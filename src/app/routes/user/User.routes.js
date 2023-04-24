import { Router } from "express"


export default class UserRoutes {
    constructor() {
        this.router = Router()
        this.userRouterPost()
    }

    userRouterPost() {
        this.router.post("/register")
        this.router.post("/login")
        this.router.post("/register-huerto")
    }
}