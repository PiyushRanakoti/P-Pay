import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL
const TEST_URL = import.meta.env.VITE_TEST_URL

const API = axios.create({
  baseURL: BASE_URL              //for Deployment
  // baseURL : TEST_URL        //for testing
})



//---------------User Endpoints ------------------

export const signup = (data) => API.post("/user/signup", data);

export const signin = (data) => API.post("/user/signin", data);

export const getUsers = (filter = "") => API.get(`/user/bulk?filter=${filter}`);



//---------------Account Endpoints ------------------

export const MoneyTransfer = (data) => {
  const token = sessionStorage.getItem("token");

  return API.post("/account/transfer", data, {
    headers: { authorization: `Bearer ${token}` },
  });
};

export const getBalance = () => {
  const token = sessionStorage.getItem("token");

  return API.get("/account/balance", {
    headers: {
      authorization: `Bearer ${token}`
    }
  });
}

export const DepoitMoney = (data) => {
  const token = sessionStorage.getItem("token")

  return API.put("/account/deposit", data, {
    headers: { authorization: `Bearer ${token}` },
  });
}

export const getTransactionHistory = (limit = 50, offset = 0) => {
  const token = sessionStorage.getItem("token");

  return API.get("/account/history", {
    params: { limit, offset },
    headers: { authorization: `Bearer ${token}` }
  });
}

