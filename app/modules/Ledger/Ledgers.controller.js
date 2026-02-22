import Ledger from "./Ledgers.model.js";

// Get all ledgers
export async function getAllLedgers(req, res) {
  try {
    const result = await Ledger.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getSuperAdminLedgers(req, res) {
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
        { ledger: { $regex: search, $options: 'i' } },
        { groupUnder: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
      ];
    }

    // --- Execute Queries ---
    const [ledgers, totalLedgers] = await Promise.all([
        Ledger.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum),
        Ledger.countDocuments(query)
    ]);
      
    res.status(200).json({
      data: ledgers,
      pagination: {
        totalDocuments: totalLedgers,
        totalPages: Math.ceil(totalLedgers / limitNum),
        currentPage: pageNum,
        limit: limitNum,
      },
    });

  } catch (err) {
    res.status(500).send({ error: "Server error fetching ledger data: " + err.message });
  }
}

export async function getLedgerById(req, res) {
  const id = req.params.id;
  try {
    const result = await Ledger.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Ledger not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export const getLedgersByBranch = async (req, res) => {
  const { branch } = req.params;
  try {
    const ledgers = await Ledger.find({ branch });
    res.status(200).json(ledgers);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch ledgers", error: err.message });
  }
};

// Create a new ledger
export async function createLedger(req, res) {
  try {
    const ledgerData = req.body;
    const result = await Ledger.create(ledgerData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a ledger by ID
export async function updateLedger(req, res) {
  const id = req.params.id;
  const ledgerData = req.body;
  try {
    const result = await Ledger.findByIdAndUpdate(id, ledgerData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Ledger not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a ledger by ID
export async function removeLedger(req, res) {
  const id = req.params.id;
  try {
    const result = await Ledger.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Ledger deleted successfully" });
    } else {
      res.status(404).json({ message: "Ledger not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
