const searchForm = document.querySelector('#formSearch');
const displayBody = document.querySelector('#showBody');

searchForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const tvSearchTerm = searchForm.elements.query.value;
    const config = {params: {q: tvSearchTerm}}
    const res = await axios.get(`http://api.tvmaze.com/search/shows`, config);
    removeResults();
    displaySearch(res.data);
    searchForm.elements.query.value = '';
})

const displaySearch = (shows) =>{
    for(let res of shows){
        if(res.show.image){
            const div1 = document.createElement('DIV');
            div1.classList.add('col', 'mb-4');
            const div2 = document.createElement('DIV');
            div2.classList.add('card');
            const img = document.createElement('IMG');
            img.src = res.show.image.medium;
            img.classList.add('card-img-top');
            div2.append(img);
            const div3 = document.createElement('DIV');
            div3.classList.add('card-body');
            const h5 = document.createElement('H5');
            h5.classList.add('card-title');
            h5.innerText = res.show.name;
            const p = document.createElement('p');
            p.classList.add('card-text');
            p.innerHTML = res.show.summary;
            h5.append(p);
            div3.append(h5);
            div2.append(div3);
            div1.append(div2);
            displayBody.append(div1);
        }
    }
}

const removeResults = ()=>{
    const shows = document.querySelectorAll('.col','.mb-4');
    for(let show of shows){
        show.remove();
    }
}