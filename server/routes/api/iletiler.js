const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// iletileri GET metodu ile al
router.get('/', (req, res) => {
    res.send('Merhaba..');
});

// ileti ekle

// ileti sil

module.exports = router;