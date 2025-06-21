// pokedexFav.js load favorites from local Storage

// TO DO:
// load favorites from localStorage
// fetch Pokémon data using the stored IDs
// render each Pokémon as a list card, like in main.js

// log to confirm this script loaded
console.log("pokedexFav.js loaded");

// import functions to get favorites list and create the favorite star button
import { getFavorites } from "./favorite.js";
import { createFavoriteButton } from "./favoriteStar.js";

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

    // Create a card container div for the Pokémon <---- !!!!!! Perhaps the listCard should be an indie JS file?
    const card = document.createElement("div");
    card.className =
      "border border-gray-300 p-4 w-40 text-center rounded shadow bg-white relative";

    const name = document.createElement("h2");
    name.textContent = pokeData.name;
    name.className = "text-lg font-bold capitalize mb-2";

    const num = document.createElement("p");
    num.textContent = `#${pokeData.id}`;
    num.className = "text-sm text-gray-600 mb-2";

    const img = document.createElement("img");
    img.src = pokeData.sprites.front_default;
    img.alt = pokeData.name;
    img.className = "mx-auto mb-2";

    const favButton = createFavoriteButton(pokeData.id);
    favButton.classList.add("absolute", "top-2", "right-2");

    favButton.addEventListener("click", () => {
      setTimeout(() => {
        if (!getFavorites().includes(pokeData.id)) {
          card.remove();
          if (getFavorites().length === 0) {
            container.innerHTML =
              "<p class='text-center mt-10 text-xl'>No favorite Pokémon yet.</p>";
          }
        }
      }, 100);
    });

    // Append all elements into the card
    card.appendChild(favButton);
    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(num);

    // append the card into the main container on the page
    container.appendChild(card);
  } catch (err) {
    // If fetching data for a Pokémon fails, log the error but keep going
    console.error(`Failed to load Pokémon ID ${id}:`, err);
  }
});
