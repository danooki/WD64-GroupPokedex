// handles search input and shows detailCard

import detailCard from "./detailCard.js";

export default function setupSearchHandler() {
  const searchInput = document.getElementById("search");
  const searchButton = document.getElementById("searchButton");

  function handleSearch() {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) {
      alert("Please enter a Pokémon name or number.");
      return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Pokémon not found");
        }
        return response.json();
      })
      .then((data) => {
        detailCard(data); // opens the detailCard.js
      })
      .catch((error) => {
        console.error("Error fetching Pokémon:", error);
        alert("Pokémon not found or error occurred.");
      });
  }

  // searchButton activates handleSearch function.
  searchButton.addEventListener("click", handleSearch);

  // enter key can also call handleSearch function.
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  });
}
