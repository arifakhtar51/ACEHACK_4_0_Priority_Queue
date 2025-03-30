import "dotenv/config";
import express, { json } from "express";
import { connect, Schema, model } from "mongoose";
import cors from "cors";

// Initialize Express
const app = express();
app.use(cors());
app.use(json());

// Connect to MongoDB
connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Define Schemas
const SimpleSchema = new Schema({ data: String });
const collections = ["User", "Playlist", "Book", "CareerPath", "Question", "Other"];
const models = collections.reduce((acc, name) => {
  acc[name] = model(name, SimpleSchema);
  return acc;
}, {});

console.log("Models:", models); // Debugging: Log the models object

// Middleware to validate collection name
const validateCollection = (req, res, next) => {
  const { collection } = req.params;
  const collectionName = collection.charAt(0).toUpperCase() + collection.slice(1);

  console.log("Requested Collection:", collection); // Debugging: Log the requested collection
  console.log("Processed Collection Name:", collectionName); // Debugging: Log the processed collection name

  if (!models[collectionName]) {
    return res.status(400).json({ error: "Invalid collection name" });
  }

  req.collectionName = collectionName;
  next();
};

// New route to get data from all collections
app.get("/allcollections", async (req, res) => {
  try {
    const allData = {};
    
    // Use Promise.all to fetch data from all collections concurrently
    await Promise.all(
      collections.map(async (collectionName) => {
        const Model = models[collectionName];
        const data = await Model.find();
        allData[collectionName] = data;
      })
    );
    
    res.json(allData);
  } catch (error) {
    console.error("Error fetching all collections:", error);
    res.status(500).json({ error: "Error retrieving data from collections" });
  }
});

// Generic API to store data
app.post("/:collection", validateCollection, async (req, res) => {
  const { data } = req.body;

  if (!data) {
    return res.status(400).json({ error: "Data field is required" });
  }

  try {
    const Model = models[req.collectionName];
    const newData = new Model({ data });
    await newData.save();
    res.status(201).json(newData);
  } catch (error) {
    res.status(500).json({ error: "Error saving data" });
  }
});

// Generic API to get data from a specific collection
app.get("/:collection", validateCollection, async (req, res) => {
  try {
    const Model = models[req.collectionName];
    const data = await Model.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error retrieving data" });
  }
});

// Start the Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));