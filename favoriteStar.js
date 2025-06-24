// favoriteStar.js handles the fav button UI and appareance.
import { isFavorite, toggleFavorite } from "./favorite.js";

// returns a star <img> element with correct appearance and event handling
export function createFavoriteButton(pokemonId) {
  const btn = document.createElement("img");
  updateStarIcon(btn, pokemonId);

  btn.alt = "Favorite";
  btn.style.width = "32px";
  btn.style.height = "32px";
  btn.style.cursor = "pointer"; // changes to hand (called pointer)

  btn.addEventListener("click", (e) => {
    e.stopPropagation(); // avoid triggering card/modal click
    const isFav = toggleFavorite(pokemonId);
    updateStarIcon(btn, pokemonId);
  });

  return btn;
}

function updateStarIcon(btn, pokemonId) {
  const isFav = isFavorite(pokemonId);
  btn.src = isFav
    ? "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/512px-Pok%C3%A9_Ball_icon.svg.png" // yes
    : "https://images.icon-icons.com/2248/PNG/512/pokeball_icon_136305.png"; // empty

  btn.style.opacity = isFav ? "1" : "0.4"; // makes the empty version more gray - transparent.
}
