// listCard.js handles rendering of a single Pokémon list card for main list view

import { createFavoriteButton } from "./favoriteStar.js";
import pokemonDetailsModal from "./detailCard.js";

export function createListCard(pokeData) {
  const card = document.createElement("div");
  card.className =
    "border border-gray-200 p-4 w-48 text-center rounded shadow bg-white";

  const name = document.createElement("h2");
  name.textContent = pokeData.name;
  name.className = "text-lg font-bold capitalize mb-2";

  const num = document.createElement("p");
  num.textContent = `#${pokeData.id}`;
  num.className = "text-sm text-gray-600 mb-2";

  const img = document.createElement("img");
  img.src = pokeData.sprites.front_default;
  img.alt = pokeData.name;
  img.className = "mx-auto mb-2 w-32 h-32";

  const typesContainer = document.createElement("div");
  typesContainer.className = "flex justify-center gap-1 mt-1 mb-2";

  pokeData.types.forEach((typeInfo) => {
    const typeImg = document.createElement("img");
    typeImg.src = `https://raw.githubusercontent.com/duiker101/pokemon-type-svg-icons/master/icons/${typeInfo.type.name}.svg`;
    typeImg.alt = typeInfo.type.name;
    typeImg.title = typeInfo.type.name;
    typeImg.className = "w-6 h-6";
    typesContainer.appendChild(typeImg);
  });

  const favButton = createFavoriteButton(pokeData.id);
  favButton.classList.add("favorite-button");

  card.appendChild(favButton);
  card.appendChild(img);
  card.appendChild(name);
  card.appendChild(num);
  card.appendChild(typesContainer);

  card.addEventListener("click", (e) => {
    if (!e.target.classList.contains("favorite-button")) {
      pokemonDetailsModal(pokeData);
    }
  });

  return card;
}
