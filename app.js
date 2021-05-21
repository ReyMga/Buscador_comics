/*********************************  CLAVES APIS  *******************************/
const privada = '7571c251b63059ab3613a97271f46a2486b43404';
const publica = 'f1dc4d30a170881cd2c79099b55295d3';
const timestamp = Date.now();

const hash = md5(timestamp + privada + publica);

/*********************************  DOM   *******************************/
const boton1 = document.getElementById('boton1');
const boton2 = document.getElementById('boton2');
const botonBuscar = document.getElementById('boton-buscar');
const paginaPrincipal = document.getElementById('paginaPrincipal');
const botonLastPage = document.getElementById('lastPage');

let offset = 0;
let resultsCount = 0;



//Pantalla principal 

const fetchData = () => {

    let busqueda = document.getElementById('input-busqueda');
    let tipo = document.getElementById('select-tipo');
    let orden = document.getElementById('select-orden');
    console.log(orden.value);


    let tipoUrl = 'comics';
    let nameUrl = '';
    let ordenUrl = '&orderBy=title'

    if(tipo.value.toUpperCase() !== 'COMICS'){
        tipoUrl = 'characters';
        ordenUrl = '&orderBy=name'
    }
    if (orden.value.toUpperCase() !== 'A/Z') {
        let baseUrlType = tipo.value.toUpperCase() === 'COMICS' ? 'title' : 'name'
        ordenUrl = orden.value.toUpperCase() === 'Z/A' ? `&orderBy=-${baseUrlType}` : 
                   orden.value.toUpperCase() === 'MÁS NUEVOS' ? `&orderBy=-focDate` : 
                   orden.value.toUpperCase() === 'MÁS VIEJOS' ? `&orderBy=focDate`:
                   '&orderBy=title'
    }
    if(busqueda.value !== ''){
        let baseUrlType = tipo.value.toUpperCase() === 'COMICS' ? 'title' : 'name'
        nameUrl = `&${baseUrlType}StartsWith=${busqueda.value}`;
    }

    
    const conditionUrl = (data)=>{
        let baseUrlType = tipo.value.toUpperCase() === 'COMICS' ? 'title' : 'name'
        if (baseUrlType === 'title') {
            printData(data)
        }
        if (baseUrlType === 'name') {
            printDataCharacter(data)
        }
    }

    const url = `https://gateway.marvel.com/v1/public/${tipoUrl}?limit=20&offset=${offset}&ts=${timestamp}&apikey=${publica}&hash=${hash}${ordenUrl}${nameUrl}`;
    console.log(url);

    loader('show');
    fetch(url)
        .then(response => response.json())
        .then(obj => {
            loader('hide'),
            resultsCount = obj.data.total;
            conditionUrl(obj.data)
            console.log(obj, 'aqui');
        })
        .catch(error => console.error(error))
}

fetchData();





/*********************************  FUNCIONALIDAD PAGINADO  *******************************/



boton1.addEventListener('click', () => {
    offset -= 20;
    fetchData();
})
boton2.addEventListener('click', () => {
    offset += 20;
    fetchData();
})
paginaPrincipal.onclick = () => {
    offset = 0
    fetchData()
}
botonLastPage.onclick = () => {
    const isExact = resultsCount % 20 === 0
    const pages = Math.floor(resultsCount / 20)
    offset = (isExact ? pages - 1 : pages) * 20
    fetchData()
}



//Segunda Pantalla
const goToDetail = async id => {
    const url = `https://gateway.marvel.com/v1/public/comics/${id}?ts=${timestamp}&apikey=${publica}&hash=${hash}`;
    const characterUrl = `https://gateway.marvel.com/v1/public/comics/${id}/characters?apikey=${publica}&ts=${timestamp}&hash=${hash}&offset=0`
    loader('show');
    let data = await myFetch(url);
    let character = await myFetch(characterUrl);
    loader('hide'),
    printDetailComic(data.data.results, character.data.results);
}


const myFetch = async (url) => {
    let response = await fetch(url);
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        //throw new Error(message);
        console.error(message);
    }
    const data = await response.json();
    return data;
}

//Tercer pantalla
const thirdScreenFunction = async id => {
    const url = `https://gateway.marvel.com/v1/public/characters/${id}?apikey=${publica}&ts=${timestamp}&hash=${hash}&offset=0`;
    const comicUrl = `https://gateway.marvel.com/v1/public/characters/${id}/comics?apikey=${publica}&ts=${timestamp}&hash=${hash}&offset=0`
    loader('show');
    let data = await myFetchPageThird(url);
    let comic = await myFetchPageThird(comicUrl);
    loader('hide'),
    thirdScreen(data.data.results, comic.data.results);
}


const myFetchPageThird = async (url) => {
    let response = await fetch(url);
    if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        //throw new Error(message);
        console.error(message);
    }
    const data = await response.json();
    return data;
}

function loader(action ) {
    if(action === 'show'){
    document.getElementById("loader").style.display = "";
    document.getElementById("cover-spin").style.display = "";
    }else{
        document.getElementById("loader").style.display = "none";
        document.getElementById("cover-spin").style.display = "none";
    }
}

