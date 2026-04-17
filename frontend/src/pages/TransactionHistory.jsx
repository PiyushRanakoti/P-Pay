import { useNavigate } from "react-router-dom";
import { Topbar } from "../components/topbar";
import { TransactionHistory } from "../components/TransactionHistory";

export function TransactionHistoryPage() {
    const navigate = useNavigate();

    return (
        <div>
            <Topbar />
            <div className="ml-2 mr-2 mt-2">
                <button
                    onClick={() => navigate("/dashboard")}
                    className="bg-slate-600 hover:bg-slate-700 text-white font-semibold px-2 py-1 rounded text-sm border-black border-1"
                >
                    ← Back
                </button>
            </div>
            <div className="pt-2 pb-8">
                <TransactionHistory />
            </div>
        </div>
    );
}
