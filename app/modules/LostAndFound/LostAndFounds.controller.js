import LostAndFound from "./LostAndFounds.model.js";

// Get paginated lost and found items (with search and branch filter)
export async function getPaginatedLostAndFounds(req, res) {
  try {
    const { 
        page = 1, 
        limit = 10, 
        search = '',
        branch
    } = req.query;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    // --- Build Filter Query ---
    const query = {};
    
    if (branch) {
      query.branch = branch;
    }

    if (search) {
      query.$or = [
        { "itemDetail.room": { $regex: search, $options: 'i' } },
        { "itemDetail.item": { $regex: search, $options: 'i' } },
        { "itemDetail.foundedBy": { $regex: search, $options: 'i' } },
        { "claimDetail.claimedBy": { $regex: search, $options: 'i' } },
        { "returnDetail.returnTo": { $regex: search, $options: 'i' } },
      ];
    }

    // --- Execute Queries ---
    const [lostAndFounds, totalItems] = await Promise.all([
        LostAndFound.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum),
        LostAndFound.countDocuments(query)
    ]);
      
    res.status(200).json({
      data: lostAndFounds,
      pagination: {
        totalDocuments: totalItems,
        totalPages: Math.ceil(totalItems / limitNum),
        currentPage: pageNum,
        limit: limitNum,
      },
    });

  } catch (err) {
    res.status(500).send({ error: "Server error fetching lost and found data: " + err.message });
  }
}

export async function getLostAndFoundById(req, res) {
  const id = req.params.id;
  try {
    const result = await LostAndFound.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Lost and found item not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new lost and found item
export async function createLostAndFound(req, res) {
  try {
    const itemData = req.body;
    const result = await LostAndFound.create(itemData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a lost and found item by ID
export async function updateLostAndFound(req, res) {
  const id = req.params.id;
  const itemData = req.body;
  try {
    const result = await LostAndFound.findByIdAndUpdate(id, itemData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Lost and found item not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a lost and found item by ID
export async function removeLostAndFound(req, res) {
  const id = req.params.id;
  try {
    const result = await LostAndFound.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Lost and found item deleted successfully" });
    } else {
      res.status(404).json({ message: "Lost and found item not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}