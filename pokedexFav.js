// pokedexFav.js load favorites from local Storage

// TO DO:
// load favorites from localStorage
// fetch Pokémon data using the stored IDs
// render each Pokémon individually

// log to confirm this script loaded
console.log("pokedexFav.js loaded");

// import functions to get favorites list and create the favorite star button
import { getFavorites } from "./favorite.js";
import { createListCard } from "./listCard.js";

// bring the container element where favorite Pokémon cards will be displayed
const container = document.getElementById("favoriteContainer");
// get the list of favorite Pokémon IDs from localStorage (or empty array if none)
const favorites = getFavorites() || [];
console.log("Favorites:", favorites); // show favorites in console for debugging

// if there are no favorites, display a message:
if (favorites.length === 0) {
  container.innerHTML =
    "<p class='text-center mt-10 text-xl'>No favorite Pokémon yet.</p>";
}

// For each favorite Pokémon ID, fetch data and render a card asynchronously
favorites.forEach(async (id) => {
  try {
    // Fetch full Pokémon data from the API using its ID
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokeData = await res.json();

    // Create a card container div for the Pokémon from listCard.js
    const card = createListCard(pokeData, container); // pass container to handle conditional removal
    container.appendChild(card);
  } catch (err) {
    console.error(`Failed to load Pokémon ID ${id}:`, err);
  }
});
