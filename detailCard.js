// detailCard focus on the pop up card, or card with more information.

import { createFavoriteButton } from "./favoriteStar.js";

export default function pokemonDetailsModal(data) {
  const body = document.querySelector("body");
  //create outer container that takes up the whole site
  const outerContainer = document.createElement("div");
  outerContainer.className =
    "w-[100%] h-[100%] border-4 border-indigo-500 bg-gray-200/30 absolute top-0 ";

  //create the innerContainer
  const innerContainer = document.createElement("div");
  innerContainer.textContent = data.name;
  innerContainer.className =
    "w-[250px] h-[250px] border-4 border-red-800 bg-blue-800 fixed";
  outerContainer.appendChild(innerContainer);

  //Button
  const closeModalButton = document.createElement("button");
  closeModalButton.textContent = "X";
  closeModalButton.className =
    "text-4xl ml-[60%] border-4 border-red-800 py-5 px-5";
  innerContainer.appendChild(closeModalButton);

  //put everything in body
  body.appendChild(outerContainer);
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
}
