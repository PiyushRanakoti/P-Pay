import { Link, useNavigate } from "react-router-dom";
import { getBalance } from "../apis/api";
import { useEffect, useState } from "react";
import { LuRefreshCw } from "react-icons/lu";

export function Balancebar() {
    const navigate = useNavigate();

    const [Balance, setBalance] = useState(0);
    const [loading, setLoading] = useState(false);

    const fetchBalance = async () => {
        try {
            setLoading(true);
            const res = await getBalance();
            setBalance(Number(res.data.balance));
        } catch (err) {
            console.error("Error fetching balance:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBalance();
    }, []);

    return (
        <div className="ml-2 mr-2 mt-6">
            <div className="bg-emerald-600 rounded-lg p-6 shadow-lg border-2 border-green-800">
                <div className="flex flex-col justify-between gap-4">
                    <div>
                        <div className="text-white text-sm font-semibold opacity-90">
                            Current Balance
                        </div>

                        <div className="text-4xl font-bold text-white mt-2 flex items-center gap-3">
                            ₹ {Balance.toFixed(2)}

                            <button onClick={fetchBalance} disabled={loading}>
                                <LuRefreshCw
                                    size={24}
                                    className={loading ? "spin" : ""}
                                />
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Link to={`/deposit`} className="flex-1">
                            <button className="w-full bg-white hover:bg-gray-100 text-green-700 font-bold py-2 px-4 rounded-md border-2 border-green-800 transition">
                                Deposit Money
                            </button>
                        </Link>

                        <Link to={`/history`} className="flex-1">
                            <button className="w-full bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-md border-2 border-slate-900 transition">
                                Transaction History
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}