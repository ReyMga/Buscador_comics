const root = document.getElementById('root');

const printData = data => {
    const pathNonFoundNowanted = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
    const pathNonFoundWanted = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_uncanny"
    let cajita = '';
    let arr = data.results;
    document.getElementById('quantity').innerText = data.total;
    arr.forEach(comic => {
        // console.log(comic);
        const {
            title,
            thumbnail: {
                extension,
                path
            },
            id
        } = comic;
        cajita += `<div class="column is-one-fifth" onclick="getId(${id})">
            <figure>
                <a>
                <img style='height: 320px; width: 210px' src="${path === pathNonFoundNowanted ? pathNonFoundWanted : path}.${extension}" alt="${title}">
                <p>${title}</p>
                </a>
            </figure>
            </div>`
        });
    root.innerHTML = cajita
}

const printDetailComic = arr => {
    let cajita = '';
    arr.forEach(comic => {
        const {
            thumbnail: {
                extension,
                path
            },
            title,
            description,
            dates,
            creators
        } = comic;
        const releaseDate = new Intl.DateTimeFormat('es-AR').format(new Date(dates ?.find(el => el.type === 'onsaleDate').date))
        const writer = creators ?.items ?.filter(el => el.role === 'writer')
        cajita += `<div class="columns">
      <div class="column is-one-quarter">
        <figure class="img-detalle">
          <img src="${path}.${extension}" alt="${title}">
        </figure>
      </div>
      <div class="column">
        <h3>${title}</h3>
        <h4>Publicado:</h4>
        <p>${releaseDate}</p>
        <h4>Guioniistas:</h4>
        <p>${writer ? writer[0]?.name : 'Sin informacion'}</p>
        <h4>Descripción:</h4>
        <p>${description}</p>
      </div>
    </div> `
    })
    root.innerHTML = cajita

}


//  nombre ? 'hola'