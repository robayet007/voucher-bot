import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI; // Vercel Environment Variable
let client;

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      if (!client) {
        client = new MongoClient(uri);
        await client.connect();
      }

      const { name, email, amount } = req.body;
      const db = client.db("voucherBotDB"); // DB name
      const collection = db.collection("payments");

      await collection.insertOne({
        name,
        email,
        amount,
        createdAt: new Date(),
      });

      res.status(200).json({ success: true, message: "Payment saved!" });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, message: "Only POST allowed" });
  }
}
