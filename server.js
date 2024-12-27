const express = require('express');
const app = express();
const crypto = require('crypto');
const PORT = 8000;
var v=require('./transfer');
var h=require('./network');

const algorithm = 'aes-256-cbc';

const encrypt=(text) => {

const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
let encrypted = cipher.update(text);
encrypted = Buffer.concat([encrypted, cipher.final()]);
return  { key: key.toString('hex'),
	iv: iv.toString('hex'),
	encryptedData: encrypted.toString('hex')
	};
}

app.use(express.json())

app.post('/', function (req, res) {
    const {name, number, cvv, amt} = req.body;

    let namedata = encrypt(name);
    let numberdata = encrypt(number);
    let cvvdata = encrypt(cvv);

    if((h.decrypt(namedata, "name")==1) && (h.decrypt(numberdata, "number")==1) && (h.decrypt(cvvdata, "cvv")==1)){
        console.log("Step 1: Authorized");
        const {message, accbal}=v.transact(amt);
        console.log("Step 2:",message,"\nRemaining Balance",accbal);
    }
    else{
        console.log("Authorization Failed: Incorrect Payment Details");
    }
});

app.listen(PORT, function (err) {
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
});
