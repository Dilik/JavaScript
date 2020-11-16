const form = document.querySelector('#searchForm');

form.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const tvSearchTerm = form.elements.query.value;
    const config = {params: {q: tvSearchTerm}}
    const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
    removeResults();
    displaySearch(res.data);
    form.elements.query.value = '';
})

const displaySearch = (shows) =>{
    for (let result of shows){
        if(result.show.image){
            const img = document.createElement('IMG');
            img.src = result.show.image.medium;
            document.body.append(img);
        }
    }
}

const removeResults = ()=>{
    const images = document.querySelectorAll('img');
    for(let imgs of images){
        imgs.remove();
    }
}