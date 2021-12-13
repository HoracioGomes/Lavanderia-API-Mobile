import Usuario from "../models/Usuario";
import Token from "../models/Token";

export default interface AuthenticateResponse{
usuario: Usuario,
token: Token
}
