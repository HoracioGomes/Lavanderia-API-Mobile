import  express, { request, response }  from "express";
import { validate } from 'uuid';

export default function middlewareValidaId(request: express.Request, response: express.Response, next: express.NextFunction) {
    const { id } = request.params;
    if (!validate(id)) {
        return response.status(400).json({ error: "O id não é válido!!!" });
    }
    next();
    
}