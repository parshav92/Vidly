import http from "./httpService";
import config from "../utils/config.json";

export function getGenres() {
  return http.get(config.apiUrl + "/genres");
}
