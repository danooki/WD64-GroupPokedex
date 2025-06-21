// favoriteStar.js handles the fav button UI and appareance.
import { isFavorite, toggleFavorite } from "./favorite.js";

// returns a star <img> element with correct appearance and event handling
export function createFavoriteButton(pokemonId) {
  const btn = document.createElement("img");
  updateStarIcon(btn, pokemonId);

  btn.alt = "Favorite";
  btn.style.width = "24px";
  btn.style.height = "24px";
  btn.style.cursor = "pointer";

  btn.addEventListener("click", (e) => {
    e.stopPropagation(); // avoid triggering card/modal click
    const isFav = toggleFavorite(pokemonId);
    updateStarIcon(btn, pokemonId);
  });

  return btn;
}

function updateStarIcon(btn, pokemonId) {
  btn.src = isFavorite(pokemonId)
    ? "https://cdn-icons-png.flaticon.com/512/4208/4208420.png"
    : "https://cdn-icons-png.flaticon.com/512/4208/4208394.png";
}
