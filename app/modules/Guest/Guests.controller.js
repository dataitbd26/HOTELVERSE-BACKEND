// File: Guests.controller.js

import Guest from "./Guests.model.js";

// Get all guests
export async function getAllGuests(req, res) {
  try {
    const result = await Guest.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getSuperAdminGuests(req, res) {
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
        { phone: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { nationality: { $regex: search, $options: 'i' } },
      ];
    }

    // --- Execute Queries ---
    const [guests, totalGuests] = await Promise.all([
        Guest.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum),
        Guest.countDocuments(query)
    ]);
      
    res.status(200).json({
      data: guests,
      pagination: {
        totalDocuments: totalGuests,
        totalPages: Math.ceil(totalGuests / limitNum),
        currentPage: pageNum,
        limit: limitNum,
      },
    });

  } catch (err) {
    res.status(500).send({ error: "Server error fetching guest data: " + err.message });
  }
}

export async function getGuestById(req, res) {
  const id = req.params.id;
  try {
    const result = await Guest.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Guest not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export const getGuestsByBranch = async (req, res) => {
  const { branch } = req.params;
  try {
    const guests = await Guest.find({ branch });
    res.status(200).json(guests);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch guests", error: err.message });
  }
};

// Create a new guest
export async function createGuest(req, res) {
  try {
    const guestData = req.body;
    const result = await Guest.create(guestData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a guest by ID
export async function updateGuest(req, res) {
  const id = req.params.id;
  const guestData = req.body;
  try {
    const result = await Guest.findByIdAndUpdate(id, guestData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Guest not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a guest by ID
export async function removeGuest(req, res) {
  const id = req.params.id;
  try {
    const result = await Guest.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Guest deleted successfully" });
    } else {
      res.status(404).json({ message: "Guest not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
