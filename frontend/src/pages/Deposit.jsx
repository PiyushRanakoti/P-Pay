import { useState } from "react";
import { DepoitMoney } from "../apis/api";
import { useNavigate } from "react-router-dom";

export const DepositMoney = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const [Deposit, setDeposit] = useState(false);

  const userDataString = sessionStorage.getItem("userData");
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const FirstName = userData?.firstname || "User";
  const LastName = userData?.lastname || "";
  const id = userData?.id || "";

  const HandleDeposit = async () => {
    if (Deposit) return;
    setDeposit(true);
    try {
      const res = await DepoitMoney({ amount });
      alert(res.data.message || "Deposit successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Deposit failed!");
    } finally {
      setDeposit(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-900 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center text-white mb-6">
          <div className="text-5xl font-extrabold">P-Pay 💸</div>
          <div className="text-sm font-medium mt-1 underline">Your dummy UPI App</div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-6 border-t-4 border-green-500">
          {/* User Info */}
          <div className="flex items-center space-x-4 bg-gray-50 p-3 rounded-md shadow-sm">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-2xl text-white font-bold">{FirstName[0].toUpperCase()}</span>
            </div>
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold">{`${FirstName} ${LastName}`}</h3>
              <span className="text-sm text-gray-500">USER-ID: {id.toString().slice(-6)}</span>
            </div>
          </div>

          {/* Title */}
          <div className="text-center space-y-1">
            <h2 className="text-3xl font-bold">Deposit Money</h2>
            <p className="text-md text-gray-600">into your account</p>
          </div>

          {/* Input */}
          <div className="space-y-4">
            <div className="flex flex-col space-y-1">
              <label htmlFor="amount" className="text-sm font-medium text-gray-700">
                Amount (in Rs)
              </label>
              <input
                type="number"
                id="amount"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full h-10 px-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-400 text-lg font-semibold"
              />
            </div>

            <button
              onClick={HandleDeposit}
              disabled={Deposit}
              className={`w-full h-10 rounded-md text-white font-semibold transition-colors ${
                Deposit ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {Deposit ? "Crediting Deposit..." : "Deposit Money"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
