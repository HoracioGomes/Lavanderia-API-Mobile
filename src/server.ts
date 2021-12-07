import "reflect-metadata"

import express, { request, response } from "express";
import "./database";
import routes from "./routes/index"

const app = express();
app.use(express.json())
app.use(routes)
app.listen(3333, () => {
    console.log('🌎 Servidor Iniciado! ^_^');
});
