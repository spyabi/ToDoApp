const express = require("express");

const router = express.Router();

//GET /todos
router.get("/todos", (req, res) =>{
    res.status(200).json({ msg: "GET REQUEST TO /api/todos"});
});

//POST /todos
router.post("/todos", (req, res) =>{
    res.status(201).json({ msg: "POST REQUEST TO /api/todos"});
});

//DELETE / todos/:id
router.delete("/todos/:id", (req, res) =>{
    res.status(200).json({ msg: "DELETE REQUEST TO /api/todos/:id"});
});

//PUT /todos/:id
router.put("/todos/:id", (req, res) =>{
    res.status(200).json({ msg: "PUT REQUEST TO /api/todos/:id"});
});

module.exports = router;