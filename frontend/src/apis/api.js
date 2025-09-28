import axios from "axios";

const API = axios.create({
    //  baseURL : 'http://localhost:5000/api/v1'               //for testing
    baseURL : 'https://p-pay.onrender.com/api/v1'        //for deployment
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

export const DepoitMoney = (data) =>{
  const token = sessionStorage.getItem("token")

  return API.put("/account/deposit", data, {
    headers: { authorization: `Bearer ${token}` },
  });

}

 




