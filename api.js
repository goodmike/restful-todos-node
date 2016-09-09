const express = require('express');
const app = express();
const sqlite3 = require('sqlite3').verbose();
const stateModels = require('./models.js');
const stateTransitions = require('./westl.js').westl;
const cj = require('./representors.js').cj;

app.get('/state/toDos', function(req, res) {
  retrieveToDos(function(err, rows) {
    if (err) {
      res.status(500).send({error: err});
    } else {
      res.json({
        "state_repesentation": stateModels.toDos(rows, stateTransitions)
      });
    }
  });
});

app.get('/', function(req, res) {
    retrieveToDos(function(err, rows) {
        if (err) {
            res.status(500).send({error: err});
        } else {
            res.json(cj(stateModels.toDos(rows, stateTransitions)));
        }
    });
});

// ToDo: move to a data layer
const retrieveToDos = function(callbackFn) {
  const db = new sqlite3.Database('to-do.db');
  db.serialize(function() {
    db.all("SELECT id, title, completed_flag FROM todos", callbackFn);
  });
}

app.listen(3000);
