import axios from "axios";
import { toast } from "react-toastify";
import logger from "./logService";

const http = {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    logger.log(error);
    toast("An unexpected error occurred.");
  }
  return Promise.reject(error);
});

export default http;
