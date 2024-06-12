const express = require('express');
const multer = require('multer')
const { getTextbyNameHandler, getAllTextHandler, savetextHandler, postPredictHandler} = require('./handler');
const upload = multer({dest: 'uploads/'});
const router = express.Router();

// POST /texts
router.post('/texts', savetextHandler);

// GET /texts
router.get('/texts', getAllTextHandler);

// GET /texts/:textName
router.get('/texts/:textName', getTextbyNameHandler);

//POST /predict
router.post('/predict', upload.single('image'), postPredictHandler);

module.exports = router;
