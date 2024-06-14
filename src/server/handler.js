const { Firestore } = require('@google-cloud/firestore');
const db = new Firestore(); // for search & histories
const express = require('express');
//const tf = require('@tensorflow/tfjs-node');
const multer = require('multer');
const app = express();
//const sharp = require('sharp')
const upload = multer({dest: 'uploads/'});
const moment = require('moment-timezone')


const postPredictHandler = async (req,res)=>{
  const imagePath = req.file.path;
  const modelPath = 'https://storage.googleapis.com/capstone_buckets_lettuce3/model/tmp/tfjs_inceptionv3/model.json'
  try{
    const model = await tf.loadLayersModel(modelPath);
    const processedImage = await preprocessImage(imagePath);
    
    const input = tf.expandDims(processedImage,0);
    const output = model.predict(input);
    const prediction = Array.from(output.dataSync());
    const currentTime = moment().tz("Asia/Jakarta").format("M/D/YYYY, h:mm:ss A");

    const labels = ["Healthy","Bacterial", "Powdery mildew","Downy Mildew", "Septoria blight", "Wilt blight", "Virus" ];
    const predictionObject ={};

    prediction.forEach((value, index) => {
        const label = labels[index];
        const percentage = (value * 100).toFixed(2);
        predictionObject[label] = parseFloat(percentage);
    });

    const maxLabel = Object.keys(predictionObject).reduce((a, b) =>
        predictionObject[a] > predictionObject[b] ? a : b
    );

    const maxLabelPercentage = predictionObject[maxLabel].toFixed(2) + "%";

    const reccomendation ={
        action: 'Segera Lakukan Perawatan',
        message:`Berdasarkan prediksi ${maxLabel}, disarankan melakukan perawatan atau mengasingkan daun yang terkena penyakit`,
    };

    const jsonResponse = {
        predictions: Object.keys(predictionObject).reduce((acc, key) => {
            acc[key] = predictionObject[key].toFixed(2) + "%";
            return acc;
        }, {}),
        maxLabel:{
            label: maxLabel,
            percentage : maxLabelPercentage,
        },
        created : currentTime,
        reccomendation: reccomendation,
    };

    res.json(jsonResponse);
}
catch(error){
    console.error('Error loading model or predicting image:', error);
    res.status(500).json({ error: 'Failed to load model or predict image.' });
}

async function preprocessImage(imagePath){
  try{
      console.log(`Processing image at path: ${imagePath}`);
      const image = sharp(imagePath);
      console.log('Image loaded with sharp');

      const resizedImage = await image.resize(256, 256).toBuffer();
      console.log('Image resized');

      const buffer = tf.node.decodeImage(resizedImage, 3);
      console.log('Image decoded to tensor');

      const normalizedImage = tf.cast(buffer, 'float32').div(255);
      console.log('Image normalized');

      return normalizedImage;
  }
  catch(error){
      throw new Error ('Failed to preprocess image.');
  }

}
}

const savetextHandler = async (req, res) => {
  const { name, url_image, url_artikel, deskripsi } = req.body;
  const timestamp = new Date().toISOString();
  const newText = { name, url_image, url_artikel, deskripsi, timestamp };

  try {
    await db.collection('texts').add(newText);
    return res.status(201).json({
      status: "success",
      message: "Artikel Berhasil Ditambahkan",
      data: {
        textName: name,
        texturlImage: url_image,
        texturlArtikel: url_artikel,
        textDeskripsi: deskripsi,
        textTimestamp: timestamp
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
      message: "Artikel gagal ditambahkan",
      error: error.message,
    });
  }
};

const getAllTextHandler = async (req, res) => {
  try {
    const querySnapshot = await db.collection('texts').get();
    const filterText = [];

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      filterText.push({ name: data.name, url_image: data.url_image, url_artikel: data.url_artikel, deskripsi: data.deskripsi, timestamp: data.timestamp });
    });

    return res.status(200).json({
      status: "success",
      data: {
        texts: filterText,
      },
    });
  } catch (error) {
    console.error('Gagal Mendapatkan Dokumen!:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Gagal mengambil dokumen dari Database'
    });
  }
};

const getTextbyNameHandler = async (req, res) => {
  const { textName } = req.params;

  try {
    const querySnapshot = await db.collection('texts')
      .where('name', '==', textName)
      .get();

    if (querySnapshot.empty) {
      return res.status(404).json({
        status: "fail",
        message: "Artikel tidak ditemukan",
      });
    }

    const text = querySnapshot.docs[0].data();

    return res.status(200).json({
      status: "success",
      data: {
        text,
      },
    });
  } catch (error) {
    console.error('Error mengambil dokumen:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Gagal dalam mendapatkan dokumen dari database'
    });
  }
};

module.exports = { getTextbyNameHandler, getAllTextHandler, savetextHandler,postPredictHandler };
