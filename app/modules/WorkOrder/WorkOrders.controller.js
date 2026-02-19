import WorkOrder from "./WorkOrders.model.js";

// Get all work orders
export async function getAllWorkOrders(req, res) {
  try {
    const result = await WorkOrder.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getSuperAdminWorkOrders(req, res) {
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
        { "detail.order": { $regex: search, $options: 'i' } },
        { "detail.houseStatus": { $regex: search, $options: 'i' } },
        { "workInformation.workCategory": { $regex: search, $options: 'i' } },
        { "workStatusInfo.priority": { $regex: search, $options: 'i' } },
        { "workStatusInfo.status": { $regex: search, $options: 'i' } },
      ];
    }

    // --- Execute Queries ---
    const [workOrders, totalWorkOrders] = await Promise.all([
        WorkOrder.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum),
        WorkOrder.countDocuments(query)
    ]);
      
    res.status(200).json({
      data: workOrders,
      pagination: {
        totalDocuments: totalWorkOrders,
        totalPages: Math.ceil(totalWorkOrders / limitNum),
        currentPage: pageNum,
        limit: limitNum,
      },
    });

  } catch (err) {
    res.status(500).send({ error: "Server error fetching work order data: " + err.message });
  }
}

export async function getWorkOrderById(req, res) {
  const id = req.params.id;
  try {
    const result = await WorkOrder.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Work order not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export const getWorkOrdersByWorkCategory = async (req, res) => {
  const { workCategory } = req.params;
  try {
    const workOrders = await WorkOrder.find({ "workInformation.workCategory": workCategory });
    res.status(200).json(workOrders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch work orders", error: err.message });
  }
};

// Create a new work order
export async function createWorkOrder(req, res) {
  try {
    const workOrderData = req.body;
    const result = await WorkOrder.create(workOrderData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a work order by ID
export async function updateWorkOrder(req, res) {
  const id = req.params.id;
  const workOrderData = req.body;
  try {
    const result = await WorkOrder.findByIdAndUpdate(id, workOrderData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Work order not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a work order by ID
export async function removeWorkOrder(req, res) {
  const id = req.params.id;
  try {
    const result = await WorkOrder.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Work order deleted successfully" });
    } else {
      res.status(404).json({ message: "Work order not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
