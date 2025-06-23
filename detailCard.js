// detailCard focus on the pop up card, or card with more information.

import { createFavoriteButton } from "./favoriteStar.js";

//-----------------------------------------------------------------------------------------------

export default function pokemonDetailsModal(data) {
  const id = data.id;

  //fetch the pokemon description
  fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`)
    .then((res) => {
      return res.json();
    })
    .then((species) => {
      console.log(species);
      const description = species["flavor_text_entries"][4]["flavor_text"];

      //------------------------------------------------------------------------------------
      const body = document.querySelector("body");
      //create outer container that takes up the whole site
      const outerContainer = document.createElement("div");
      outerContainer.className =
        "w-[100%] h-screen border-4 border-indigo-500 bg-gray-200/30 fixed top-0 flex justify-center items-center";

      //----------------------------------------------------------------------------------

      //create the innerContainer
      const innerContainer = document.createElement("div");
      innerContainer.className =
        "w-[70vw] h-[60vh] border-4 border-red-800 bg-blue-800 fixed ";
      outerContainer.appendChild(innerContainer);

      // NAME
      const pokemonName = document.createElement("h2");
      pokemonName.textContent = `${data.name}`;
      innerContainer.appendChild(pokemonName);

      // TYPES
      const types = document.createElement("p");
      types.textContent = `${data.types[0].type.name}${
        data.types[1] ? "/" : ""
      }${data.types[1] ? data.types[1].type.name : ""}`;
      pokemonName.appendChild(types);

      // IMAGE

      const pokemonImg = new Image();
      pokemonImg.src = `${data.sprites.other["official-artwork"]["front_default"]}`;
      pokemonImg.classList = "h-[20rem]";
      types.appendChild(pokemonImg);

      // SPECIES DESCRIPTION
      const descriptionText = document.createElement("p");
      descriptionText.textContent = `${description}`;
      innerContainer.appendChild(descriptionText);

      //Button
      const closeModalButton = document.createElement("button");
      closeModalButton.textContent = "X";
      closeModalButton.className =
        "text-4xl ml-[60%] border-4 border-red-800 py-5 px-5";
      innerContainer.appendChild(closeModalButton);

      //put everything in body
      body.appendChild(outerContainer);
      //
      const favButton = createFavoriteButton(data.id); // brings fav button.
      innerContainer.appendChild(favButton); // creates fav button.

      //Event listeners to close the Modal
      closeModalButton.addEventListener("click", (e) => {
        outerContainer.remove();
      });

      outerContainer.addEventListener("click", (e) => {
        if (e.target === e.currentTarget) {
          outerContainer.remove();
        }
      });
    });
}
