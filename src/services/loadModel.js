const tf = require('@tensorflow/tfjs-node');

function loadModel() {
    return tf.loadLayersModel('https://storage.googleapis.com/capstone_buckets_lettuce3/model/tmp/tfjs_inceptionv3/model.json');
}

module.exports = loadModel;