//allows you to use .env
require("dotenv").config;
const express = require("express");
// function connectToMongoDB comes from ./database file
const { connectToMongoDB } = require("./database");

const app = express();

//The line below is a middleware function that parses incoming requests with JSON payloads and makes the parsed data available in req.body
app.use(express.json());


const router = require("./routes");
app.use("/api", router);

// if a port is specified in .env then use that, else 4000
const port = process.env.PORT || 5000;

async function startServer(){
    //it will wait for mongoDB to connect before connecting to our express server
    await connectToMongoDB();
    app.listen(port, () =>{
        console.log(`Server is listening on http://localhost:${port}`);
    });
}

startServer();
