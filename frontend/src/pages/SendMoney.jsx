import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import { MoneyTransfer } from "../apis/api";

export const SendMoney = () => {
    const navigate = useNavigate()
    const [Money, setMoney] = useState(0);
    const [SearchParams] = useSearchParams()
    const AccountID = SearchParams.get("id")
    const Name = SearchParams.get("name")
    const FullName = Name.split("-")[0] + " " +  Name.split("-")[1]

    const HandleTranser = async () => {
    try {
      const res = await MoneyTransfer({
        amount: Money,
        to : AccountID
      });
      alert(res.data.message + FullName || "Transfer successful!");
      navigate('/dashboard')
    }
    catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Transfer failed!");
    }
  }

    return <div class="flex justify-center h-screen bg-green-900">
        <div className="h-full flex flex-col justify-center">
   
           <div className="text-white text-center py-3 w-full">
        <div className="text-5xl font-extrabold pl-4">      P-Pay 💸
    </div>
    <div className="text-sm font-medium mt-1 text-white underline pb-4">Your dummy UPI App</div> 
  </div>
            <div class="border h-min text-card-foreground max-w-md p-4 space-y-4 w-96 bg-white shadow-lg rounded-lg"
            >
                <div class="flex flex-col pt-2">
                <h2 class="text-3xl font-bold text-center">Send Money</h2>
                <h5 class="text-md font-semibold text-center" >into User's account</h5>
                </div>

                <div class="p-1 ">
                <div class="flex items-center space-x-4">
                    <div class="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                    <span class="text-2xl text-white">{Name[0].toUpperCase()}</span>
                    </div>
                    <h3 class="text-2xl font-semibold ">{FullName }</h3>
                </div>
                <div class="space-y-4">
                    <div class="space-y-2">
                    <label class="text-sm font-large leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        for="amount">
                        Amount (in Rs)
                    </label>
                    <input type="number"
                        class="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-xl font-semibold"
                        id="amount"
                        placeholder="Enter amount"
                        onChange={(e)=>{
                            setMoney(e.target.value)
                        }}/>
                    </div>
                    
                    <button  class="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 hover:bg-green-700  text-white" onClick={HandleTranser} >
                        Initiate Transfer
                    </button>
                </div>
                </div>
        </div>
      </div>
    </div>
}