const tf = require("@tensorflow/tfjs-node");
const InputError = require("../exceptions/InputError");

async function predictClassification(model, image) {
    try {
        const tensor = tf.node
            .decodeJpeg(image)
            .resizeNearestNeighbor([224, 224])
            .expandDims()
            .toFloat();

        const prediction = model.predict(tensor);
        const score = await prediction.data();
        const maxIndex = score.indexOf(Math.max(...score));

        const labels = [
            "Healthy",
            "Bacterial",
            "Downy mildew",
            "Powdery mildew",
            "Septoria blight",
            "Wilt blight",
            "Virus"
        ];

        const label = labels[maxIndex];

        let suggestion;
        switch (label) {
            case "Healthy":
                suggestion = "Selada sehat!";
                break;
            case "Bacterial":
            case "Downy mildew":
            case "Powdery mildew":
            case "Septoria blight":
            case "Wilt blight":
            case "Virus":
                suggestion = "Selada mengalami penyakit!";
                break;
            default:
                suggestion = "Tidak dapat menentukan kondisi!";
        }

        return { label, suggestion };
    } catch (error) {
        throw new InputError(`Terjadi kesalahan input: ${error.message}`);
    }
}

module.exports = predictClassification;
