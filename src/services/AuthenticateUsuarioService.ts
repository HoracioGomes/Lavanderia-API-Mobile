import { getRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

import AuthenticateRequest from "../intefaces/AuthenticateRequest";
import AuthenticateResponse from "../intefaces/AuthenticateResponse";
import Usuario from "../models/Usuario";
import Token from "../models/Token";
import authConfig from "../config/authConfig";


class AuthenticateUsuarioService {
    public async auth({ email, password }: AuthenticateRequest): Promise<AuthenticateResponse> {
        const userRepo = getRepository(Usuario);
        const usuario = await userRepo.findOne({
            where: { email }
        });

        if (!usuario) {
            throw new Error("401")
        }

        const checkPassword = await compare(password, usuario.password)

        if (!checkPassword) {
            throw new Error("401")

        }

        const { expiresIn, secret } = authConfig.jwt;

        const hashToken = sign({}, secret, {
            subject: String(usuario.id),
            expiresIn,
        });

        const token = new Token(hashToken, usuario.id);

        return { usuario, token }

    }

    public verifyToken(token: string): boolean {

        try {

            const decode = verify(token, authConfig.jwt.secret)

            if (decode.sub != null) {
                return true
            } else {
                throw new Error("403")
            }

        } catch (error) {

            throw new Error("403")

        }


    }
}

export default AuthenticateUsuarioService;
