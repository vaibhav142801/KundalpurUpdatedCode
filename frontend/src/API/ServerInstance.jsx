import { backendApiUrl } from "../config/config";

let token = "";
if (sessionStorage.getItem("token")) {
  token = sessionStorage.getItem("token");
}
let headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
};

export const serverInstance = (path, method = "get", payload, token) => {
  return new Promise((resolve, reject) => {
    let fetchOptions = {
      method,
      headers,
    };
    if (payload) fetchOptions.body = JSON.stringify(payload);
    fetch(backendApiUrl + path, fetchOptions)
      .then((res) => resolve(res.json()))
      .catch((err) => reject(err));
  });
};
