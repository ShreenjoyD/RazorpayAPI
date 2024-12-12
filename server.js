const express = require('express');
const app = express();
const PORT = 8000;
var v=require('./transfer');

app.use(express.json())

app.post('/', function (req, res) {
    const a="Joy";
    const b="687957564357";
    const c="034";
    const {name, number, cvv, amt} = req.body;
    if(name==a && number==b && cvv==c){
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
/*{
    "name": "Joy",
    "number": "687957564357",
    "cvv": "034",
    "amt": 700
}*/