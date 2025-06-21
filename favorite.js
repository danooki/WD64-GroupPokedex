// favorite.js only handles storage and logic: getFavorites, toggleFavorite, etc.

import { createFavoriteButton } from "./favoriteStar.js";

const FAVORITES_KEY = "pokemonFavorites";

export function getFavorites() {
  const favs = localStorage.getItem(FAVORITES_KEY);
  return favs ? JSON.parse(favs) : [];
}

export function saveFavorites(favorites) {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}

export function isFavorite(id) {
  return getFavorites().includes(id);
}

export function toggleFavorite(id) {
  let favorites = getFavorites();
  if (favorites.includes(id)) {
    favorites = favorites.filter((favId) => favId !== id);
  } else {
    favorites.push(id);
  }
  saveFavorites(favorites);
  return favorites.includes(id); // return new state
}
