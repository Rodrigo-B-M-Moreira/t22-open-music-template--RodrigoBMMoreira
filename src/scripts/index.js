import { applyInputRangeStyle } from "./inputRange.js";
import { fetchAlbums } from './api.js';
import { initThemeToggle } from './theme.js';

let allAlbums = [];

async function routine() {
  applyInputRangeStyle();
  initThemeToggle();
  allAlbums = await fetchAlbums(); 
  renderAlbums(allAlbums);
  setupPriceFilter();
}

routine();

function renderAlbums(albums) {
  const albumsList = document.querySelector('.albums__list');
  albumsList.innerHTML = '';

  if (albums.length === 0) {
    
    albumsList.innerHTML = `
      <li class="no-albums">
        <img src="./src/assets/no-results.png" alt="Nenhum álbum encontrado" />
        <p>Nenhum álbum disponível nesse preço.</p>
      </li>
    `;
    return;
  }

  albums.forEach(album => {
    const albumItem = document.createElement('li');
    albumItem.classList.add('album__option');

    const img = document.createElement('img');
    img.src = album.img;
    img.alt = `Capa do álbum ${album.title}`;

    const title = document.createElement('h2');
    title.classList.add('album__name');
    title.textContent = album.title;

    const infoDiv = document.createElement('div');
    infoDiv.classList.add('album__info');

    const artist = document.createElement('p');
    artist.classList.add('album__artist');
    artist.textContent = album.band;

    const genre = document.createElement('p');
    genre.classList.add('album__genre');
    genre.textContent = album.genre;

    infoDiv.appendChild(artist);
    infoDiv.appendChild(genre);

    const purchaseDiv = document.createElement('div');
    purchaseDiv.classList.add('album__purchase');

    const price = document.createElement('p');
    price.classList.add('album__price');
    price.textContent = `R$ ${parseFloat(album.price).toFixed(2).replace('.', ',')}`;

    const buyButton = document.createElement('button');
    buyButton.classList.add('buy__album');

    const buttonText = document.createElement('div');
    buttonText.classList.add('album-price__text');
    buttonText.textContent = 'Comprar';

    buyButton.appendChild(buttonText);
    purchaseDiv.appendChild(price);
    purchaseDiv.appendChild(buyButton);

    albumItem.appendChild(img);
    albumItem.appendChild(title);
    albumItem.appendChild(infoDiv);
    albumItem.appendChild(purchaseDiv);

    albumsList.appendChild(albumItem);
  });
}

function setupPriceFilter() {
  const input = document.querySelector("#preco");
  const priceLabel = document.querySelector(".filter__title b");

  input.addEventListener("input", () => {
    const selectedValue = parseFloat(input.value);
    priceLabel.textContent = `R$ ${selectedValue.toFixed(2).replace('.', ',')}`;

    const filteredAlbums = allAlbums.filter(album => parseFloat(album.price) <= selectedValue);
    renderAlbums(filteredAlbums);
  });
}
