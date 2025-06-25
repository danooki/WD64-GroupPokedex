// main.js focus on fetching the list of pokemon and adding them into cards.

import pokemonDetailsModal from "./detailCard.js";
import { createListCard } from "./listCard.js";
import setupSearchHandler from "./searchHandler.js";
import setupSortHandler from "./sortHandler.js";

// store all fetched Pokémon data (if needed elsewhere)
let allPokemonData = [];

fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
  .then((response) => {
    if (!response.ok) throw new Error("Something went wrong");
    return response.json();
  })
  .then(async (data) => {
    const pokemonContainer = document.getElementById("pokemonContainer");

    // map the list of Pokémon to an array of fetch promises
    const fetches = data.results.map((pokemon) =>
      fetch(pokemon.url).then((res) => res.json())
    );

    // wait for all fetches to finish in parallel
    const pokemonDataArray = await Promise.all(fetches);

    // sort the full data array by Pokémon ID to ensure correct order
    pokemonDataArray.sort((a, b) => a.id - b.id);

    // save for global use if needed
    allPokemonData = pokemonDataArray;

    // render the cards in order
    pokemonDataArray.forEach((pokeData) => {
      const card = createListCard(pokeData);
      pokemonContainer.appendChild(card);

      // enable sort dropdown
      setupSortHandler(allPokemonData);
    });
  })

  .catch((error) => console.error("Something went wrong:", error));

// search behaviour
setupSearchHandler();
