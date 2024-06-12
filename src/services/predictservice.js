const tf = require('@tensorflow/tfjs-node');
const multer = require('multer');
const sharp = require('sharp');
const moment = require('moment-timezone');
const modelPath = 'https://storage.googleapis.com/capstone_buckets_lettuce3/model/tmp/tfjs_inceptionv3/model.json';


const upload = multer({ dest: 'uploads/' });
const predictHandler = async (req, res) => {
    const imagePath = req.file.path;

    try {
        const model = await tf.loadLayersModel(`file://${modelPath}`);
        const processedImage = await preprocessImage(imagePath);

        const input = tf.expandDims(processedImage, 0);
        const output = model.predict(input);
        const prediction = Array.from(output.dataSync());
        const currentTime = moment().tz("Asia/Jakarta").format("M/D/YYYY, h:mm:ss A");

        const labels = ["Healthy", "Bacterial", "Powdery mildew", "Septoria blight", "Wilt blight", "Virus"];
        const predictionObject = createPredictionObject(prediction, labels);

        const maxLabel = Object.keys(predictionObject).reduce((a, b) =>
            predictionObject[a] > predictionObject[b] ? a : b
        );

        const maxLabelPercentage = predictionObject[maxLabel];
        const recommendation = createRecommendation(maxLabel);

        const jsonResponse = {
            predictions: predictionObject,
            maxLabel: {
                label: maxLabel,
                percentage: maxLabelPercentage,
            },
            created: currentTime,
            recommendation: recommendation,
        };

        res.json(jsonResponse);
    } catch (error) {
        console.error('Error loading model or predicting image:', error);
        res.status(500).json({ error: 'Failed to load model or predict image.' });
    }
};

async function preprocessImage(imagePath) {
    try {
        const image = sharp(imagePath);
        const resizedImage = await image.resize(256, 256).toBuffer();
        const buffer = tf.node.decodeImage(resizedImage, 3);
        const normalizedImage = tf.cast(buffer, 'float32').div(255);
        return normalizedImage;
    } catch (error) {
        throw new Error('Failed to preprocess image.');
    }
}

function createPredictionObject(prediction, labels) {
    const predictionObject = {};
    prediction.forEach((value, index) => {
        const label = labels[index];
        const percentage = (value * 100).toFixed(2);
        predictionObject[label] = percentage + "%";
    });
    return predictionObject;
}

function createRecommendation(maxLabel) {
    return {
        action: 'Segera Lakukan Perawatan',
        message: `Berdasarkan prediksi ${maxLabel}, disarankan melakukan perawatan atau mengasingkan daun yang terkena penyakit`,
    };
}

module.exports = {
    upload,
    predictHandler
};
