import RoomCategory from "./RoomCategories.model.js";

// Get all room categories
export async function getAllRoomCategories(req, res) {
  try {
    const result = await RoomCategory.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get room category by ID
export async function getRoomCategoryById(req, res) {
  const { id } = req.params;
  try {
    const result = await RoomCategory.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Room category not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
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

// Create a new room category (Now expects branch, categoryName, and facility)
export async function createRoomCategory(req, res) {
  try {
    const { branch, categoryName, facility } = req.body;
    
    // Explicitly creating the object to ensure required fields are present
    const newRoomCategory = await RoomCategory.create({
      branch,
      categoryName,
      facility
    });

    res.status(201).json(newRoomCategory);
  } catch (err) {
    // Mongoose validation errors will be caught here
    res.status(400).json({ error: err.message });
  }
}

// Update a room category by ID
export async function updateRoomCategory(req, res) {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const result = await RoomCategory.findByIdAndUpdate(
      id, 
      updateData, 
      { 
        new: true, 
        runValidators: true // Ensures the update still follows schema rules (like required fields)
      }
    );

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Room category not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Remove a room category by ID
export async function removeRoomCategory(req, res) {
  const { id } = req.params;
  try {
    const result = await RoomCategory.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Room category deleted successfully" });
    } else {
      res.status(404).json({ message: "Room category not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}