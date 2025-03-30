// import React, { useState } from "react";
// // import {hiveTx} from "hive-tx";
// // import * as hiveTx from "hive-tx";
// import { PrivateKey, Transaction } from "hive-tx";

import React, { useState } from "react";
import { PrivateKey, Transaction } from "hive-tx";

const BroadcastTransaction = () => {
  const [username, setUsername] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [broadcastStatus, setBroadcastStatus] = useState("");

  const broadcastTransaction = async () => {
    if (!username || !privateKey) {
      alert("Enter username and private key.");
      return;
    }

    try {
      const op = {
        id: "life_nft",
        json: JSON.stringify({
          donor_id: username,
          donor_name: "Test User",
          blood_type: "O+",
          amount: 500,
          ipfs_hash: "QmdHjH9m2ZLpX5SAUUHcbDLYCrjaktBAvNe337JAMFyf8w",
          timestamp: new Date().toISOString(),
        }),
        required_auths: [username],
        required_posting_auths: [],
      };

      const tx = new Transaction();
      tx.operations = [["custom_json", op]];
      tx.expiration = new Date(Date.now() + 60000).toISOString().slice(0, -5); // 1 min expiry

      const key = PrivateKey.from(privateKey);
      await tx.sign(key);
      const result = await tx.broadcast();

      setBroadcastStatus("Transaction broadcasted successfully!");
      console.log("Broadcast result:", result);
    } catch (error) {
      console.error("Broadcast error:", error);
      setBroadcastStatus("Failed to broadcast transaction.");
    }
  };

  return (
    <div>
      <h2>Broadcast LifeNFT Transaction</h2>
      <input
        type="text"
        placeholder="Enter Hive Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter Private Key"
        value={privateKey}
        onChange={(e) => setPrivateKey(e.target.value)}
      />
      <button onClick={broadcastTransaction}>Broadcast Transaction</button>
      <p>{broadcastStatus}</p>
    </div>
  );
};

export default BroadcastTransaction;
