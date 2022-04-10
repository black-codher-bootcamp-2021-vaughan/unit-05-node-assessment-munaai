require("dotenv").config();
const fs = require("fs");
const express = require("express");
const app = express();
const path = require("path");
const port = 8080;
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const todoFilePath = process.env.BASE_JSON_PATH;

//Read todos from todos.json into variable
let todos = require(__dirname + todoFilePath);

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.raw());
// app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "public")));

app.get("/todos", (_, res) => {
  console.log("muna was here");
  const todos = require("./models/todos.json");
  console.log(todos);
  res.status(200).send(todos).end();
});



app.get("/todos/overdue", (req, res) => {
  console.log("muna is doing overdue here");
  const foundOverdues = todos.filter((todo) => {
    //we want to have date of today as a number
    // const todaysDateString =
    const todaysDate = Date.now();

    //we want to tranfer the due date into a number
    const dueDate = Date.parse(todo.due);

    console.log(dueDate, todaysDate);
    //compare these numbers and return true if overdue is lower than todays date

    return dueDate < todaysDate;
  });
  res.status(200).send(foundOverdues).end();
});

//Add GET request with path '/todos/completed'

app.get("/todos/completed", (req, res) => {
  console.log("muna is doing overdue here");
  // let newCompleted = [];
  const foundCompleted = todos.filter((todo) => {
    console.log(todo.completed);
    return todo.completed === true;
  });
  res.status(200).send(foundCompleted).end();
});

// Get request with ID

app.get("/todos/:id", (req, res) => {
  const foundTodo = todos.find((todo) => {
    console.log(req.params.id, todo.id);
    return todo.id === req.params.id;
  });
  if (!foundTodo)
    res.status(404).send("The todo with the given ID was not found");
  res.status(200).send(foundTodo).end();
});

//Add POST request with path '/todos'

app.post("/todos", (req, res) => {
  console.log(todos);

  const newTodo = req.body;
  todos.push(newTodo);
   //here we should update the database or write our file
   fs.writeFile(__dirname + process.env.BASE_JSON_PATH,  JSON.stringify(todos), err => {
    if (err) {
      console.error(err)
      return
    }
}) 
  
  console.log(newTodo);
  res.send(todos);
});

//Add PATCH request with path '/todos/:id
//Edit the name and/or due date attributes of a todo.
app.patch("/todos/:id", (req, res) => {
  console.log("muna is doing patch ID here");
  const foundTodo = todos.find(todo => {
    return  req.params.id === todo.id
  })
  if (!foundTodo) {
    res.status(404).send("The todo with the given ID was not found");
  }

  const updatedTodos = todos.map((todo) => {
    if (req.params.id === todo.id) {
      console.log(todo.name);
      todo.name = req.body.name;
      console.log(todo.name);
      todo.due = req.body.due;
      console.log(todo);
    }
    return todo;
  });
  
    //here we should update the database or write our file
    fs.writeFile(__dirname + process.env.BASE_JSON_PATH,  JSON.stringify(updatedTodos), err => {
      if (err) {
        console.error(err)
        return
      }
  })
  res.status(200).send(updatedTodos).end();
});

//Add POST request with path '/todos/:id/complete
//Update todo, set attribute complete to true
app.post("/todos/:id/completed", (req, res) => {});

//Add POST request with path '/todos/:id/undo

app.post("/todos/:id/undo", (req, res) => {});

//Add DELETE request with path '/todos/:id

app.delete("/todos/:id", (req, res) => {
  //look up the todo
  const foundTodo = todos.find((todo) => {
    console.log(req.params.id, todo.id);
    return todo.id === req.params.id;
  });
  if (!foundTodo)
    res.status(404).send("The todo with the given ID was not found");

  //delete
  const index = todos.indexOf(foundTodo);
  todos.splice(index, 1);

  res.send(todos);
});

app.listen(port, function () {
  console.log(`Node server is running... http://localhost:${port}`);
});

module.exports = app;
