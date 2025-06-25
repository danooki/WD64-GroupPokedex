// main.js focus on the layout
// main.js

import pokemonDetails from "./detailCard.js";
import { createListCard } from "./listCard.js";
import setupSearchHandler from "./searchHandler.js";

let allPokemonData = [];
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

          // -------------------------Conni - more Deatils window Klick event--------------------------------------------

          card.addEventListener("click", (e) => {
            //here replace <placeholder> with your button variable name

            pokemonDetails(pokeData);
          });
          //close button remove element
          // -------------------------Conni - Over--------------------------------------------
        });
    });
  })
  .catch((error) => console.error("Something went wrong:", error));

// Search behaviour
setupSearchHandler();
