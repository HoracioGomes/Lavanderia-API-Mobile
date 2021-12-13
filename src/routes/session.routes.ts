import express, { request, Router } from "express";

import AuthenticateUsuarioService from "../services/AuthenticateUsuarioService";

const sessionRoute = Router();

sessionRoute.post("/authenticate", async (request: express.Request, response: express.Response) => {
    try {
        const { email, password } = request.body;

        const authService = new AuthenticateUsuarioService()

        const data = await authService.auth({ email, password });

        return response.status(200).json(data)
    } catch (error) {
        var overraideError = error as Error
        if (overraideError.message == "401") {
            return response.status(401).json({ error: error })
        }
        return response.status(500).json({ error: error })


    }


});

sessionRoute.post("/verify-token", (request: express.Request, response: express.Response) => {
    try {

        const authHeader = request.headers.authorization

        if (!authHeader) {
            return response.status(403).json({ error: "Não autorizado!" })

        }

        const authService = new AuthenticateUsuarioService();

        const [, token] = authHeader.split(" ");

        const bool = authService.verifyToken(token);

        if (bool) {
            return response.status(200).json(bool)
        } else {
            return response.status(403).json({ error: "Não autorizado!" })

        }


    } catch (error) {
        var overraideError = error as Error

        if (overraideError.message == "403") {
            return response.status(403).json({ error: error })
        }

        return response.status(500).json({ error: error })
    }

}

)

export default sessionRoute;
