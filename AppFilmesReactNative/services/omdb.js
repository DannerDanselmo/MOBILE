const API_KEY = "1cd66749";
const BASE_URL = "https://www.omdbapi.com/";

export async function searchMovies(title = "spider man") {
  const url =
    `${BASE_URL}?s=${encodeURIComponent(title)}` +
    `&apikey=${API_KEY}&type=movie`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Não foi possível acessar a API.");
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "Nenhum filme encontrado.");
  }

  return data.Search || [];
}

export async function getMovieDetails(imdbID) {
  const url =
    `${BASE_URL}?i=${encodeURIComponent(imdbID)}` +
    `&apikey=${API_KEY}&plot=full`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Não foi possível acessar os detalhes.");
  }

  const data = await response.json();

  if (data.Response === "False") {
    throw new Error(data.Error || "Filme não encontrado.");
  }

  return data;
}
