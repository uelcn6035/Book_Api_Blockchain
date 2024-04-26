// your config code
import algosdk from "algosdk";

const algodToken = "a".repeat(64);
const server = "http://localhost";
const port = "4001";

const mnemonic = "cycle judge beef gesture carry library sauce steel dog zoo mango eternal taxi obtain bring talent gauge custom monitor lonely law morning rack absorb favorite";

export function getClient(): algosdk.Algodv2 {
  let client = new algosdk.Algodv2(algodToken, server, port);
  return client;
}

export function getAccount(): algosdk.Account {
  let account = algosdk.mnemonicToSecretKey(mnemonic);
  return account;
}

// Test function to fetch and log the account balance
export async function logBalance() {
  const client = getClient();
  const account = getAccount();

  try {
    const accountInfo = await client.accountInformation(account.addr).do();
    console.log('Account balance:', accountInfo.amount / 1e6); // Convert microAlgos to Algos
  } catch (error) {
    console.error('Failed to fetch account balance:', error);
  }
}

// Call the test function
logBalance();
