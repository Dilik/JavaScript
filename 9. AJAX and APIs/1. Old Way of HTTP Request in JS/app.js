const req = new XMLHttpRequest(); 
const priceLabel = document.querySelector('#price'); 

req.onload = function(){
    console.log('All good');
    const data = JSON.parse(this.responseText);
    priceLabel.innerText = ` $ ${Math.floor(data.ticker.price)}`; 
}

req.onerror = function(){
    console.log('Error');
    console.log(this);
}

req.open('GET', 'https://api.cryptonator.com/api/full/btc-usd')
req.send();