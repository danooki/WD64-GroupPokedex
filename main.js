// main.js focus on the layout
// main.js

import { createListCard } from "./listCard.js";
import setupSearchHandler from "./searchHandler.js";

fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
  .then((response) => {
    if (!response.ok) throw new Error("Something went wrong");
    return response.json();
  })
  .then((data) => {
    const pokemonContainer = document.getElementById("pokemonContainer");

    data.results.forEach((pokemon) => {
      fetch(pokemon.url)
        .then((res) => res.json())
        .then((pokeData) => {
          const card = createListCard(pokeData);
          pokemonContainer.appendChild(card);
        });
    });
  })
  .catch((error) => console.error("Something went wrong:", error));

// Search behaviour
setupSearchHandler();
