const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');



//crate connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodejsmysql'
});


//connect to server 
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('mysql Connected...');
});

const app = express();
app.use(bodyParser.json());
app.use(cors());


// create db 
app.get('/createdb', (req, res) => {
  let sql = 'CREATE DATABASE nodejsmysql';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Database created...');
  });
});

//create table 
app.get('/createpoststable', (req, res) => {
  let sql = "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Posts table created...');
  });
});


//add todo
app.post('/addtodo', (req, res) => {
  let post = req.body
  console.log(req.body.date_assigned);
  let sql = "INSERT INTO todos SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

//get todos
app.get('/gettodos', (req, res) => {
  let sql = "SELECT * FROM todos";
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

//add person to todos
app.post('/adduser', (req, res) => {
  let post = req.body
  console.log(req.body);
  let sql = "INSERT INTO todos SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

//get tasks asigned 
app.get('/gettodos/person', (req, res) => {
  let sql = "SELECT * FROM todos WHERE person = person";
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});



//add person
app.post('/addperson', (req, res) => {
  let post = req.body
  console.log(req.body);
  let sql = "INSERT INTO persons SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});


//Select all persons 
app.get('/getpersons', (req, res) => {
  let sql = "SELECT * FROM persons ";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(results);
  });
});

//pull task with same  persons id
app.get('/getpersonid/:id', (req, res) => {
  let sql = `SELECT * FROM persons WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post fetched...');
  });
});


//insert post 1 
app.get('/addpost1', (req, res) => {
  let post = { title: 'Post One', body: 'This is post number one' };
  let sql = "INSERT INTO posts SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post one added...');
  });
});


//Select posts 
app.get('/getposts', (req, res) => {
  let sql = "SELECT * FROM posts";
  let query = db.query(sql, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send(results);
  });
});


//Select one post 
app.get('/getpost/:id', (req, res) => {
  let sql = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post fetched...');
  });
});

// Update post
app.get('/updatepost/:id', (req, res) => {
  let newTitle = 'Updated Title';
  let sql = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
  let query = db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Post updated...');
  });
});

// delete task
app.delete('/deletetask/todos/:id', (req, res) => {
  const id = req.params.id;
  let sql = `DELETE FROM todos WHERE id = ?`;
  let query = db.query(sql, id, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(result);
  });
});

app.listen('3000', () => {
  console.log('server started on port 3000');
});