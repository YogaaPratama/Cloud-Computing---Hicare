const texts = require("./texts");
const books = require("./texts");
const articles = require("./texts");

const savetextHandler = (request, h) => {
  const { name, article } = request.payload;
  const newText = {
    name,article
  };

  texts.push(newText);

  const isSuccess = texts.filter((text) => text.name === name).length > 0;
  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Artikel Berhasil Ditambahkan",
      data: {
        textName : name,
        textArticle : article
      },
    });
    response.code(201);
    return response;
  }
  
  storeData(name, newText);

  const response = h.response({
    status: "fail",
    message: "Artikel gagal ditambahkan",
  });
  response.code(500);
  return response;
};

const getAllTextHandler = (request, h) => {
  let filterText = [...articles];

  return h
    .response({
      status: "success",
      data: {
        texts: filterText.map((text) => ({
          name: text.name,
          article : text.article
        })),
      },
    })
    .code(200);
};

const getTextbyNameHandler = (request, h) => {
  const { textName } = request.params;
  const text = texts.find((texts) => texts.name === textName);

  if (textName !== undefined) {
    return {
      status: "success",
      data: {
        text,
      },
    };
  }

  const response = h.response({
    status: "fail",
    message: "Artikel tidak ditemukan",
  });
  response.code(404);
  return response;
};

module.exports = {getTextbyNameHandler,getAllTextHandler,savetextHandler}