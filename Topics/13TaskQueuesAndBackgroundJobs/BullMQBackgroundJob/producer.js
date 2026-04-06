import express from "express";
import { orderQueue } from "./queue.js";

const app = express();
app.use(express.json());

app.post("/order", async (req, res) => {
    const { product_name, product_price } = req.body;

    const order = {
        id: Date.now(),
        product_name,
        product_price
    };

    // 🔥 Push job to queue
    await orderQueue.add("generateInvoice", {
        orderId: order.id
    });

    res.json({
        success: true,
        message: "Order placed",
        order
    });
});

app.listen(3000, () => {
    console.log("Server running on 3000");
});