import Room from "./Rooms.model.js";

// Get all rooms with Pagination, Search, and Branch Filtering
export async function getAllRooms(req, res) {
  try {
    const { page = 1, limit = 10, search = "", branch } = req.query;

    if (!branch) {
      return res.status(400).json({ error: "Branch is required" });
    }

    const query = { branch };

    // Case-insensitive search on Room Name or Category
    if (search) {
      query.$or = [
        { roomName: { $regex: search, $options: "i" } },
        { roomCategory: { $regex: search, $options: "i" } },
      ];
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const totalDocuments = await Room.countDocuments(query);
    const data = await Room.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);

    // Strictly matching the { data, pagination } structure expected by the frontend
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

// Get room by ID
export async function getRoomById(req, res) {
  const { id } = req.params;
  try {
    const result = await Room.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get rooms by branch (Helper route)
export const getRoomsByBranch = async (req, res) => {
  const { branch } = req.params;
  try {
    const rooms = await Room.find({ branch });
    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch rooms", error: err.message });
  }
};

// Create a new room
export async function createRoom(req, res) {
  try {
    const { branch, roomName, roomCategory, bookingStatus, person, rate, roomSituation, roomPhoto } = req.body;
    
    const newRoom = await Room.create({
      branch,
      roomName,
      roomCategory,
      bookingStatus,
      person,
      rate,
      roomSituation,
      roomPhoto
    });

    res.status(201).json(newRoom);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Update a room by ID
export async function updateRoom(req, res) {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const result = await Room.findByIdAndUpdate(
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
      res.status(404).json({ message: "Room not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Remove a room by ID
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