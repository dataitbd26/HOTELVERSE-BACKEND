import HouseKeeper from "./HouseKeepers.model.js";

// Get all house keepers
export async function getAllHouseKeepers(req, res) {
  try {
    const { 
        page = 1, 
        limit = 10, 
        branch 
    } = req.query;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    // --- Build Filter Query ---
    const query = {};
    
    // If a branch is provided in the query params, add it to the filter
    if (branch) {
      query.branch = branch; 
    }

    // --- Execute Queries ---
    const [houseKeepers, totalItems] = await Promise.all([
        HouseKeeper.find(query)
            .sort({ createdAt: -1 }) // Sorts newest first
            .skip(skip)
            .limit(limitNum),
        HouseKeeper.countDocuments(query)
    ]);
      
    res.status(200).json({
      data: houseKeepers,
      pagination: {
        totalDocuments: totalItems,
        totalPages: Math.ceil(totalItems / limitNum),
        currentPage: pageNum,
        limit: limitNum,
      },
    });

  } catch (err) {
    res.status(500).send({ error: "Server error fetching house keeper data: " + err.message });
  }
}



export async function getHouseKeeperById(req, res) {
  const id = req.params.id;
  try {
    const result = await HouseKeeper.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "House keeper not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// Create a new house keeper
export async function createHouseKeeper(req, res) {
  try {
    const keeperData = req.body;
    const result = await HouseKeeper.create(keeperData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a house keeper by ID
export async function updateHouseKeeper(req, res) {
  const id = req.params.id;
  const keeperData = req.body;
  try {
    const result = await HouseKeeper.findByIdAndUpdate(id, keeperData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "House keeper not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a house keeper by ID
export async function removeHouseKeeper(req, res) {
  const id = req.params.id;
  try {
    const result = await HouseKeeper.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "House keeper deleted successfully" });
    } else {
      res.status(404).json({ message: "House keeper not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
