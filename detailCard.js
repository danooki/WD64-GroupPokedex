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
      const descriptionraw = species["flavor_text_entries"][4]["flavor_text"];
      const description = descriptionraw.replace(/\f/g, " ");

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
        "w-[70rem] h-[40rem] rounded-[4vw] fixed flex justify-around p-10";
      innerContainer.style.backgroundImage =
        "url(./src/pokemonCardBackground/4932198.jpg)";
      innerContainer.style.backgroundSize = "cover";
      innerContainer.style.backgroundPosition = "center";

      outerContainer.appendChild(innerContainer);

      //create more Divs

      const leftContainer = document.createElement("div");
      leftContainer.classList = "w-[50%] flex flex-col justify-around";
      innerContainer.appendChild(leftContainer);

      const rightContainer = document.createElement("div");
      rightContainer.classList =
        "w-[50%] flex flex-col justify-around items-center bg-rose-100/70 p-5 rounded-[1vw]";
      innerContainer.appendChild(rightContainer);

      //CLOSE BUTTON
      const closeModalButton = document.createElement("button");
      closeModalButton.textContent = "X";
      closeModalButton.className =
        "absolute top-12 right-12 text-xl border-2 border-white text-white rounded-full w-8 h-8 flex items-center justify-center hover:border-black hover:text-black hover:bg-violet-400";
      rightContainer.appendChild(closeModalButton);

      // NAME
      const pokemonName = document.createElement("h2");
      pokemonName.textContent = `${data.name}`;
      pokemonName.classList =
        "text-[3.5rem] uppercase font-semibold text-orange-950";
      rightContainer.appendChild(pokemonName);

      // TYPES
      const types = document.createElement("p");
      types.textContent = `${data.types[0].type.name}${
        data.types[1] ? "/" : ""
      }${data.types[1] ? data.types[1].type.name : ""}`;
      types.className = "text-orange-950 font-semibold";
      rightContainer.appendChild(types);

      // IMAGE

      const pokemonImg = new Image();
      pokemonImg.src = `${data.sprites.other["official-artwork"]["front_default"]}`;
      pokemonImg.classList = "h-50% w-50% ml-4";
      leftContainer.appendChild(pokemonImg);

      // SPECIES DESCRIPTION
      const descriptionText = document.createElement("p");
      descriptionText.textContent = `${description}`;
      descriptionText.className =
        "w-[60%] text-orange-950 font-semibold text-lg text-center";
      rightContainer.appendChild(descriptionText);

      //put everything in body
      body.appendChild(outerContainer);

      //FAVOURITE
      const favButton = createFavoriteButton(data.id); // brings fav button.
      leftContainer.appendChild(favButton); // creates fav button.

      // TEXTAREA
      const note = document.createElement("textarea");
      note.value = getNote(data.id);
      note.setAttribute("cols", "40");
      note.setAttribute("rows", "5");
      note.className =
        "w-[70%] bg-blue-200 rounded mt-8 p-4 text-orange-950 border-4 border-solid border-orange-950 hover:bg-violet-200";

      rightContainer.appendChild(note);

      // SAVE BUTTON LOGIC

      note.addEventListener("input", () => {
        if (isNoteChanged(data.id, note.value) || note.value == "") {
          saveNoteButton.removeAttribute("disabled");
        } else {
          saveNoteButton.setAttribute("disabled", true);
        }
      });

      // NOTE SAVE BUTTON
      const saveNoteButton = document.createElement("button");
      saveNoteButton.textContent = "SAVE";
      saveNoteButton.classList =
        "border-2 border-orange-950 p-2 rounded w-[70%] text-orange-950 font-semibold mb-8 hover:orange-950 hover:orange-950 hover:bg-violet-400 ";
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
