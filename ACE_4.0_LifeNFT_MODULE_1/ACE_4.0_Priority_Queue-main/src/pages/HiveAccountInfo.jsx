import React, { useState, useEffect } from "react";
import HiveBlockInfo from "./HiveBlockInfo";
const HiveAccountInfo = ({ username }) => {
  const [account, setAccount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccount = async () => {
      try {
        const response = await fetch("https://api.hive.blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: "condenser_api.get_accounts",
            params: [[username]],
            id: 1,
          }),
        });

        const data = await response.json();
        if (data.result && data.result.length > 0) {
          const accountData = data.result[0];

          // Calculate Reputation
          const reputation = Math.max(
            (Math.log10(accountData.reputation) - 9) * 9 + 25,
            0
          ).toFixed(2);

          setAccount({
            name: accountData.name,
            reputation: reputation,
            balance: accountData.balance,
          });
        } else {
          setError("Account not found");
        }
      } catch (err) {
        setError(err.message);
      }
    };

    fetchAccount();
  }, [username]);

  return (
    <div>
      <h2>Hive Account Info</h2>
      {error ? (
        <p>Error: {error}</p>
      ) : account ? (
        <div>
          <p><strong>Username:</strong> {account.name}</p>
          <p><strong>Reputation:</strong> {account.reputation}</p>
          <p><strong>Balance:</strong> {account.balance}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default HiveAccountInfo;
