import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import { MoneyTransfer } from "../apis/api";
import { toast } from "sonner";

export const SendMoney = () => {
    const navigate = useNavigate()
    const [Money, setMoney] = useState(0);
    const [SearchParams] = useSearchParams()
    const [Sending, setSending] = useState(false);
    const AccountID = SearchParams.get("id")
    const Name = SearchParams.get("name")
    const DecodedName = atob(Name)
    const FullName = DecodedName.split("-")[0] + " " +  DecodedName.split("-")[1]

    const HandleTransfer = async () => {
      if(Sending)
          return;
      setSending(true);
  
      try {
        const res = await MoneyTransfer({
          amount: Money,
          to : AccountID
        });
        toast.success(res.data.message + FullName || "Transfer successful!");
        navigate('/dashboard')
      }
      catch (err) {
        console.error(err);
        toast.error(err.response?.data?.message || "Transfer failed!");
      }
      finally{
        setSending(false);
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
                <h5 class="text-md font-semibold text-center" >into { DecodedName.split("-")[0]}'s account</h5>
                </div>

                <div class="p-1 ">

                <div className="flex items-center space-x-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                      <span className="text-2xl text-white">{FullName[0].toUpperCase()}</span>
                    </div>

                    {/* Name + User ID in vertical column */}
                    <div className="flex flex-col">
                      <h3 className="text-2xl font-semibold">{FullName}</h3>
                      <span className="text-sm text-gray-500">
                        USER-ID: {AccountID.slice(-6)}
                      </span>
                    </div>
                  </div>
                <div class="space-y-4">
                    <div class="space-y-2">
                    <label class="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
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
                    
                    <button  class="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 hover:bg-green-700  text-white" onClick={HandleTransfer} 
                    disabled={Sending} >
                        {(Sending) ? "Transfering..." : "Intiate Transfer"}
                    </button>
                </div>
                
                </div>
                
        </div>
      </div>
    </div>
}