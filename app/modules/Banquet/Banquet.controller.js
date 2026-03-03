// Banquet.controller.js
import Banquet from "./Banquet.model.js";

// Get all banquets with Pagination, Search, and Branch Filtering
export async function getAllBanquets(req, res) {
  try {
    const { page = 1, limit = 10, search = "", branch } = req.query;

    if (!branch) {
      return res.status(400).json({ error: "Branch is required" });
    }

    const query = { branch };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
      ];
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const totalDocuments = await Banquet.countDocuments(query);
    const data = await Banquet.find(query)
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

// Get banquet by ID
export async function getBanquetById(req, res) {
  const { id } = req.params;
  try {
    const result = await Banquet.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Banquet not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get banquets by branch (Helper route)
export const getBanquetsByBranch = async (req, res) => {
  const { branch } = req.params;
  try {
    const banquets = await Banquet.find({ branch });
    res.status(200).json(banquets);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch banquets", error: err.message });
  }
};

// Create a new banquet
export async function createBanquet(req, res) {
  try {
    const { name, capacity, branch } = req.body;
    
    const newBanquet = await Banquet.create({
      name,
      capacity,
      branch
    });

    res.status(201).json(newBanquet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Update a banquet by ID
export async function updateBanquet(req, res) {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const result = await Banquet.findByIdAndUpdate(
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
      res.status(404).json({ message: "Banquet not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Remove a banquet by ID
export async function removeBanquet(req, res) {
  const { id } = req.params;
  try {
    const result = await Banquet.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Banquet deleted successfully" });
    } else {
      res.status(404).json({ message: "Banquet not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}