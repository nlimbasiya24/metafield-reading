import express from "express";
import {metaFieldCreate} from "../../controller/metaFieldCreate.js"


export const metafieldRoute = express.Router();

metafieldRoute.post("/metafields",metaFieldCreate);