const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const characterResult = document.getElementById('characterResult');
let starWarsLibrary = []; // variable biblioteca

searchButton.addEventListener('click', () => {
  const searchText = searchInput.value.trim().toLowerCase();

  if (empityinput()) {
    return; // Si el campo está vacío, no continuar con la búsqueda
  }

  if (searchText.length > 0) {
    searchCharacter(searchText);
  } else {
    clearCharacterResult();
  }
});

function fetchStarWarsLibrary() {
  const apiUrl = 'https://swapi.dev/api/people/?format=json';

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      starWarsLibrary = data.results;
    })
    .catch((error) => console.log(error));
}

function searchCharacter(searchText) {
  const character = starWarsLibrary.find((character) => character.name.toLowerCase() === searchText);

  if (character) {
    fetchCharacterDetails(character);
  } else {
    displayCharacterNotFound();
  }
}

function fetchCharacterDetails(character) {
  const characterName = character.name;

  const characterImage = new Image();
  characterImage.src = `https://starwars-visualguide.com/assets/img/characters/${getCharacterId(character)}.jpg`;
  characterImage.alt = characterName;
  characterImage.style.width = '200px';
  characterImage.style.height = '200px';

  characterImage.addEventListener('load', () => {
    displayCharacter(characterName, characterImage);
  });

  characterImage.addEventListener('error', () => {
    displayCharacter(characterName, null);
  });
}

function getCharacterId(character) {
  const urlParts = character.url.split('/');
  return urlParts[urlParts.length - 2];
}

function clearCharacterResult() {
  characterResult.innerHTML = '';
}

function displayCharacter(characterName, characterImage) {
  characterResult.innerHTML = '';

  const characterNameElement = document.createElement('h2');
  characterNameElement.textContent = characterName;

  characterResult.appendChild(characterNameElement);

  if (characterImage) {
    characterResult.appendChild(characterImage);
  } else {
    characterResult.innerHTML += '<p>No se pudo cargar la imagen del personaje.</p>';
  }
}

function displayCharacterNotFound() {
  characterResult.innerHTML = '<p>Personaje no encontrado :(</p>';
}

function empityinput() {
  const text = searchInput.value.trim();
  if (text === "") {
    characterResult.innerHTML = '<p>Ingresa el nombre de un personaje de Star Wars</p>';
    return true; // Si está vacío, retorna true
  }
  return false; // Si no está vacío, retorna false
}

fetchStarWarsLibrary();


