const tf = require('@tensorflow/tfjs-node');

function loadModel() {
    return tf.loadLayersModel('https://storage.googleapis.com/capstone_buckets_lettuce2/tfjs/model.json');
}

module.exports = loadModel;