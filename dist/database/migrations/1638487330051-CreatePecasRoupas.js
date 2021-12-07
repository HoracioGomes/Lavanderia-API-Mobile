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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreatePecasRoupas1638487330051 = void 0;
const typeorm_1 = require("typeorm");
class CreatePecasRoupas1638487330051 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
            yield queryRunner.createTable(new typeorm_1.Table({
                name: "pecas_roupas",
                columns: [
                    // {
                    //     name: "id",
                    //     type: "varchar",
                    //     isPrimary: true,
                    //     isGenerated: true,
                    //     generationStrategy: "uuid",
                    //     default: "uuid_generate_v4()",
                    // },
                    {
                        name: "id",
                        type: "integer",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment",
                        isNullable: false
                    },
                    {
                        name: "nome",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "status",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "data",
                        type: "timestamp with time zone",
                        isNullable: false
                    },
                    {
                        name: "posicao_na_lista",
                        type: "int",
                        default: null,
                        isNullable: true
                    }
                ]
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.dropTable("pecas_roupas");
        });
    }
}
exports.CreatePecasRoupas1638487330051 = CreatePecasRoupas1638487330051;
