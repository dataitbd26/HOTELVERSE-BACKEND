import Unit from "./Units.model.js";

// Get all units with Pagination, Search, and Branch Filtering
export async function getAllUnits(req, res) {
  try {
    const { page = 1, limit = 10, search = "", branch } = req.query;

    if (!branch) {
      return res.status(400).json({ error: "Branch is required" });
    }

    const query = { branch };

    // Case-insensitive search on Unit Name
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
      ];
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const totalDocuments = await Unit.countDocuments(query);
    const data = await Unit.find(query)
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

export async function getSuperAdminUnits(req, res) {
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
        { branch: { $regex: search, $options: 'i' } },
      ];
    }

    // --- Execute Queries ---
    const [units, totalUnits] = await Promise.all([
        Unit.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum),
        Unit.countDocuments(query)
    ]);
      
    res.status(200).json({
      data: units,
      pagination: {
        totalDocuments: totalUnits,
        totalPages: Math.ceil(totalUnits / limitNum),
        currentPage: pageNum,
        limit: limitNum,
      },
    });

  } catch (err) {
    res.status(500).send({ error: "Server error fetching unit data: " + err.message });
  }
}

export async function getUnitById(req, res) {
  const id = req.params.id;
  try {
    const result = await Unit.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Unit not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export const getUnitsByBranch = async (req, res) => {
  const { branch } = req.params;
  try {
    const units = await Unit.find({ branch });
    res.status(200).json(units);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch units", error: err.message });
  }
};

// Create a new unit
export async function createUnit(req, res) {
  try {
    const { name, branch } = req.body;
    const result = await Unit.create({ name, branch });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a unit by ID
export async function updateUnit(req, res) {
  const id = req.params.id;
  const unitData = req.body;
  try {
    const result = await Unit.findByIdAndUpdate(id, unitData, {
      new: true,
      runValidators: true
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Unit not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a unit by ID
export async function removeUnit(req, res) {
  const id = req.params.id;
  try {
    const result = await Unit.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Unit deleted successfully" });
    } else {
      res.status(404).json({ message: "Unit not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}