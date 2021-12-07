"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const typeorm_1 = require("typeorm");
const PecaRoupaRepository_1 = __importDefault(require("../repositories/PecaRoupaRepository"));
class CreatePecaRoupaService {
    buscarPorData(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const pecaRoupaRepository = (0, typeorm_1.getCustomRepository)(PecaRoupaRepository_1.default);
            const pecaRoupaData = (0, date_fns_1.startOfHour)(data);
            const findPecaRoupa = yield pecaRoupaRepository.findDate(pecaRoupaData);
            return findPecaRoupa;
        });
    }
    salvar({ nome, status, data }) {
        return __awaiter(this, void 0, void 0, function* () {
            const pecaRoupaRepository = (0, typeorm_1.getCustomRepository)(PecaRoupaRepository_1.default);
            const pecaRoupa = pecaRoupaRepository.create({
                nome: nome,
                status: status,
                data: data,
            });
            yield pecaRoupaRepository.save(pecaRoupa);
            return pecaRoupa;
        });
    }
}
exports.default = CreatePecaRoupaService;
