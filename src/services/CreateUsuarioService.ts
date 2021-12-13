import { getRepository } from "typeorm";
import { hash } from "bcryptjs";

import UsuarioCriacao from "../intefaces/UsuarioCriacao";
import Usuario from "../models/Usuario";

class CreateUsuarioService {

    public async salva({ nome, email, password }: UsuarioCriacao): Promise<string> {
        const usuarioRepository = getRepository(Usuario)

        const checkEmailExists = await usuarioRepository.findOne({
            where: { email },
        })

        if (checkEmailExists) {
            throw new Error("Já existe um usuário cadastrado com esse email!")
        }

        const hashedPassword = await hash(password, 8)

        const usuarioCriado = usuarioRepository.create({
            nome: nome,
            email: email,
            password: hashedPassword
        });

        await usuarioRepository.save(usuarioCriado);
        const nomeUsuarioSalvo = usuarioCriado.nome
        return nomeUsuarioSalvo;

    }

}

export default CreateUsuarioService;
