const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

// ✅ Connect to MongoDB (employees database)
mongoose.connect("mongodb://127.0.0.1:27017/employees", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected ✅"))
.catch(err => console.error("MongoDB connection error:", err));

// ✅ Define schema & model for "inventory" collection
const inventorySchema = new mongoose.Schema({
    name: String,
    quantity: Number,
    price: Number,
}, { collection: "inventory" });  // specify collection name

const Inventory = mongoose.model("Inventory", inventorySchema);

// ✅ Routes

// Get all inventory items
app.get("/inventory", async (req, res) => {
    const items = await Inventory.find();
    res.json(items);
});

// Add a new inventory item
app.post("/inventory", async (req, res) => {
    try {
        const item = new Inventory(req.body);
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update an item
app.put("/inventory/:id", async (req, res) => {
    try {
        const updatedItem = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete an item
app.delete("/inventory/:id", async (req, res) => {
    try {
        await Inventory.findByIdAndDelete(req.params.id);
        res.json({ message: "Item deleted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
