import { Router } from "express";
import {sendEmail} from "../controllers/gmail.controller";

const emailRoutes = Router();

emailRoutes.post("/send", sendEmail )

export default emailRoutes