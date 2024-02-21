import http from "./httpService";
import config from "../utils/config.json";

const apiUrl = config.apiUrl;

export function getMovies() {
  return http.get("http://localhost:3900/api/movies");
}
export function deleteMovie(movieId) {
  return http.delete(apiUrl + `/movies/${movieId}`);
}
export function getMovie(movieId) {
  return http.get(apiUrl + `/movies/${movieId}`);
}
export function saveMovie(movie) {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(apiUrl + `/movies/${movie._id}`, body);
  }
  return http.post(apiUrl + "/movies", movie);
}
