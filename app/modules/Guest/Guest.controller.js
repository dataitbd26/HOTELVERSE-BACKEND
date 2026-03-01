import Guest from "./Guest.model.js";

// Get all guests with Pagination, Search, and Branch Filtering
export async function getAllGuests(req, res) {
  try {
    const { page = 1, limit = 10, search = "", branch } = req.query;

    if (!branch) {
      return res.status(400).json({ error: "Branch is required" });
    }

    const query = { branch };

    if (search) {
      query.$or = [
        { guestName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { phoneNumber: { $regex: search, $options: "i" } },
        { idNumber: { $regex: search, $options: "i" } },
      ];
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const totalDocuments = await Guest.countDocuments(query);
    const data = await Guest.find(query)
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
    res.status(500).json({ error: "Internal server error retrieving guests." });
  }
}

// Get guest by ID
export async function getGuestById(req, res) {
  const { id } = req.params;
  try {
    const result = await Guest.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Guest not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error retrieving the guest." });
  }
}

// Create a new guest
export async function createGuest(req, res) {
  try {
    const guestData = req.body;
    
    if (!guestData.guestName || !guestData.branch) {
      return res.status(400).json({ error: "Guest name and branch are required fields." });
    }

    const result = await Guest.create(guestData);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Update a guest by ID
export async function updateGuest(req, res) {
  const { id } = req.params;
  const guestData = req.body;

  try {
    const result = await Guest.findByIdAndUpdate(id, guestData, {
      new: true,
      runValidators: true
    });

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Guest not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Remove a guest by ID
export async function removeGuest(req, res) {
  const { id } = req.params;
  try {
    const result = await Guest.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Guest deleted successfully" });
    } else {
      res.status(404).json({ message: "Guest not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}