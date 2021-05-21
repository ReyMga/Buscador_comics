const root = document.getElementById("root");

const printData = (data) => {
  const pathNonFoundNowanted =
    "https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
  const pathNonFoundWanted =
    "https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_uncanny";
  let cajita = "";
  let arr = data.results;
  document.getElementById("quantity").innerText = data.total;
  arr.forEach((comic) => {
    // console.log(comic);
    const {
      title,
      thumbnail: { extension, path },
      id,
    } = comic;
    cajita += `<div class="column is-one-fifth" onclick="goToDetail(${id})">
            <figure class="imgClass">
                <a>
                <img style='height: 320px; width: 210px' src="${
                  path === pathNonFoundNowanted ? pathNonFoundWanted : path
                }.${extension}" alt="${title}">
                <p>${title}</p>
                </a>
            </figure>
            </div>`;
  });
  root.innerHTML = cajita;
};

//Segunda pantalla
const printDetailComic = (arr, arrCharacter) => {
  document.getElementById("resultSection").style.display = "none";
  document.getElementById("resultCount").style.display = "none";
  let cajita = "";
  let comic = arr[0];
  //arr.forEach(comic => {
  const {
    thumbnail: { extension, path },
    title,
    description,
    dates,
    creators,
  } = comic;
  const releaseDate = new Intl.DateTimeFormat("es-AR").format(
    new Date(dates?.find((el) => el.type === "onsaleDate").date)
  );
  const writer = creators?.items?.filter((el) => el.role === "writer");
  cajita += `
        <div class="columns" id="columns">
            <div class="column is-one-quarter">
                <figure class="img-detalle">
                    <img src="${path}.${extension}" alt="${title}">
                </figure>
            </div>
            <div class="column">
                <h3>${title}</h3>
                <br>
                <h4>Publicado:</h4>
                <p>${releaseDate}</p>
                <br>
                <h4>Guionistas:</h4>
                <p>${writer ? writer[0]?.name : "Sin informacion"}</p>
                <br>
                <h4>Descripción:</h4>
                <p>${description}</p>
            </div>
        </div>`;
  //})
  root.innerHTML = cajita;

  if (arrCharacter.length > 0) {
    cajita = `
        <div class="resultados">  
            <h2 class="titulo-personajes">PERSONAJES</h2>
            <p class="resultados-personajes">
                <span class="total-personaje" id="resultado-personaje">
                ${arrCharacter.length} RESULTADOS 
                </span>
            </p>
            <br>
            <br>
        </div>
        `;
  } else {
    cajita = `
        <div class="resultados">  
            <h2 class="titulo-personajes">PERSONAJES</h2>
            <p class="resultados-personajes">
                <span class="total-personaje" id="resultado-personaje">
                0 RESULTADOS
                </span>
            </p>
            <p class="sinResultados"> No se han encontrado resultados</p>
            <br>
            <br>
        </div>
        `;
  }

  arrCharacter.forEach((character) => {
    const {
      thumbnail: { extension, path },
      name,
      id,
    } = character;

    cajita += `
            <div class="respuestas" onclick="thirdScreenFunction(${id})">
                <div tabindex="0" class="personaje">      
                    <a class="imagenPersonaje-container" id="personaje">
                        <img src="${
                          path + "." + extension
                        }" alt="" class="tamañoImagen" />
                    </a>

                    <a class="container-titulo-imagen">
                        <h3 class="personaje-nombre">${name}</h3>
                    </a>
                </div>
            </div>
        `;
  });
  root.innerHTML += cajita + "</div>";
};

//Tercer pantalla
const thirdScreen = (arr, dataComics) => {
  let arrComics = dataComics.results;
  document.getElementById("resultSection").style.display = "none";
  document.getElementById("resultCount").style.display = "none";
  let cajita = "";
  let total = dataComics.total;

  arr.forEach((character) => {
    const {
      thumbnail: { extension, path },
      name,
      description,
    } = character;

    cajita += `
        <div class="columns" id="columns">
            <div class="column is-one-quarter">
                <figure class="img-detalle">
                    <img src="${path}.${extension}">
                </figure>
            </div>
            <div class="column">
                <h3 class="titleName">${name}</h3>
                <br>
                <h4>Descripción:</h4>
                <p>${description}</p>
            </div>
        </div>`;
  });
  root.innerHTML = cajita;

  cajita = `
        <div class="resultados">  
            <h2 class="titulo-personajes">COMICS</h2>
            <p class="resultados-personajes">
                <span class="total-personaje" id="resultado-personaje">
                ${total} RESULTADOS 
                </span>
            </p>
            <br>
            <br>
            </div>
            `;

  arrComics.forEach((comic) => {
    const {
      thumbnail: { extension, path },
      title,
      id
    } = comic;
    cajita += `
            
            <div class="respuestas" onclick="goToDetail(${id})" >
            <div tabindex="0" class="personaje">      
                <a class="imagenPersonaje-container" id="personaje">
                    <img src="${
                      path + "." + extension
                    }" alt="" class="tamañoImagen" />
                </a>

                <a class="container-titulo-imagen">
                    <h3 class="personaje-nombre">${title}</h3>
                </a>
            </div>
            </div>
        `;
  });
  root.innerHTML += cajita + "</div>";
};


