// your config code
import algosdk from "algosdk";
const algodToken = "a".repeat(64);
const server = "http://localhost";
const port = "4001";
const mnemonic = "merit seed mandate soda wide lyrics scout help bus cram until deer victory robot enroll antenna possible hundred faith bread spin speed mixture abstract farm";
export function getClient() {
    let client = new algosdk.Algodv2(algodToken, server, port);
    return client;
}
export function getAccount() {
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
    }
    catch (error) {
        console.error('Failed to fetch account balance:', error);
    }
}
// Call the test function
logBalance();
//# sourceMappingURL=config.js.map