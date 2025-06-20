import pokemonDetailsModal from "./PokemonDetailsModal.js";

fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Something went wrong");
    }
    return response.json();
  })
  .then((data) => {
    const pokemonContainer = document.getElementById("pokemonContainer");

    data.results.forEach((pokemon) => {
      fetch(pokemon.url)
        .then((res) => res.json())
        .then((pokeData) => {
          const card = document.createElement("div");
          card.className =
            "border border-gray-300 p-4 w-40 text-center rounded shadow bg-white";

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

          card.appendChild(img);
          card.appendChild(name);
          card.appendChild(num);

          pokemonContainer.appendChild(card);

          // -------------------------Conni - more Deatils window Klick event--------------------------------------------

          card.addEventListener("click", (e) => {
            //here replace <placeholder> with your button variable name
            if (e.target !== "<placeholder>") {
              pokemonDetailsModal(pokeData);
            }
          });
          //close button remove element
          // -------------------------Conni - Over--------------------------------------------
        });
    });
  })
  .catch((error) => {
    console.error("Something went wrong:", error);
  });

// Search dialog Popup

const searchButton = document.getElementById("searchButton");
const searchInput = document.getElementById("search");
const pokemonPopup = document.getElementById("popup");
const pokemonPopupCon = document.getElementById("popupContent");

searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) {
    alert("Please enter a Pokémon name or number.");
    return;
  }

  fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      return response.json();
    })
    .then((data) => {
      pokemonPopupCon.innerHTML = "";
      console.log(data);
      const name = document.createElement("h2");
      name.textContent = data.name;
      name.className = "text-lg font-bold capitalize mb-2";
      const img = document.createElement("img");
      img.src = data.sprites.front_default;
      pokemonPopupCon.appendChild(img);
      pokemonPopupCon.appendChild(name);
      pokemonPopup.appendChild(pokemonPopupCon);
      pokemonPopup.classList.remove("hidden");
    })
    .catch((error) => {
      console.error(error);
      alert("Pokémon not found or error occurred.");
    });
});
const closeBtn = document.getElementById("closePopup");
closeBtn.addEventListener("click", () => {
  pokemonPopup.classList.add("hidden");
});
