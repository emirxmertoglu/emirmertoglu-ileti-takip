const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// express uygulamasini baslatir
const app = express();

// ara katmanimiz
app.use(bodyParser.json());
app.use(cors());

// iletilerle ilgili rotalari barindiran kodlar
const iletiler = require('./routes/api/iletiler');
app.use('/api/iletiler', iletiler);

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(__dirname + '/public/'));
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

// server localde 5000, remoteda herokunun belirledigi portta calisir
const port = process.env.PORT || 3647;

app.listen(port, () => console.log(`server ${port} numarali porttan baslatildi`));