// document.addEventListener("DOMContentLoaded", () => {
//   const searchButton = document.getElementById("searchButton");
//   const searchInput = document.getElementById("search");
//   const container = document.getElementById("pokemonContainer");

//   searchButton.addEventListener("click", () => {
//     const query = searchInput.value.trim().toLowerCase();

//     if (!query) {
//       alert("Please enter a name or number");
//       return;
//     }

//     fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Pokémon not found");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         container.innerHTML = "";

//         const card = document.createElement("div");
//         card.style.border = "1px solid #ccc";
//         card.style.padding = "10px";
//         card.style.width = "200px";
//         card.style.textAlign = "center";
//         card.style.marginTop = "20px";

//         const name = document.createElement("h2");
//         name.textContent = `#${data.id} - ${data.name}`;

//         const img = document.createElement("img");
//         img.src = data.sprites.front_default;
//         img.alt = data.name;

//         card.appendChild(name);
//         card.appendChild(img);
//         container.appendChild(card);
//       })
//       .catch((error) => {
//         container.innerHTML = `<p style="color: red;">${error.message}</p>`;
//       });
//   });
// });

// fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error("something went wrong");
//     }
//     return response.json();
//   })
//   .then((data) => {
//     const pokemonList = document.createElement("div");
//     data.results.forEach((pokemon) => {
//       const name = document.createElement("h2");
//       name.textContent = pokemon.name;
//       fetch(pokemon.url)
//         .then((res) => res.json())
//         .then((pokeData) => {
//           const card = document.getElementById("pokemonContainer");

//           const num = document.createElement("h2");
//           const img = document.createElement("img");
//           num.textContent = `#${pokeData.id}`;

//           img.src = pokeData.sprites.front_default;
//           card.appendChild(img);
//           card.appendChild(name);
//           card.appendChild(num);
//           pokemonList.appendChild(card);
//         });
//     });
//   })
//   .catch((error) => {
//     console.log("i can't do it for some reason", error);
//   })
//   .catch((error) => {
//     console.log("i can't do it for some reason", error);
//   });

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
        });
    });
  })
  .catch((error) => {
    console.error("Something went wrong:", error);
  });

// popup

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
