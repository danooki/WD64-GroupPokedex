// sortHandler.js sorts fetched Pokémon by name or number

import { createListCard } from "./listCard.js";

// this function sets up the sort dropdown listener
export default function setupSortHandler(
  pokemonData,
  containerId = "pokemonContainer"
) {
  const sortSelect = document.getElementById("sort-select");
  const container = document.getElementById(containerId);

  sortSelect.addEventListener("change", () => {
    const sortBy = sortSelect.value;

    // clone and sort the array
    const sorted = [...pokemonData].sort((a, b) => {
      if (sortBy === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "number") {
        return a.id - b.id;
      }
    });

    // Clear container and re-render cards
    container.innerHTML = "";
    sorted.forEach((pokeData) => {
      const card = createListCard(pokeData);
      container.appendChild(card);
    });
  });
}
