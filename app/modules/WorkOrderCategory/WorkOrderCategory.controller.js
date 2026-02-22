import WorkOrderCategory from "./WorkOrderCategory.model.js";

// Get all categories
export async function getAllWorkOrderCategories(req, res) {
  try {
    const result = await WorkOrderCategory.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Get category by ID
export async function getWorkOrderCategoryById(req, res) {
  const id = req.params.id;
  try {
    const result = await WorkOrderCategory.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Work order category not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Create a new category
export async function createWorkOrderCategory(req, res) {
  try {
    const categoryData = req.body;
    const result = await WorkOrderCategory.create(categoryData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a category by ID
export async function updateWorkOrderCategory(req, res) {
  const id = req.params.id;
  const categoryData = req.body;
  try {
    const result = await WorkOrderCategory.findByIdAndUpdate(id, categoryData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Work order category not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a category by ID
export async function removeWorkOrderCategory(req, res) {
  const id = req.params.id;
  try {
    const result = await WorkOrderCategory.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Work order category deleted successfully" });
    } else {
      res.status(404).json({ message: "Work order category not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
