const root = "localhost:3000"; // ToDo: This should be a constant somewhere

const findAction = function(doc, name) {
  return doc.westl.actions.find(function(el) {
    return el.name === name;
  });
};

const toDos = function(records, doc) {

  const actions = [
    // ToDo: API-wide href and rel values like these should not be computed for each model
    Object.assign({}, findAction(doc, 'home'), {
      href: 'http://' + root + '/',
      rel: ['home', 'http://' + root + '/rels/todo', 'collection', 'self']
    }),
    Object.assign({}, findAction(doc, 'users'), {
      href: 'http://' + root + '/users/',
      rel: ['http://' + root + '/rels/user', 'collection']
    }),
    Object.assign({}, findAction(doc, 'addToDo'), {
      href: 'http://' + root + '/',
      rel: ['http://' + root + '/rels/addToDo', 'template']
    })
  ];

  var data = {
    href: function(key) {
      return ["http://", root, '/todos/', key].join();
    },
    keyName: 'id',
    fields: [{
      "name": "id",
      "prompt": null
    }, {
      "name": "title",
      "prompt": "title"
    }, {
      "name": "completed_flag",
      "prompt": "completed?"
    }],
    objects: records.map(function(rec) {
      return Object.assign({}, rec, {completed_flag: !!rec.completed_flag});
    })
  };

  return { 
    "westl": {
      actions: actions,
      data: data,
      title: "To-Do List"
    }
  };
};

exports.toDos = toDos;
