// fetch('https://api.cryptonator.com/api/full/btc-usd')
// .then(res =>{
//     console.log('Response Waiting for JSON: ', res);
//     return res.json();
// })

// .then(data =>{
//     console.log(data);
//     console.log(data.ticker.price);
// })

// .catch(e =>{
//     console.log('Oh No Error', e)
// })

// ASYNC Version

const fetchBitcoinPrice = async () =>{
    try{
        const res = await fetch('https://api.cryptonator.com/api/full/btc-usd');
        const data = await res.json();
        console.log(data.ticker.price); 
    }
    catch (e){
        console.log('Error : ', e);
    }
}
    