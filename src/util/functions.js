export const filterText = text => {
  return text
    .replace(/[0-9`~!@#$%^&*()_|+\-=?;:'",.<>”“\{\}\[\]\\\/]/gi, "")
    .toLowerCase()
    .split(" ")
    .map(text => text.charAt(0).toUpperCase() + text.substring(1))
    .join(" ")
    .replace("  ", " ");
};

export const msgText = (text, msg) => {
  msg.current.innerHTML = text;
  msg.current.style.display = "block";
  msg.current.style.opacity = "1";
  setTimeout(() => {
    try {
      msg.current.style.opacity = "0";
      msg.current.style.display = "table-column-group";
    } catch (error) {}
  }, 4000);
};

export const validator = async (movies, ref, editMovie) => {
  if (ref.title.current.value === "") return { error: "Title can't be empty!" };
  else if (
    !editMovie &&
    movies.filter(itm => itm.Title === ref.title.current.value).length > 0
  )
    return { error: "Movie with same title already exist!" };
  else if (ref.year.current.value === "")
    return { error: "Year can't be empty!" };
  else if (isNaN(ref.year.current.value))
    return { error: "Year must be a number!" };
  else if (ref.runtime.current.value === "")
    return { error: "Runtime can't be empty!" };
  else if (isNaN(ref.runtime.current.value))
    return { error: "Runtime must be a number!" };
  else if (ref.genre.current.value === "")
    return { error: "Genre can't be empty!" };
  else if (ref.director.current.value === "")
    return { error: "Director can't be empty!" };
  else if (editMovie) {
    const key = editMovie.imdbID;
    const editedMovieData = movies.filter(itm => itm.imdbID === key)[0];
    editedMovieData.Title = filterText(ref.title.current.value);
    editedMovieData.Year = ref.year.current.value;
    editedMovieData.Runtime =
      ref.runtime.current.value.replace("min", "") + " min";
    editedMovieData.Genre = ref.genre.current.value;
    editedMovieData.Director = ref.director.current.value;
    return editedMovieData;
  } else {
    return {
      imdbID: Math.random()
        .toString(36)
        .substring(7),
      Title: filterText(ref.title.current.value),
      Year: ref.year.current.value,
      Runtime: ref.runtime.current.value.replace("min", "") + " min",
      Genre: ref.genre.current.value,
      Director: ref.director.current.value
    };
  }
};
