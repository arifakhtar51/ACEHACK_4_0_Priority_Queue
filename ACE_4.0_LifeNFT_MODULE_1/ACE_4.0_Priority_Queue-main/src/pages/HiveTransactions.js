import React, { useState, useEffect } from 'react';
import { PINATA_API } from '../config/api';

export default function HiveTransactions({ username }) {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const transactionsPerPage = 5;

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://api.hive.blog', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'condenser_api.get_account_history',
            params: [username, -1, 1000],
            id: 1,
          }),
        });

        const data = await response.json();
        const nftTransactions = data.result
          .filter(tx => tx[1].op[0] === 'custom_json' && tx[1].op[1].id === 'life_nft')
          .map(tx => {
            const jsonData = JSON.parse(tx[1].op[1].json);
            return {
              donor_id: jsonData.donor_id,
              donor_name: jsonData.donor_name,
              blood_type: jsonData.blood_type,
              amount: jsonData.amount,
              timestamp: new Date(jsonData.timestamp).toLocaleString(),
              ipfs_hash: jsonData.ipfs_hash,
              imageUrl: `${PINATA_API.GATEWAY}/${jsonData.imageIpfsHash}`
            };
          })
          .reverse(); // Show newest transactions first

        setTransactions(nftTransactions);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (username) {
      fetchTransactions();
    }
  }, [username]);

  const totalPages = Math.ceil(transactions.length / transactionsPerPage);
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white mb-4">LifeNFT Transaction History</h3>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : transactions.length === 0 ? (
        <div className="text-center py-8 bg-slate-800/50 rounded-lg">
          <p className="text-slate-400">No transactions found</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-700/50">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Donor ID</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Name</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Blood Type</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">NFT Image</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-slate-400 uppercase">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {currentTransactions.map((tx, index) => (
                  <tr key={index} className="hover:bg-slate-800/30">
                    <td className="px-4 py-3 text-sm text-slate-300">{tx.donor_id}</td>
                    <td className="px-4 py-3 text-sm text-slate-300">{tx.donor_name}</td>
                    <td className="px-4 py-3">
                      <span className="bg-red-500/20 text-red-400 px-2 py-0.5 rounded text-sm font-medium">
                        {tx.blood_type}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-300">{tx.amount} ml</td>
                    <td className="px-4 py-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden">
                        <img 
                          src={tx.imageUrl} 
                          alt="NFT" 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = '/placeholder-nft.png'; // Add a placeholder image
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-300">{tx.timestamp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-2 mt-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 rounded-lg bg-slate-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-lg ${
                  currentPage === i + 1
                    ? 'bg-purple-500 text-white'
                    : 'bg-slate-700 text-white hover:bg-slate-600'
                } transition-colors`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 rounded-lg bg-slate-700 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-600 transition-colors"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
} 