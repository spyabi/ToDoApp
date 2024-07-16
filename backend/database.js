require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.MONGODB_URI || "mongodb://localhost:27107/";

const options = {
serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,      
    }
};

let client;
const connectToMongoDB = async() => {
    if (!client){
        //if there is no client, set the client. Only create client if there is no client
        try{
            client = await MongoClient.connect(uri, options)
            console.log("Connected to MongoDB")
        }catch(error){
            console.log(error)
        }
    }
    return client;
};

const getConnectedClient = () => client;

module.exports = { connectToMongoDB, getConnectedClient};