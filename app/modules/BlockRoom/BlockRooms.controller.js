import BlockRoom from "./BlockRooms.model.js";

// Get all blocked rooms
export async function getAllBlockRooms(req, res) {
  try {
    const result = await BlockRoom.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getSuperAdminBlockRooms(req, res) {
  try {
    const { 
        page = 1, 
        limit = 10, 
        search = ''
    } = req.query;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    // --- Build Filter Query ---
    const query = {};
    if (search) {
      query.$or = [
        { roomNumber: { $regex: search, $options: 'i' } },
        { reason: { $regex: search, $options: 'i' } },
      ];
    }

    // --- Execute Queries ---
    const [blockRooms, totalBlockRooms] = await Promise.all([
        BlockRoom.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum),
        BlockRoom.countDocuments(query)
    ]);
      
    res.status(200).json({
      data: blockRooms,
      pagination: {
        totalDocuments: totalBlockRooms,
        totalPages: Math.ceil(totalBlockRooms / limitNum),
        currentPage: pageNum,
        limit: limitNum,
      },
    });

  } catch (err) {
    res.status(500).send({ error: "Server error fetching block room data: " + err.message });
  }
}

export async function getBlockRoomById(req, res) {
  const id = req.params.id;
  try {
    const result = await BlockRoom.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Block room not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export const getBlockRoomsByRoomNumber = async (req, res) => {
  const { roomNumber } = req.params;
  try {
    const blockRooms = await BlockRoom.find({ roomNumber });
    res.status(200).json(blockRooms);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch block rooms", error: err.message });
  }
};

// Create a new blocked room
export async function createBlockRoom(req, res) {
  try {
    const blockRoomData = req.body;
    const result = await BlockRoom.create(blockRoomData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a blocked room by ID
export async function updateBlockRoom(req, res) {
  const id = req.params.id;
  const blockRoomData = req.body;
  try {
    const result = await BlockRoom.findByIdAndUpdate(id, blockRoomData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Block room not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a blocked room by ID
export async function removeBlockRoom(req, res) {
  const id = req.params.id;
  try {
    const result = await BlockRoom.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Block room deleted successfully" });
    } else {
      res.status(404).json({ message: "Block room not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
