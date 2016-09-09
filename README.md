# This stuff is not easy

To get a grip on what hypermedia APIs are all about, I have to code some up.
Starting at the very beginning, I'll code up a working API service based 
closely, but not exactly, on Mike Amundsen's Collection-J (Cj) example in his book
_RESTful Web Clients_.

## Features

* Generate state representations in runtime WeSTL format
* Generate Cj output (only and default) with representor

## To-Dos (how meta)

* Separate layers a bit more: data retrieval, object preparation, state
representation, final representation.
* Set globals, like API root URL, somewhere central.
* Tests (preferably Karma) for runtime resource description generation, 
and Cj generation

## Requirements

* Node, npm,
* SQLite3
* Express
* node-sqlite3

