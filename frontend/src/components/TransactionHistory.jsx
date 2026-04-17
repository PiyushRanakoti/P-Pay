import { useEffect, useState } from "react";
import { getTransactionHistory } from "../apis/api";

export function TransactionHistory() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [pagination, setPagination] = useState({ total: 0, limit: 10, offset: 0 });

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async (offset = 0) => {
        setLoading(true);
        setError(null);
        try {
            const response = await getTransactionHistory(10, offset);
            setTransactions(response.data.transactions);
            setPagination({
                total: response.data.total,
                limit: response.data.limit,
                offset: response.data.offset
            });
        } catch (err) {
            console.error("Error fetching transactions:", err);
            setError("Failed to fetch transaction history");
        } finally {
            setLoading(false);
        }
    };

    const handleNextPage = () => {
        const nextOffset = pagination.offset + pagination.limit;
        if (nextOffset < pagination.total) {
            fetchHistory(nextOffset);
        }
    };

    const handlePrevPage = () => {
        const prevOffset = Math.max(0, pagination.offset - pagination.limit);
        fetchHistory(prevOffset);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + " " + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

 

    if (loading) {
        return <div className="text-center py-4 text-gray-600 text-lg">Loading transactions...</div>;
    }

    return (
        <div className="ml-2 mr-2">
            <div className="font-bold mt-6 ml-1 text-2xl mb-4 text-slate-700">
                Transaction History
            </div>

            {error && (
                <div className="bg-red-100 border-2 border-red-500 text-red-700 px-4 py-3 rounded mb-4 font-semibold">
                    {error}
                </div>
            )}

            {transactions.length === 0 ? (
                <div className="text-center py-8 text-gray-500 text-lg">
                    No transactions found
                </div>
            ) : (
                <>
                    
                    {/* Table */}
                    <div id="transaction-table" className="overflow-x-auto border border-slate-300 rounded-lg">
                        <table className="w-full">
                            <thead className="bg-slate-700 text-white">
                                <tr>
                                    <th className="px-4 py-3 text-left font-semibold">Type</th>
                                    <th className="px-4 py-3 text-left font-semibold">From / To</th>
                                    <th className="px-4 py-3 text-left font-semibold">Amount</th>
                                    <th className="px-4 py-3 text-left font-semibold">Date & Time</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {transactions.map((txn, idx) => (
                                    <tr key={idx} className="hover:bg-gray-50">
                                        <td className="px-4 py-3 text-sm">
                                            {txn.type === 'transfer' ? (
                                                <span className={`inline-block px-2 py-1 rounded text-xs font-semibold ${txn.isSender ? 'bg-red-600 text-white' : 'bg-green-600 text-white'}`}>
                                                    {txn.isSender ? 'Sent' : 'Received'}
                                                </span>
                                            ) : (
                                                <span className="inline-block px-2 py-1 rounded text-white text-xs font-semibold bg-blue-600">Deposit</span>
                                            )}
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            {txn.type === 'transfer' ?
                                                txn.isSender ?
                                                    <div>
                                                        <div className="font-semibold">{txn.receiverFirstName || 'Unknown'}</div>
                                                        <div className="text-xs text-gray-500">ID: {txn.receiverId}</div>
                                                    </div>
                                                    : <div>
                                                        <div className="font-semibold">{txn.senderFirstName || 'Unknown'}</div>
                                                        <div className="text-xs text-gray-500">ID: {txn.senderId}</div>
                                                    </div>
                                                : <div>
                                                    <div className="font-semibold">Self Deposit</div>
                                                    <div className="text-xs text-gray-500">ID: {txn.senderId}</div>
                                                </div>
                                            }
                                        </td>
                                        <td className="px-4 py-3 text-sm font-semibold">
                                            <span className={txn.isSender ? 'text-red-600' : 'text-green-600'}>
                                                {txn.isSender ? '-' : '+'}₹ {(typeof txn.amount === 'number' ? txn.amount : parseFloat(txn.amount)).toFixed(2)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-600">
                                            {formatDate(txn.timestamp)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-between items-center mt-6 mb-4">
                        <div className="text-sm text-gray-600 font-semibold">
                            Showing {Math.min(pagination.offset + 1, pagination.total)} to {Math.min(pagination.offset + pagination.limit, pagination.total)} of {pagination.total}
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={handlePrevPage}
                                disabled={pagination.offset === 0}
                                className="bg-slate-600 hover:bg-slate-700 text-white font-semibold px-3 py-2 rounded text-sm border-black border-1 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            <button
                                onClick={handleNextPage}
                                disabled={pagination.offset + pagination.limit >= pagination.total}
                                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-3 py-2 rounded text-sm border-black border-1 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
