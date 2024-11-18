import { config } from "dotenv";
config();

import * as db from "./db";

db.addPost("La Carbonare", "Carlo Cracco", "Molto buona", false)
    .then(r => {
        console.log(r);
    });