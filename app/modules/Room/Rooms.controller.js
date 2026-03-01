import Room from "./Rooms.model.js";
import RoomCategory from "../RoomCategory/RoomCategories.model.js";

// Get all rooms with Pagination, Search, Dropdown Filtering, and Category Population
export async function getAllRooms(req, res) {
  try {
    const { page = 1, limit = 10, search = "", category = "", branch } = req.query;

    if (!branch) {
      return res.status(400).json({ error: "Branch is required" });
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const query = { branch };

    // --- Dropdown Filter ---
    // If a specific category is selected from the dropdown, filter by its ObjectId
    if (category) {
      query.roomCategory = category;
    }

    // --- Search Input Filter ---
    // Advanced search: Look up matching category names first, then search rooms
    if (search) {
      const matchingCategories = await RoomCategory.find({
        categoryName: { $regex: search, $options: "i" },
        branch
      }).select("_id");
      
      const categoryIds = matchingCategories.map((cat) => cat._id);

      query.$or = [
        { roomName: { $regex: search, $options: "i" } },
        { roomCategory: { $in: categoryIds } },
      ];
    }

    const [data, totalDocuments] = await Promise.all([
      Room.find(query)
        .populate("roomCategory", "categoryName") // Populate category data
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limitNumber),
      Room.countDocuments(query),
    ]);

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
    res.status(500).json({ error: "Server error fetching rooms: " + err.message });
  }
}

export async function getRoomById(req, res) {
  const { id } = req.params;
  try {
    const result = await Room.findById(id).populate("roomCategory", "categoryName");
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export const getRoomsByBranch = async (req, res) => {
  const { branch } = req.params;
  try {
    const rooms = await Room.find({ branch }).populate("roomCategory", "categoryName");
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch rooms", error: err.message });
  }
};

export async function createRoom(req, res) {
  try {
    const { branch, roomName, roomCategory, bookingStatus, roomSituation, roomPhoto } = req.body;
    
    const newRoom = await Room.create({
      branch,
      roomName,
      roomCategory,
      bookingStatus,
      roomSituation,
      roomPhoto
    });

    // Populate category immediately for frontend response
    const populatedRoom = await Room.findById(newRoom._id).populate("roomCategory", "categoryName");

    res.status(201).json(populatedRoom);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateRoom(req, res) {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const result = await Room.findByIdAndUpdate(
      id, 
      updateData, 
      { new: true, runValidators: true }
    ).populate("roomCategory", "categoryName");

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function removeRoom(req, res) {
  const { id } = req.params;
  try {
    const result = await Room.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Room deleted successfully" });
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}