import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import authConfig from "../config/authConfig";
import TokenPayload from "../intefaces/TokenPayload";

export default function (request: Request, response: Response, next: NextFunction) {

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new Error("403");
    }

    const [, token] = authHeader.split(" ");

    try {
        const decoded = verify(token, authConfig.jwt.secret)
        const { sub } = decoded


        request.user = {
            id: Number(sub),
        }


        return next();

    } catch (error) {
        return response.status(403).json({ error: "Login expirado!" })
    }

}
