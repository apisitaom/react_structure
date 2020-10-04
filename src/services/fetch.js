import { apiurl } from "./config/apiurl";

export const Fetch = async (method = "POST", token, path, data = {}) => {
  try {
    const url = apiurl + path;
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Company-Token": `${token}`,
        Authorization: token !== "" ? `Bearer ${token}` : "",
      },
      method: method || "POST",
      body: method === "POST" ? JSON.stringify(data) : null,
    });
    const datas = await res.json();
    return datas;
  } catch (err) {
    console.log(err.msg);
    return err;
  }
};

export const FetchForm = async (method = "POST", token, path, data = {}) => {
  try {
    const url = apiurl + path;
    const res = await fetch(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
      method: method || "POST",
      body: method === "POST" ? data : null,
    });
    const datas = await res.json();
    console.log(datas);
    return datas;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};

export const FetchData = (method = "POST", token, path, data = {}) => {
  try {
    const url = apiurl + path;
    const res = fetch(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
      method: method || "POST",
      body: method === "POST" ? data : null,
    });
    const datas = res;
    console.log(datas);
    return datas;
  } catch (error) {
    console.log(error.message);
    return error;
  }
};
