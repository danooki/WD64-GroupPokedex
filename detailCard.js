// detailCard focus on the pop up card, or card with more information.

import { createFavoriteButton } from "./favoriteStar.js";
import { saveNote, getNote, isNoteChanged } from "./notes.js";

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
        "w-[70rem] h-[40rem] rounded-[4vw] bg-blue-800 fixed flex justify-between p-10";
      outerContainer.appendChild(innerContainer);

      //create more Divs

      const leftContainer = document.createElement("div");
      leftContainer.classList = "w-[33%] flex flex-col";
      innerContainer.appendChild(leftContainer);

      const middleContainer = document.createElement("div");
      middleContainer.classList = "w-[33%] flex flex-col justify-center";
      innerContainer.appendChild(middleContainer);

      const rightContainer = document.createElement("div");
      rightContainer.classList = "w-[33%] flex flex-col justify-between";
      innerContainer.appendChild(rightContainer);

      // NAME
      const pokemonName = document.createElement("h2");
      pokemonName.textContent = `${data.name}`;
      pokemonName.classList = "text-[3.5rem]";
      middleContainer.appendChild(pokemonName);

      // TYPES
      const types = document.createElement("p");
      types.textContent = `${data.types[0].type.name}${
        data.types[1] ? "/" : ""
      }${data.types[1] ? data.types[1].type.name : ""}`;
      leftContainer.appendChild(types);

      // IMAGE

      const pokemonImg = new Image();
      pokemonImg.src = `${data.sprites.other["official-artwork"]["front_default"]}`;
      pokemonImg.classList = "h-[50%]";
      middleContainer.appendChild(pokemonImg);

      //Button
      const closeModalButton = document.createElement("button");
      closeModalButton.textContent = "X";
      closeModalButton.className =
        "text-4xl ml-[60%] border-4 border-red-800 py-5 px-5";
      rightContainer.appendChild(closeModalButton);

      // SPECIES DESCRIPTION
      const descriptionText = document.createElement("p");
      descriptionText.textContent = `${description}`;
      rightContainer.appendChild(descriptionText);

      //put everything in body
      body.appendChild(outerContainer);

      //FAVOURITE
      const favButton = createFavoriteButton(data.id); // brings fav button.
      leftContainer.appendChild(favButton); // creates fav button.

      // TEXTAREA
      const note = document.createElement("textarea");
      note.value = getNote(data.id);
      rightContainer.appendChild(note);

      note.addEventListener("input", () => {
        if (isNoteChanged(data.id, note.value) || note.value == "") {
          saveNoteButton.removeAttribute("disabled");
        } else {
          saveNoteButton.setAttribute("disabled", true);
        }
      });

      // NOTE button
      const saveNoteButton = document.createElement("button");
      saveNoteButton.textContent = "save";
      saveNoteButton.classList = "border-2 border-black";
      rightContainer.appendChild(saveNoteButton);

      saveNoteButton.addEventListener("click", (e) => {
        e.preventDefault();
        saveNote(data.id, note.value);
      });

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
