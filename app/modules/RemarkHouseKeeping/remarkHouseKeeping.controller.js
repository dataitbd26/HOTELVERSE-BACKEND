// remarkHouseKeeping.controller.js
import RemarkHouseKeeping from "./remarkHouseKeeping.model.js";

// Get all remarks
export async function getAllRemarks(req, res) {
  try {
    const result = await RemarkHouseKeeping.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get remark by ID
export async function getRemarkById(req, res) {
  const id = req.params.id;
  try {
    const result = await RemarkHouseKeeping.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Remark not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new remark
export async function createRemark(req, res) {
  try {
    const remarkData = req.body;
    const result = await RemarkHouseKeeping.create(remarkData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update remark by ID
export async function updateRemark(req, res) {
  const id = req.params.id;
  const remarkData = req.body;
  try {
    const result = await RemarkHouseKeeping.findByIdAndUpdate(id, remarkData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Remark not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove remark by ID
export async function removeRemark(req, res) {
  const id = req.params.id;
  try {
    const result = await RemarkHouseKeeping.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Remark deleted successfully" });
    } else {
      res.status(404).json({ message: "Remark not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
