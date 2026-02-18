// File: RoomCategories.controller.js

import RoomCategory from "./RoomCategories.model.js";

// Get all room categories
export async function getAllRoomCategories(req, res) {
  try {
    const result = await RoomCategory.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get room category by ID
export async function getRoomCategoryById(req, res) {
  const id = req.params.id;
  try {
    const result = await RoomCategory.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "RoomCategory not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get room categories by branch
export const getRoomCategoriesByBranch = async (req, res) => {
  const { branch } = req.params;
  try {
    const roomCategories = await RoomCategory.find({ branch });
    res.status(200).json(roomCategories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch room categories", error: err.message });
  }
};

// Create a new room category
export async function createRoomCategory(req, res) {
  try {
    const roomCategoryData = req.body;
    const result = await RoomCategory.create(roomCategoryData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a room category by ID
export async function updateRoomCategory(req, res) {
  const id = req.params.id;
  const roomCategoryData = req.body;
  try {
    const result = await RoomCategory.findByIdAndUpdate(id, roomCategoryData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "RoomCategory not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a room category by ID
export async function removeRoomCategory(req, res) {
  const id = req.params.id;
  try {
    const result = await RoomCategory.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "RoomCategory deleted successfully" });
    } else {
      res.status(404).json({ message: "RoomCategory not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
