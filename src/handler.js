const texts = require("./texts");
const { Firestore } = require('@google-cloud/firestore');

const db = new Firestore();

// const savetextHandler = (request, h) => {
//   const { name, article } = request.payload;
//   const newText = {
//     name,article
//   };

//   texts.push(newText);

//   const isSuccess = texts.filter((text) => text.name === name).length > 0;
//   if (isSuccess) {
//     const response = h.response({
//       status: "success",
//       message: "Artikel Berhasil Ditambahkan",
//       data: {
//         textName : name,
//         textArticle : article
//       },
//     });
//     response.code(201);
//     return response;
//   }

//   const response = h.response({
//     status: "fail",
//     message: "Artikel gagal ditambahkan",
//   });
//   response.code(500);
//   return response;
// };

const savetextHandler = async (request, h) => {
  const { name, article } = request.payload;
  const newText = { name, article };

  try {
    await db.collection('texts').add(newText);
    const response = h.response({
      status: "success",
      message: "Artikel Berhasil Ditambahkan",
      data: {
        textName: name,
        textArticle: article
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
      filterText.push({ name: data.name, article: data.article });
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


// const getAllTextHandler = (request, h) => {
//   let filterText = [...articles];

//   return h
//     .response({
//       status: "success",
//       data: {
//         texts: filterText.map((text) => ({
//           name: text.name,
//           article : text.article
//         })),
//       },
//     })
//     .code(200);
// };


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

// const getTextbyNameHandler = (request, h) => {
//   const { textName } = request.params;
//   const text = texts.find((texts) => texts.name === textName);

//   if (textName !== undefined) {
//     return {
//       status: "success",
//       data: {
//         text,
//       },
//     };
//   }

//   const response = h.response({
//     status: "fail",
//     message: "Artikel tidak ditemukan",
//   });
//   response.code(404);
//   return response;
// };



module.exports = {getTextbyNameHandler,getAllTextHandler,savetextHandler}