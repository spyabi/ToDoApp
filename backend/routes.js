const express = require("express");
const router = express.Router();
const { getConnectedClient } = require("./database");
const { ObjectId } = require("mongodb");  //import the ObjectId class from the mongodb library.


//getCollection function -> just returns the collection we want to get data from, to add, to delete etc
const getCollection = () => {
    const client = getConnectedClient();
    //MongoDB tables are called collections and each object we insert is called a document
    const collection = client.db("todosdb").collection("todos");
    return collection;
}

//GET /todos
router.get("/todos", async(req, res) =>{
    const collection = getCollection();
    const todos = await collection.find({}).toArray();
    res.status(200).json(todos);
});

//POST /todos
router.post("/todos", async(req, res) =>{
    const collection = getCollection();
    const { todo } = req.body;

    if (!todo){
        return res.status(400).json({ msg : "error no todo found"});
    }

    // todo = JSON.stringify(todo); // A way to convert json parameter to string

    const newTodo = await collection.insertOne({ todo, status:false});
    res.status(201).json({ todo, status:false, _id: newTodo.insertedId});
});

//DELETE / todos/:id
router.delete("/todos/:id", async(req, res) =>{
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);

    const deletedTodo = await collection.deleteOne({ _id });
    res.status(200).json(deletedTodo);
});

//PUT /todos/:id
router.put("/todos/:id", async(req, res) =>{
    const collection = getCollection();
    const _id = new ObjectId(req.params.id); //convert the id parameter from the request into a MongoDB ObjectId. // if /todos/:test then req.params.test
    const { status } = req.body; //extract the status property from req.body, equiv to const status = req.body.status;

    if (typeof status !== "boolean"){
        return res.status(400).json({msg: "Invalid status"});
    }

    const updatedTodo = await collection.updateOne({ _id }, { $set: {status: !status} }); //$set is an operator from mongoDB
    res.status(200).json(updatedTodo);
});

module.exports = router;