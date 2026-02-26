import RoomCategory from "./RoomCategories.model.js";

// Get all room categories with Pagination, Search (including facility), and Branch Filtering
export async function getAllRoomCategories(req, res) {
  try {
    const { page = 1, limit = 10, search = "", branch } = req.query;

    if (!branch) {
      return res.status(400).json({ error: "Branch is required" });
    }

    const query = { branch };

    if (search) {
      query.$or = [
        { categoryName: { $regex: search, $options: "i" } },
        { facility: { $regex: search, $options: "i" } },
      ];
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const totalDocuments = await RoomCategory.countDocuments(query);
    const data = await RoomCategory.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);

    res.status(200).json({
      data,
      pagination: {
        totalDocuments,
        totalPages: Math.ceil(totalDocuments / limitNumber),
        currentPage: pageNumber,
        limit: limitNumber,
      },
    });
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

// Get room categories by branch (Helper route)
export const getRoomCategoriesByBranch = async (req, res) => {
  const { branch } = req.params;
  try {
    const roomCategories = await RoomCategory.find({ branch });
    res.status(200).json(roomCategories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch room categories", error: err.message });
  }
};

// Create a new room category (includes facility)
export async function createRoomCategory(req, res) {
  try {
    const { branch, categoryName, facility } = req.body;
    
    const newRoomCategory = await RoomCategory.create({
      branch,
      categoryName,
      facility
    });

    res.status(201).json(newRoomCategory);
  } catch (err) {
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
        runValidators: true
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