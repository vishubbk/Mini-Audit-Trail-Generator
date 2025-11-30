import express from "express";
import DataModel from "../models/data.model.js";

const router = express.Router();

function getChanges(oldText, newText) {
  const oldWords = oldText.trim().split(/\s+/).filter(Boolean);
  const newWords = newText.trim().split(/\s+/).filter(Boolean);

  const addedWords = newWords.filter((w) => !oldWords.includes(w));
  const removedWords = oldWords.filter((w) => !newWords.includes(w));

  return {
    addedWords,
    removedWords,
    oldLength: oldText.length,
    newLength: newText.length
  };
}

// POST - Save version
router.post("/", async (req, res) => {
  try {

    const { text } = req.body;

    // Get previous saved version
    const lastVersion = await DataModel.findOne().sort({ _id: -1 });

    const oldText = lastVersion ? lastVersion.newText : "";

    const diff = getChanges(oldText, text);

    const newData = await DataModel.create({
      oldText,
      newText: text,
      ...diff,
    });

    res.status(201).json({ success: true, data: newData });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// GET - Fetch all versions
router.get("/", async (req, res) => {
  try {
    const history = await DataModel.find().sort({ createdAt: -1 });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
