exports.transact=(fund)=>{
    const balance=8990;
    const bal=balance-fund;
    if(bal<=1000)
        return {message:"Insufficient balance, Payment Unsuccessful", accbal:balance};
    else{
        return {message:"Payment Authentication Successful", accbal:bal}
    }
}