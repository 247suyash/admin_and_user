import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose"
import seeders from "./seeders/index.js";
import router from "./api/routes/v1/admin/Auth.js";

dotenv.config();      // Here is env file configration

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // use for getting form url data encoded

app.use("/api/v1", router);

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