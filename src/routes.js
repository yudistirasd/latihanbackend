const { storeNote, getNote, showNote, updateNote, destroyNote } = require("./handler");

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: storeNote,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getNote,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: showNote,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: updateNote,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: destroyNote
  }
];

module.exports = routes;
