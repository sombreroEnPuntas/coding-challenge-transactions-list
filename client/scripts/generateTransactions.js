const { parseEther } = require("ethers");
const fetch = require("node-fetch");

const addresses = [
  "0x90F8bf6A479f320ead074411a4B0e7944Ea8c9C1",
  "0xFFcf8FDEE72ac11b5c542428B35EEF5769C409f0",
  "0x22d491Bde2303f2f43325b2108D26f1eAbA1e32b",
  "0xE11BA2b4D45Eaed5996Cd0823791E0C93114882d",
  "0xd03ea8624C8C5987235048901fB614fDcA89b117",
  "0x95cED938F7991cd0dFcb48F0a06a40FA1aF46EBC",
  "0x3E5e9111Ae8eB78Fe1CC3bb8915d5D461F3Ef9A9",
  "0x28a8746e75304c0780E011BEd21C72cD78cd535E",
  "0xACa94ef8bD5ffEE41947b4585a84BdA5a3d3DA6E",
  "0x1dF62f291b2E969fB0849d99D9Ce41e2F137006e",
  "0x610Bb1573d1046FCb8A70Bbbd395754cD57C2b60",
  "0x855FA758c77D68a04990E992aA4dcdeF899F654A",
  "0xfA2435Eacf10Ca62ae6787ba2fB044f8733Ee843",
  "0x64E078A8Aa15A41B85890265648e965De686bAE6",
  "0x2F560290FEF1B3Ada194b6aA9c40aa71f8e95598",
  "0xf408f04F9b7691f7174FA2bb73ad6d45fD5d3CBe",
  "0x66FC63C2572bF3ADD0Fe5d44b97c2E614E35e9a3",
  "0xF0D5BC18421fa04D0a2A2ef540ba5A9f04014BE3",
  "0x325A621DeA613BCFb5B1A69a7aCED0ea4AfBD73A",
  "0x3fD652C93dFA333979ad762Cf581Df89BaBa6795",
];

const randomEth = () => {
  const min = 0.5;
  const max = 10;
  const random = Math.random() * (max - min) + min;
  return parseEther(random.toString());
};

const saveTransactionToDatabase = async (transaction) => {
  const query = `
    mutation AddTransaction($transaction: TransactionInput!) {
      addTransaction(transaction: $transaction) {
        hash
      }
    }
  `;

  const variables = {
    transaction: {
      gasLimit:
        (transaction.gasLimit && transaction.gasLimit.toString()) || "0",
      gasPrice:
        (transaction.gasPrice && transaction.gasPrice.toString()) || "0",
      to: transaction.to,
      from: transaction.from,
      value: (transaction.value && transaction.value.toString()) || "",
      data: transaction.data || null,
      chainId:
        (transaction.chainId && transaction.chainId.toString()) || "123456",
      hash: transaction.hash,
    },
  };

  const response = await fetch("http://localhost:4000/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables }),
  });

  const responseData = await response.json();

  // You can add some error handling here based on the response
  return responseData;
};

(async () => {
  for (let i = 1; i < 20; i++) {
    try {
      const receipt = {
        to: addresses[i],
        from: addresses[0],
        value: randomEth(),
        hash: "0x" + i,
      };

      await saveTransactionToDatabase(receipt);
    } catch (error) {
      //
    }
  }
})();
