// BanquetSalesItem.controller.js
import BanquetSalesItem from "./BanquetSalesItem.model.js";

// Get all items with Pagination, Search, and Branch Filtering
export async function getAllBanquetSalesItems(req, res) {
  try {
    const { page = 1, limit = 10, search = "", branch } = req.query;

    if (!branch) {
      return res.status(400).json({ error: "Branch is required" });
    }

    const query = { branch };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } }
      ];
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const totalDocuments = await BanquetSalesItem.countDocuments(query);
    const data = await BanquetSalesItem.find(query)
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

// Get item by ID
export async function getBanquetSalesItemById(req, res) {
  const { id } = req.params;
  try {
    const result = await BanquetSalesItem.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Sales item not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Create a new item
export async function createBanquetSalesItem(req, res) {
  try {
    const { name, isActive, branch } = req.body;
    
    const newItem = await BanquetSalesItem.create({
      name,
      isActive,
      branch
    });

    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Update an item by ID
export async function updateBanquetSalesItem(req, res) {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const result = await BanquetSalesItem.findByIdAndUpdate(
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
      res.status(404).json({ message: "Sales item not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Remove an item by ID
export async function removeBanquetSalesItem(req, res) {
  const { id } = req.params;
  try {
    const result = await BanquetSalesItem.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Sales item deleted successfully" });
    } else {
      res.status(404).json({ message: "Sales item not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}