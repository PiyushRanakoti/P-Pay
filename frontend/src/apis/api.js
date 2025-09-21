import axios from "axios";
import { useGetUserId } from './hook'


const API = axios.create({
    baseURL : "https://p-pay.onrender.com/api/v1"
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

export const getBalance = () =>{
    const token = sessionStorage.getItem("token");

    return API.get("/account/balance", {
            headers: {
            authorization: `Bearer ${token}`
            }
        });
}

 




