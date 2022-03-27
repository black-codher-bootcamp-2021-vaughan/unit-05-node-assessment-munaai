require('dotenv').config();
const fs = require('fs');
const express = require('express');
const app = express();
const path = require('path');
const port = 8080;
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');
const todoFilePath = process.env.BASE_JSON_PATH;


//Read todos from todos.json into variable
let todos = require(__dirname + todoFilePath);

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.raw());
// app.use(bodyParser.json());

app.use("/", express.static(path.join(__dirname, "public")));

// app.get("/", (_, res) => {
  
//   const homeurl= `./public/index.html`
//   console.log("helooooo", homeurl);

//   // res.sendFile(path.join(__dirname, "public/index.html"));
//   // res.write("hello world")
  
//   res.status(200).end();
// });

app.get('/todos', (_, res) => {
  
  console.log(todoFilePath);
  // res.writeHead(200, { "Content-Type": "application/json" });
  // constres.send('im muna');
  const todos = require("./models/todos.json");
  console.log(todos);
  res.status(200).send(todos).end();

  

});
app.get('/todos/:id', (req, res) => {
  
  console.log("ilovepink", req.params.id);


  const todo = todos.find((todo)=>todo.id===req.params.id)
  console.log(todos.find((todo)=>todo.id===req.params.id));
  //I should throw an error if I cant find the todo
  res.status(200).send(todo).end();

  
});

//Add GET request with path '/todos/overdue'

//Add GET request with path '/todos/completed'

//Add POST request with path '/todos'

app.post('/todos', (req, res) =>{ 
  // console.log("hahaha", req.body,todos[0]);
  console.log(todos);
  //check that body format is correct if not throw an error

  const newTodo = req.body;
  // const arrayTodos = JSON.parse(todos)

  // const newArray = []
  // for(let i = 0, i < todos.length, i++){
  //   newArray.push()
  // } 
  const newArray = []
  todos.forEach(element => {
    newArray.push(element)
    
  });
  const content = newArray.push(newTodo);

  console.log(content);


//   fs.writeFile(__dirname + process.env.BASE_JSON_PATH,  content, err => {
//     if (err) {
//       console.error(err)
//       return
//     }
// })
res.status(200).send("blahblah").end();
})

//Add PATCH request with path '/todos/:id


//Add POST request with path '/todos/:id/complete

//Add POST request with path '/todos/:id/undo

//Add DELETE request with path '/todos/:id

app.listen(port, function () {
    console.log(`Node server is running... http://localhost:${port}`);
});

module.exports = app;