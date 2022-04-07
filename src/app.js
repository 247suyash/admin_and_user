import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose"
import { dirname } from "path";
import { fileURLToPath } from "url";
import  bodyParser from 'body-parser'
import seeders from "./seeders/index.js";
import router from "./api/routes/index.js";

dotenv.config();      // Here is env file configration


global.__filename = fileURLToPath(import.meta.url);
global.__dirname = dirname(__filename);
const app = express();
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // use for getting form url data encoded

app.use("/api", router);

// create server code start here  
const port = process.env.PORT
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})
//create server code end here

//Here start databse connectivity 
mongoose.
    connect(process.env.MONGODB_URI)
    .then(() =>{ 
    console.log("Database connected successfully...")
    seeders()}
    )
    
    .catch((e)=>{
        console.log("Databse connection error",e)
    });
// End database connectivity code