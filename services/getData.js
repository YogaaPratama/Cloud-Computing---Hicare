const { Firestore } = require('@google-cloud/firestore');

async function getData(name) {
  const db = new Firestore();

  const predictCollection = db.collection('predictions');
  const doc = await predictCollection.doc(name).get();

  if (!doc.exists) {
    console.log('No such document!');
    return null;
  } else {
    return {
      id: doc.id,
      history: doc.data()
    };
  }
}

module.exports = getData;
