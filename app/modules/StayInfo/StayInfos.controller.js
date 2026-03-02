// File: StayInfos.controller.js

import StayInfo from "./StayInfos.model.js";

// Get all stay infos
export async function getAllStayInfos(req, res) {
  try {
    const result = await StayInfo.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getSuperAdminStayInfos(req, res) {
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
        { room: { $regex: search, $options: 'i' } },
        { roomNo: { $regex: search, $options: 'i' } },
        { status: { $regex: search, $options: 'i' } },
        { branch: { $regex: search, $options: 'i' } },
      ];
    }

    // --- Execute Queries ---
    const [stayInfos, totalStayInfos] = await Promise.all([
        StayInfo.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum),
        StayInfo.countDocuments(query)
    ]);
      
    res.status(200).json({
      data: stayInfos,
      pagination: {
        totalDocuments: totalStayInfos,
        totalPages: Math.ceil(totalStayInfos / limitNum),
        currentPage: pageNum,
        limit: limitNum,
      },
    });

  } catch (err) {
    res.status(500).send({ error: "Server error fetching stay info data: " + err.message });
  }
}

export async function getStayInfoById(req, res) {
  const id = req.params.id;
  try {
    const result = await StayInfo.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "StayInfo not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export const getStayInfosByBranch = async (req, res) => {
  const { branch } = req.params;
  try {
    const stayInfos = await StayInfo.find({ branch });
    res.status(200).json(stayInfos);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stay infos", error: err.message });
  }
};

// Create a new stay info
export async function createStayInfo(req, res) {
  try {
    const stayInfoData = req.body;
    const result = await StayInfo.create(stayInfoData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a stay info by ID
export async function updateStayInfo(req, res) {
  const id = req.params.id;
  const stayInfoData = req.body;
  try {
    const result = await StayInfo.findByIdAndUpdate(id, stayInfoData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "StayInfo not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a stay info by ID
export async function removeStayInfo(req, res) {
  const id = req.params.id;
  try {
    const result = await StayInfo.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "StayInfo deleted successfully" });
    } else {
      res.status(404).json({ message: "StayInfo not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
