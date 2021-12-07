"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
function middlewareValidaId(request, response, next) {
    const { id } = request.params;
    if (!(0, uuid_1.validate)(id)) {
        return response.status(400).json({ error: "O id não é válido!!!" });
    }
    next();
}
exports.default = middlewareValidaId;
