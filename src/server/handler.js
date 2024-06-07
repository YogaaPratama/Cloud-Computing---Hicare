const texts = require("./texts");
const { Firestore } = require('@google-cloud/firestore');
const crypto = require("crypto");
const predictClassification = require("../services/inferenceService");
const storeData = require("../services/storeData");
const getData = require("../services/getData");
const { time, timeStamp } = require("console");
const db = new Firestore(); // for search only

const savetextHandler = async (request, h) => {
  const { name, url_image, url_artikel} = request.payload;
  const timestamp = new Date().toISOString();
  const newText = { name, url_image, url_artikel,timestamp };
  

  try {
    await db.collection('texts').add(newText);
    const response = h.response({
      status: "success",
      message: "Artikel Berhasil Ditambahkan",
      data: {
        textName: name,
        texturlImage: url_image,
        texturlArtikel : url_artikel,
        textTimestamp : timestamp
      },
    });
    response.code(201);
    return response;

  } catch (error) {
    const response = h.response({
      status: "fail",
      message: "Artikel gagal ditambahkan",
      error: error.message,
    });
    response.code(500);
    return response;
  }
};


const getAllTextHandler = async (request, h) => {
  try {
    const querySnapshot = await db.collection('texts').get();
    const filterText = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      filterText.push({ name: data.name, url_image: data.url_image, url_artikel: data.url_artikel, timestamp: data.timestamp });
    });

    return h
      .response({
        status: "success",
        data: {
          texts: filterText,
        },
      })
      .code(200);

  } catch (error) {
    console.error('Gagal Mendapatkan Dokumen!:', error);
    return h.response({
      status: 'error',
      message: 'Gagal mengambil dokumen dari Database'
    }).code(500);
  }
};

const getTextbyNameHandler = async (request, h) => {
  const { textName } = request.params;

  try {
    const querySnapshot = await db.collection('texts')
      .where('name', '==', textName)
      .get();

    if (querySnapshot.empty) {
      const response = h.response({
        status: "fail",
        message: "Artikel tidak ditemukan",
      });
      response.code(404);
      return response;
    }
    const text = querySnapshot.docs[0].data();

    return {
      status: "success",
      data: {
        text,
      },
    };
  } catch (error) {
    console.error('Error mengambil dokumen:', error);
    const response = h.response({
      status: 'error',
      message: 'Gagal dalam mendapatkan dokumen dari database'
    });
    response.code(500);
    return response;
  }
};






module.exports = {getTextbyNameHandler,getAllTextHandler,savetextHandler}