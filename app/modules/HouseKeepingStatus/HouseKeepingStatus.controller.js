import HouseKeepingStatus from "./HouseKeepingStatus.model.js";

// Get all statuses
export async function getAllHouseKeepingStatuses(req, res) {
  try {
    const result = await HouseKeepingStatus.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getSuperAdminHouseKeepingStatuses(req, res) {
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
        { name: { $regex: search, $options: 'i' } },
        { colorCode: { $regex: search, $options: 'i' } },
      ];
    }

    // --- Execute Queries ---
    const [statuses, totalItems] = await Promise.all([
        HouseKeepingStatus.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum),
        HouseKeepingStatus.countDocuments(query)
    ]);
      
    res.status(200).json({
      data: statuses,
      pagination: {
        totalDocuments: totalItems,
        totalPages: Math.ceil(totalItems / limitNum),
        currentPage: pageNum,
        limit: limitNum,
      },
    });

  } catch (err) {
    res.status(500).send({ error: "Server error fetching status data: " + err.message });
  }
}

export async function getHouseKeepingStatusById(req, res) {
  const id = req.params.id;
  try {
    const result = await HouseKeepingStatus.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "House keeping status not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Create a new status
export async function createHouseKeepingStatus(req, res) {
  try {
    const statusData = req.body;
    const result = await HouseKeepingStatus.create(statusData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a status by ID
export async function updateHouseKeepingStatus(req, res) {
  const id = req.params.id;
  const statusData = req.body;
  try {
    const result = await HouseKeepingStatus.findByIdAndUpdate(id, statusData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "House keeping status not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a status by ID
export async function removeHouseKeepingStatus(req, res) {
  const id = req.params.id;
  try {
    const result = await HouseKeepingStatus.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "House keeping status deleted successfully" });
    } else {
      res.status(404).json({ message: "House keeping status not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
