import { Router } from "express";

import pecasRoupasRouter from "./pecas_roupas.routes";
import userRoute from "./usuario.routes";
import sessionRoute from "./session.routes";

const routes = Router()
routes.use("/pecas-roupas", pecasRoupasRouter)
routes.use("/usuario", userRoute)
routes.use("/session", sessionRoute)


export default routes;

