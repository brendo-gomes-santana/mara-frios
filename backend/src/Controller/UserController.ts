import { Request, Response } from "express";


import { PropsUser } from "../Utils/Types/User";
import { UserService } from "../Service/UserService";

class UserController {
    async Logar(req: Request, res: Response){
        
        const {
            name, password
        } = req.body as PropsUser

        const startServer = new UserService()

        const returno = await startServer.logar({
            name, 
            password
        });

        return res.json(returno)

    }
}

export { UserController };