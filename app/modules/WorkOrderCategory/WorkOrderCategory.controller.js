import WorkOrderCategory from "./WorkOrderCategory.model.js";

// Get all categories with Pagination, Search, and Branch Filtering
export async function getAllWorkOrderCategories(req, res) {
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

    const totalDocuments = await WorkOrderCategory.countDocuments(query);
    const data = await WorkOrderCategory.find(query)
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

// Get category by ID
export async function getWorkOrderCategoryById(req, res) {
  const { id } = req.params;
  try {
    const result = await WorkOrderCategory.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Work order category not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Get categories by branch (Helper route)
export const getWorkOrderCategoriesByBranch = async (req, res) => {
  const { branch } = req.params;
  try {
    const categories = await WorkOrderCategory.find({ branch });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch work order categories", error: err.message });
  }
};

// Create a new category
export async function createWorkOrderCategory(req, res) {
  try {
    const { name, branch } = req.body;
    
    const newCategory = await WorkOrderCategory.create({
      name,
      branch
    });

    res.status(201).json(newCategory);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Update a category by ID
export async function updateWorkOrderCategory(req, res) {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const result = await WorkOrderCategory.findByIdAndUpdate(
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
      res.status(404).json({ message: "Work order category not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Remove a category by ID
export async function removeWorkOrderCategory(req, res) {
  const { id } = req.params;
  try {
    const result = await WorkOrderCategory.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Work order category deleted successfully" });
    } else {
      res.status(404).json({ message: "Work order category not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}