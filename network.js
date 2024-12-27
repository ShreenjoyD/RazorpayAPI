let crypto = require('crypto');

exports.decrypt=(enc, info)=>{

    const a="Joy";
    const b="687957564357";
    const c="034";

    const algorithm = 'aes-256-cbc';
    let iv = Buffer.from(enc.iv, 'hex');
    let key = enc.key;
    let encryptedText = Buffer.from(enc.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
 
    if(info=="name"){
        if(a==decrypted.toString())
            return 1;
        else
            return 0;
    }
    else if(info=="number"){
        if(b==decrypted.toString())
            return 1;
        else
            return 0;
    }
    else if(info=="cvv"){
        if(c==decrypted.toString())
            return 1;
        else
            return 0;
    }
}
