"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let PecaRoupa = class PecaRoupa {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "integer" }),
    __metadata("design:type", Number)
], PecaRoupa.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PecaRoupa.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], PecaRoupa.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone"),
    __metadata("design:type", Date)
], PecaRoupa.prototype, "data", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "int", nullable: true, name: "posicao_na_lista" }),
    __metadata("design:type", Number)
], PecaRoupa.prototype, "posicaoNaLista", void 0);
PecaRoupa = __decorate([
    (0, typeorm_1.Entity)("pecas_roupas")
], PecaRoupa);
exports.default = PecaRoupa;
