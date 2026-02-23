import EmailAccount from "./EmailAccounts.model.js";

// Get all email accounts
export async function getAllEmailAccounts(req, res) {
  try {
    const result = await EmailAccount.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getSuperAdminEmailAccounts(req, res) {
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
        { email: { $regex: search, $options: 'i' } },
        { displayName: { $regex: search, $options: 'i' } },
        { host: { $regex: search, $options: 'i' } },
        { branch: { $regex: search, $options: 'i' } },
      ];
    }

    // --- Execute Queries ---
    const [emailAccounts, totalEmailAccounts] = await Promise.all([
        EmailAccount.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum),
        EmailAccount.countDocuments(query)
    ]);
      
    res.status(200).json({
      data: emailAccounts,
      pagination: {
        totalDocuments: totalEmailAccounts,
        totalPages: Math.ceil(totalEmailAccounts / limitNum),
        currentPage: pageNum,
        limit: limitNum,
      },
    });

  } catch (err) {
    res.status(500).send({ error: "Server error fetching email account data: " + err.message });
  }
}

export async function getEmailAccountById(req, res) {
  const id = req.params.id;
  try {
    const result = await EmailAccount.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Email account not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export const getEmailAccountsByBranch = async (req, res) => {
  const { branch } = req.params;
  try {
    const emailAccounts = await EmailAccount.find({ branch });
    res.status(200).json(emailAccounts);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch email accounts", error: err.message });
  }
};

// Create a new email account
export async function createEmailAccount(req, res) {
  try {
    const {email} = req.body;

  console.log(email)
    const result = await EmailAccount.create(emailAccountData);
    res.status(201).json(result);

   
    
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a email account by ID
export async function updateEmailAccount(req, res) {
  const id = req.params.id;
  const emailAccountData = req.body;
  try {
    const result = await EmailAccount.findByIdAndUpdate(id, emailAccountData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Email account not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a email account by ID
export async function removeEmailAccount(req, res) {
  const id = req.params.id;
  try {
    const result = await EmailAccount.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Email account deleted successfully" });
    } else {
      res.status(404).json({ message: "Email account not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}