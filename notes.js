const NOTES_KEY = "pokemonNotes";

export function saveNote(pokemonId, note) {
  let notesObjectList = JSON.parse(localStorage.getItem(NOTES_KEY)) || [];
  const filteredNotesObjectList = notesObjectList.filter(
    (noteObject) => noteObject.id === pokemonId
  );

  if (filteredNotesObjectList.length < 1) {
    const newNoteObject = { id: pokemonId, note };
    const updatedNotesObjectList = [...notesObjectList, newNoteObject];
    localStorage.setItem(NOTES_KEY, JSON.stringify(updatedNotesObjectList));
  } else {
    if (isNoteChanged(pokemonId, note)) {
      const editedNotesList = notesObjectList.map((noteObject) => {
        if (noteObject.id === pokemonId) {
          return { ...noteObject, note };
        }
        return noteObject;
      });

      localStorage.setItem(NOTES_KEY, JSON.stringify(editedNotesList));
    }
  }
}

export function getNote(pokemonId) {
  const notesObjectList = localStorage.getItem(NOTES_KEY) || "[]";

  const parsedNotesObjectList = JSON.parse(notesObjectList);
  const filteredNotesObjectList = parsedNotesObjectList.filter(
    (noteObject) => noteObject.id === pokemonId
  );

  if (filteredNotesObjectList.length > 0) {
    return filteredNotesObjectList[0].note;
  }

  return "";
}

export function isNoteChanged(pokemonId, note) {
  let notesObjectList = JSON.parse(localStorage.getItem(NOTES_KEY)) || [];
  const filteredNotesObjectList = notesObjectList.filter(
    (noteObject) => noteObject.id === pokemonId
  );

  if (filteredNotesObjectList.length >= 0) {
    if (
      filteredNotesObjectList[0].note != note ||
      filteredNotesObjectList[0].node
    ) {
      return true;
    } else {
      return false;
    }
  }

  return false;
}
