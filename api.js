const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();

app.get('/', function(req, res) {
  retrieveToDos(function(err, rows) {
      if (err) {
        res.status(500).send({error: err});
      } else {
        res.json({"raw_data": rows});
    }
  });
});


const retrieveToDos = function(callbackFn) {
  const db = new sqlite3.Database('to-do.db');
  db.serialize(function() {
    db.all("SELECT id, title, completed_flag FROM todos", callbackFn);
  });
}

app.listen(3000);
