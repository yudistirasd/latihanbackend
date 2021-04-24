const { nanoid } = require('nanoid');
const notes = require('./notes');

const responseTemplate = {
  code: 201,
  status: 'success',
  message: 'Catatan berhasil ditambahkan'
}

const getNote = () => ({
  status: 'success',
  data: {
    notes,
  },
});

const storeNote = (request, h) => {
  const {title = 'Untilted', tags, body} = request.payload;

  const id = nanoid(16);
  const createdAt = new Date().toISOString();
  const udpatedAt = createdAt;

  const newNote = {
    title, tags, body, id, createdAt, udpatedAt
  }

  notes.push(newNote);

  const isSuccess = notes.filter(
    (note) => note.id === id
  ).length > 0;

  if(isSuccess) {
    responseTemplate.data = {
      noteId: id
    }
  } else {
    responseTemplate.code = 500;
    responseTemplate.status = 'Fail';
    responseTemplate.message = 'Catatan gagal dibuat';
  }

  const response = h.response(responseTemplate)

  response.code(responseTemplate.code);

  return response;

};

const showNote = (request, h) => {
  const { id } = request.params;

  const note = notes.filter((n) => n.id === id)[0];

  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan',
  });
  response.code(404);
  return response;
}

const updateNote = (request, h) => {
  const { id } = request.params;

  const { title, tags, body } = request.payload;

  const updatedAt = new Date().toISOString();

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });
  response.code(404);
  return response;
}

const destroyNote = (request, h) => {
  const { id } = request.params;

  const index = notes.findIndex((note) => note.id === id);

  if (index !== -1) {
    notes.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus',
    });
    response.code(200);
    return response;
  }
 
 const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
}

module.exports = { storeNote, getNote, showNote, updateNote, destroyNote }