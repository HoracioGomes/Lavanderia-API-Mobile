import express, { Router } from "express";

import CreateUsuarioService from "../services/CreateUsuarioService";

const userRoute = Router()

userRoute.get("/", (request: express.Request, response: express.Response) => {
    try {
        return response.status(200).json({ mensagem: "Funcionando" })
    } catch (error) {
        return response.status(400).json({ error })
    }
})

userRoute.post("/", async (request: express.Request, response: express.Response) => {
    try {
        const usuarioService = new CreateUsuarioService();
        const { nome, email, password } = request.body;
        const nomeUsuario = await usuarioService.salva({ nome, email, password });

        return response.status(200).json(nomeUsuario+" foi salvo(a) com sucesso!");

    } catch (error) {
        return response.status(400).json({ error });
    }
})

export default userRoute;
