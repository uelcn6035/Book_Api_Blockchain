import express from "express";
import { getClient, getAccount } from "../config/config.js";
const router = express.Router();
router.get("/balance", async (_, res) => {
    try {
        const client = getClient();
        const account = getAccount();
        // Fetch account information
        const accountInfo = await client.accountInformation(account.addr).do();
        // Send balance (in Algos) as response
        res.json({ balance: accountInfo.amount / 1e6 });
    }
    catch (error) {
        console.error("Failed to fetch balance:", error);
        res.status(500).json({ error: "Failed to fetch balance" });
    }
});
export default router;
//# sourceMappingURL=configRoute.js.map