const westl = {
  "westl": {
    "actions": [{
      "name": "home",
      "type": "safe",
      "action": "read",
      "prompt": "To-Dos"
    }, {
      "name": "users",
      "type": "safe",
      "action": "read",
      "prompt": "User List"
    }, {
      "name": "addToDo",
      "type": "unsafe",
      "action": "append",
      "prompt": "Add To-Do",
      "inputs" : [ {
        "name" : "title",
        "prompt" : "What needs to be done?",
        "required" : true,
      }]
    }]
  }
};

exports.westl = westl;

// ToDo: Add westl actions for changing To-Dos
/*
    {
      "name": "completeToDo",
      "type": "unsafe",
      "action": "replace",
      "prompt": "Mark To-Do Completed"
    }, {
      "name": "retitleToDo",
      "type": "unsafe",
      "action": "replace",
      "prompt": "Re-label To-Do"
    }
*/
