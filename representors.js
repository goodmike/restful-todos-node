const input = {
    "state_repesentation": {
        "westl": {
            "actions": [{
                "name": "home",
                "type": "safe",
                "action": "read",
                "prompt": "To-Dos",
                "href": "http://localhost:3000/",
                "rel": ["home", "http://localhost:3000/rels/todo", "collection", "self"]
            }, {
                "name": "users",
                "type": "safe",
                "action": "read",
                "prompt": "User List",
                "href": "http://localhost:3000/users/",
                "rel": ["http://localhost:3000/rels/user", "collection"]
            }, {
                "name": "addToDo",
                "type": "unsafe",
                "action": "append",
                "prompt": "Add To-Do",
                "inputs": [{"name": "title", "prompt": "What needs to be done?", "required": true}],
                "href": "http://localhost:3000/",
                "rel": ["http://localhost:3000/rels/addToDo"]
            }],
            "data": {
                "fields": [{"name": "id", "prompt": null},
                    {"name": "title", "prompt": "title"},
                    {"name": "completed_flag","prompt": "completed?"}],
                "objects": [{
                    "id": 1,
                    "title": "Get Express app running",
                    "completed_flag": 0
                    }, {
                    "id": 2,
                    "title": "Use timestamp",
                    "completed_flag": 0
                }]
            },
            "title": "To-Do List"
        }
    }
}


const output = {
    "collection": {
        "version": "1.0",
        "href": "http://orm-hyper-todo.herokuapp.com",
        "title": "To-Do List",
        "links": [
            {
                "href": "http://orm-hyper-todo.herokuapp.com/",
                "rel": "collection",
                "prompt": "All task"
            }
        ],
        "items": [
            {
                "rel": "item",
                "href": "http://orm-hyper-todo.herokuapp.com/1sv697h2yij",
                "data": [
                    {"name": "id", "value": "1sv697h2yij", "prompt": "id"},
                    {"name": "title", "value": "Marina", "prompt": "title"},
                    {"name": "completed", "value": "false", "prompt": "completed"}
                ]
            },
            {
                "rel": "item",
                "href": "http://orm-hyper-todo.herokuapp.com/25ogsjhqtk7",
                "data": [
                    {"name": "id", "value": "25ogsjhqtk7", "prompt": "id"},
                    {"name": "title", "value": "new stuff", "prompt": "title"},
                    {"name": "completed", "value": "true", "prompt": "completed"}
                ]
            }
        ],
        "queries": [
            {
                "rel": "search",
                "href": "http://orm-hyper-todo.herokuapp.com/",
                "prompt": "Search tasks",
                "data": [
                    {"name": "title", "value": "", "prompt": "Title"}
                ]
            }
        ],
        "template": {"prompt": "Add task",
            "rel": "create-form",
            "data": [
                {"name": "title", "value": "", "prompt": "Title"},
                {"name": "completed", "value": "false", "prompt": "Complete"}
            ]
        }
    }
};

const root = "localhost:3000"; // ToDo: This should be a constant somewhere

function getLinks(actions) {
    const links = actions.filter(function(action) {
        return action.type === 'safe' &&
            action.rel.indexOf('query') === -1;
    });
    return links.map(function(link) {
        return {
            "prompt": link.prompt,
            "href": link.href,
            "rel": link.rel.join(" ")
        };
    });
}

function getItems(data) {
    return data.objects.map(function(obj) {
        const objKey = obj[data.keyId];
        return {
            "rel": "item",
            "href": data.href(objKey),
            "data": data.fields.map(function(field) {
                return {
                    "name": field.name,
                    "value": obj[field.name],
                    "prompt": field.prompt
                }
            })
        };
    });
}

function getQueries(actions) {
    const queries = actions.filter(function(action) {
        return action.type === 'safe' &&
                action.rel.indexOf('query') !== -1;
    });
    return queries.map(function(action) {
        return {
            "prompt": action.prompt || "search",
            "href": action.href || '#',
            "rel": action.rel.join(" "),
            "data": action.inputs.map(function(input, idx) {
                return Object.assign({
                    name: "input" + idx,
                    value: '',
                    prompt: input.name,
                    required: false,
                    readOnly: false,
                    pattern: ''
                }, input);
            })
        };
    });
}

function getTemplates(actions) {
    const templates = actions.filter(function(action) {
        return action.type !== 'safe' &&
            action.rel.indexOf('template') !== -1;
    });
    return templates.map(function(action) {
        return {
            "prompt": action.prompt || "search",
            "href": action.href || '#',
            "rel": action.rel.join(" "),
            "data": action.inputs.map(function(input, idx) {
                return Object.assign({
                    name: "input" + idx,
                    value: '',
                    prompt: input.name,
                    required: false,
                    readOnly: false,
                    pattern: ''
                }, input);
            })
        };
    });
}

function cj(stateRepresentation) {
    if (!stateRepresentation.westl) {
        console.log("Expected truthy value for westl key in stateRepresentation object");
        return {};
    }

    const actions = stateRepresentation.westl.actions;
    const title = stateRepresentation.westl.title;
    const data = stateRepresentation.westl.data;

    function actionWithRel(localId) {
        const relVal = 'http://' + root + "/rels/" + localId;
        return actions.find(function(action) {
            console.log("action.rel", action.rel, 'relVal', relVal);
            return action.rel.indexOf(relVal) !== -1;
        });
    }

    return {
        "collection": {
            "href": actionWithRel("addToDo").href,
            "title": title,
            "links": getLinks(actions),
            "items": getItems(data),
            "queries": getQueries(actions),
            "templates": getTemplates(actions)
        }
    };
}

exports.cj = cj;
