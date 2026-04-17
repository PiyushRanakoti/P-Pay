import { useState, useRef, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MoneyTransfer } from "../apis/api";
import { toast } from "sonner";
import { LuArrowLeft } from "react-icons/lu";

export const SendMoney = () => {
  const navigate = useNavigate();
  const [Money, setMoney] = useState("");
  const [Sending, setSending] = useState(false);

  const inputRef = useRef(null);

  const [SearchParams] = useSearchParams();
  const AccountID = SearchParams.get("id");
  const Name = SearchParams.get("name");

  const DecodedName = atob(Name || "");
  const [first, last] = DecodedName.split("-");
  const FullName = `${first} ${last}`;

  // Auto focus input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const HandleTransfer = async () => {
    if (Sending) return;

    if (!Money || Number(Money) <= 0) {
      toast.error("Enter a valid amount");
      return;
    }

    setSending(true);

    try {
      const res = await MoneyTransfer({
        amount: Number(Money),
        to: AccountID,
      });

      toast.success(
        (res.data.message || "Transfer successful!") + " to " + FullName
      );
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Transfer failed!");
    } finally {
      setSending(false);
    }
  };

  // Enter key submit
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      HandleTransfer();
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-900 px-4">
      <div className="w-full max-w-md">

        {/* App Title */}
        <div className="text-white text-center mb-6">
          <div className="text-5xl font-extrabold">P-Pay 💸</div>
          <div className="text-sm font-medium mt-1 underline">
            Your dummy UPI App
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-lg shadow-lg p-6 space-y-6 border-t-4 border-green-500">

          {/* Header */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full hover:bg-gray-200 transition"
            >
              <LuArrowLeft size={20} />
            </button>

            <div className="flex items-center gap-3 flex-1">
              <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center shrink-0">
                <span className="text-lg text-white font-bold">
                  {FullName[0]?.toUpperCase()}
                </span>
              </div>

              <div className="leading-tight">
                <h3 className="text-base font-semibold">{FullName}</h3>
                <span className="text-xs text-gray-500">
                  USER-ID: {AccountID?.slice(-6)}
                </span>
              </div>
            </div>
          </div>

          {/* Title */}
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold">Send Money</h2>
            <p className="text-sm text-gray-600">
              to {first}'s account
            </p>
          </div>

          {/* Input */}
          <div className="space-y-4">
            <div className="flex flex-col space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Amount (in Rs)
              </label>
              <input
                ref={inputRef}
                type="number"
                placeholder="Enter amount"
                value={Money}
                onChange={(e) => setMoney(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full h-10 px-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-green-400 text-lg font-semibold"
              />
            </div>

            <button
              onClick={HandleTransfer}
              disabled={Sending}
              className={`w-full h-10 rounded-md text-white font-semibold transition ${
                Sending
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              {Sending ? "Transferring..." : "Initiate Transfer"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};