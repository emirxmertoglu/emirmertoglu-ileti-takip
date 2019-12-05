const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// iletileri GET metodu ile al
// router.get('/', (req, res) => {
//     res.send('Merhaba..');
// });

router.get('/', async (req, res) => {
    // dondurulen koleksiyonlari iletiler degiskenine yukle
    const iletiler = await loadIletilerCollection();
    // db icindeki iletiler dizisini dondur ve istemciye cevap olarak gonder
    // find yontemindeki bos kume parantezleri herhangi bir kriter verilmediginden
    // butun iletileri getirir
    res.send(await iletiler.find({}).toArray());
})

// ileti ekle
router.post('/', async (req, res) => {
    const iletiler = await loadIletilerCollection();
    await iletiler.insertOne({
        ileti: req.body.ileti,
        olusturulmaTarihi: new Date()
    });
    res.status(201).send();
})


// ileti sil
router.delete('/:id', async (req, res) => {
    const iletiler = await loadIletilerCollection();
    await iletiler.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
})

// ileti guncelle
router.put('/:id', async (req, res) => {
    const iletiler = await loadIletilerCollection();
    await iletiler.updateOne(
        {_id: new mongodb.ObjectID(req.params.id)},
        {$set: {ileti: req.body.ileti, olusturulmaTarihi: new Date()}}
    );
    res.status(200).send();
})

async function loadIletilerCollection(){
    const client = await mongodb.MongoClient.connect
    (
        'mongodb+srv://emirmertoglu:Emir3647*@cluster0-kbrgd.mongodb.net/test?retryWrites=true&w=majority',
        {
            useNewUrlParser : true,
            useUnifiedTopology : true
        }
    );
    return client.db('emirProje').collection('iletiler');
}

module.exports = router;