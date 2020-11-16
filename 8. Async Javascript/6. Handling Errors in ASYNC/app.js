const fakeRequest = (url) => {
    return new Promise((resolve, reject) => {
        const rand = Math.random();
        setTimeout(() => {
            if (rand < 0.7) {
                resolve(`YOUR FAKE DATA FROM: ${url}`);
            }
            reject(`Request Error FOR: ${url}`);
        }, 1000)
    })
}

async function twoRequests (){
    try {
        let data1 = await fakeRequest('www.yelp.com/page1');
        console.log(data1);
        let data2 = await fakeRequest('www.yelp.com/page2');
        console.log(data2);    
    } catch (e) {
        console.log("Cought in Error: ", e);
    }
    
}