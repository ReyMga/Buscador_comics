const privada = 'd3eaae343e975512554412eb04d65d980d927b36';
const publica = '586b18cad7e0e9c211f61f8222f57401';
const timestamp = Date.now();

const hash = md5(timestamp + privada + publica);
const boton1 = document.getElementById('boton1');
const boton2 = document.getElementById('boton2');

let offset = 0;

// const url = `http://gateway.marvel.com/v1/public/comics?ts=${timestamp}&apikey=${publica}&hash=${hash}`;
// const url = `http://gateway.marvel.com/v1/public/comics?limit=20&offset=${offset}&ts=${timestamp}&apikey=${publica}&hash=${hash}`;

const fetchData = () => {
    const url = `http://gateway.marvel.com/v1/public/comics?limit=20&offset=${offset}&ts=${timestamp}&apikey=${publica}&hash=${hash}`;
    fetch(url)
        .then(response => response.json())
        .then(obj => printData(obj.data.results))
        .catch(error => console.error(error))
}

fetchData();

boton1.addEventListener('click', () => {
    offset -= 20;
    fetchData();
})
boton2.addEventListener('click', () => {
    offset += 20;
    fetchData();
})


const getId = id => {
    const url = `http://gateway.marvel.com/v1/public/comics/${id}?ts=${timestamp}&apikey=${publica}&hash=${hash}`;
    fetch(url)
        .then(resp => resp.json())
        .then(obj => printDetailComic(obj.data.results))
}