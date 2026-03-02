import RemarkHouseKeeping from "./remarkHouseKeeping.model.js";

// Get all remarks with pagination, search, and branch filtering
export async function getAllRemarks(req, res) {
  try {
    const { page = 1, limit = 10, search = "", branch } = req.query;

    if (!branch) {
      return res.status(400).json({ error: "Branch is required" });
    }

    const query = { branch };

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { remark: { $regex: search, $options: "i" } },
      ];
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const totalDocuments = await RemarkHouseKeeping.countDocuments(query);
    const data = await RemarkHouseKeeping.find(query)
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
    res.status(500).json({ error: "Internal server error retrieving remarks." });
  }
}

// Get remark by ID
export async function getRemarkById(req, res) {
  try {
    const result = await RemarkHouseKeeping.findById(req.params.id);
    if (!result) return res.status(404).json({ error: "Remark not found" });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Internal server error retrieving the remark." });
  }
}

// Create a new remark
export async function createRemark(req, res) {
  try {
    const { name, remark, branch } = req.body;
    
    if (!name || !remark || !branch) {
      return res.status(400).json({ error: "Name, remark, and branch are required." });
    }

    const result = await RemarkHouseKeeping.create({ name, remark, branch });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: "Internal server error creating remark." });
  }
}

// Update remark by ID
export async function updateRemark(req, res) {
  try {
    const result = await RemarkHouseKeeping.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!result) return res.status(404).json({ error: "Remark not found" });
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Internal server error updating remark." });
  }
}

// Remove remark by ID
export async function removeRemark(req, res) {
  try {
    const result = await RemarkHouseKeeping.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: "Remark not found" });
    res.status(200).json({ message: "Remark deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal server error deleting remark." });
  }
}