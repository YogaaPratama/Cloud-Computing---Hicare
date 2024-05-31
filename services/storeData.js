const { Firestore } = require('@google-cloud/firestore');

async function storeData(name, data) {
  const db = new Firestore();

  const predictCollection = db.collection('predictions');
  return predictCollection.doc(name).set(data);
}

module.exports = storeData;