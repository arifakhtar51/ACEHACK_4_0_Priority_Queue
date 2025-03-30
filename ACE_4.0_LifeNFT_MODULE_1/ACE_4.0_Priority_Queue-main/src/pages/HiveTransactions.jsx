import React, { useState, useEffect } from "react";
import { PrivateKey, Transaction } from "hive-tx";

const HiveTransactions = ({ username }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const fetchLifeNFTTransactions = async () => {
    if (!username) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://api.hive.blog`, {
        method: "POST",
        body: JSON.stringify({
          jsonrpc: "2.0",
          method: "condenser_api.get_account_history",
          params: [username, -1, 1000],
          id: 1,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (!data.result) {
        throw new Error("Failed to fetch transactions");
      }

      const nftTransactions = data.result
        .map(([_, trx]) => trx)
        .filter(trx => trx.op[0] === "custom_json" && trx.op[1].id === "life_nft")
        .map(trx => JSON.parse(trx.op[1].json));

      setTransactions(nftTransactions);
      setError(null);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError("Failed to fetch data from Hive blockchain.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (username) {
      fetchLifeNFTTransactions();
    }
  }, [username]);

  // Pagination logic
  const indexOfLastItem = page * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const paginate = (pageNumber) => setPage(pageNumber);

  return (
    <div className="bg-slate-800/60 backdrop-blur-md rounded-xl border border-slate-700/50 shadow-lg p-6 transition-all duration-300 hover:shadow-purple-500/10 hover:border-purple-500/20">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">LifeNFT Transaction History</h2>
          <button
            onClick={fetchLifeNFTTransactions}
            disabled={loading || !username}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {loading ? (
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            )}
            Refresh Transactions
          </button>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/40 text-red-400 px-4 py-3 rounded-lg mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        {transactions.length === 0 && !loading && !error ? (
          <div className="bg-slate-700/30 border border-slate-600/50 rounded-lg p-8 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-slate-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-slate-400">No LifeNFT transactions found for this account.</p>
            <button 
              onClick={fetchLifeNFTTransactions}
              className="mt-4 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              Refresh
            </button>
          </div>
        ) : (
          <>
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-slate-700 bg-slate-800/50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Donor ID</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Name</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Blood Type</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Amount</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">IPFS Hash</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Timestamp</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/50 bg-slate-800/20">
                      {currentTransactions.length > 0 ? (
                        currentTransactions.map((tx, index) => (
                          <tr key={index} className="hover:bg-slate-700/30 transition-colors">
                            <td className="px-4 py-3 text-sm text-white">{tx.donor_id}</td>
                            <td className="px-4 py-3 text-sm text-white">{tx.donor_name}</td>
                            <td className="px-4 py-3 text-sm text-white">{tx.blood_type}</td>
                            <td className="px-4 py-3 text-sm text-white">{tx.amount}</td>
                            <td className="px-4 py-3 text-sm text-white">
                              <div className="flex items-center">
                                <span className="truncate w-24" title={tx.ipfs_hash}>{tx.ipfs_hash}</span>
                                <button 
                                  onClick={() => navigator.clipboard.writeText(tx.ipfs_hash)}
                                  className="ml-2 text-blue-400 hover:text-blue-300"
                                  title="Copy IPFS hash"
                                >
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                  </svg>
                                </button>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-white">{new Date(tx.timestamp).toLocaleString()}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="px-4 py-8 text-center text-slate-400">No transactions to display</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-slate-400">
                      Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, transactions.length)} of {transactions.length} transactions
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => paginate(Math.max(1, page - 1))}
                        disabled={page === 1}
                        className="px-3 py-1 rounded-md bg-slate-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Previous
                      </button>
                      {[...Array(totalPages).keys()].map(number => (
                        <button
                          key={number + 1}
                          onClick={() => paginate(number + 1)}
                          className={`px-3 py-1 rounded-md ${
                            page === number + 1
                              ? 'bg-purple-600 text-white'
                              : 'bg-slate-700 text-white hover:bg-slate-600'
                          }`}
                        >
                          {number + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => paginate(Math.min(totalPages, page + 1))}
                        disabled={page === totalPages}
                        className="px-3 py-1 rounded-md bg-slate-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default HiveTransactions;