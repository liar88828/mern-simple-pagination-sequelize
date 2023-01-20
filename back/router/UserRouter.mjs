import express from "express";
import {getUser} from "../controller.mjs";

 export const userRouter = express.Router()

 userRouter.get('/user',getUser)

