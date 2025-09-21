import { useNavigate } from "react-router-dom"
import { getBalance } from "../apis/api";
import { useEffect,useState} from "react";

export function Balancebar(){
    const navigate = useNavigate();
    const Deposit = ()=>{
        navigate('/deposit')
    }

    const [Balance, setBalance] = useState(0);

    useEffect(() => {
    getBalance()
      .then((res) => {
        console.log("Balance fetched:", res.data.balance);
        setBalance(res.data.balance);
      })
      .catch((err) => console.error("Error fetching balance:", err));
  }, []);

    return <div>
        <div className="flex flex-col-2 justify-between h-max mt-6 max-w ml-2 mr-2">

            <div className="text-2xl  font-bold">
                Balance : <span className="text-green-600 pt-1"> ₹ {Balance.toFixed(2)} </span>
            </div>

            <div className="pt-0.5">
                <button className="bg-slate-700 hover:bg-slate-800  rounded-md w-50 border-black border-1">
                   <button onClick={Deposit} className="text-xl text-white font-semibold">
                    Deposit
                   </button>
                </button>
            </div>
        </div>
    </div>
}