import WorkOrder from "./WorkOrders.model.js";
import Room from '../Room/Rooms.model.js';
import WorkCategory from "../WorkOrderCategory/WorkOrderCategory.model.js";
import HouseKeepingStatus from "../HouseKeepingStatus/HouseKeepingStatus.model.js";
import HouseKeeper from "../HouseKeeper/HouseKeepers.model.js";

// Get all work orders with Pagination, Search, and Branch Filtering
export async function getAllWorkOrders(req, res) {
  try {
    const { 
        page = 1, 
        limit = 10, 
        search = '',
        branch
    } = req.query;

    if (!branch) {
      return res.status(400).json({ error: "Branch is required" });
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    // --- Build Filter Query ---
    const query = { branch };
    
    if (search) {
      query.$or = [
        // FIXED: Changed from detail.order to detail.roomUnit
        { "detail.roomUnit": { $regex: search, $options: 'i' } }, 
        { "detail.houseStatus": { $regex: search, $options: 'i' } },
        { "workInformation.workCategory": { $regex: search, $options: 'i' } },
        { "workStatusInfo.assignTo": { $regex: search, $options: 'i' } },
        { "workStatusInfo.status": { $regex: search, $options: 'i' } },
      ];
    }

    // --- Execute Queries ---
    const [data, totalDocuments] = await Promise.all([
        WorkOrder.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum),
        WorkOrder.countDocuments(query)
    ]);
      
    res.status(200).json({
      data,
      pagination: {
        totalDocuments,
        totalPages: Math.ceil(totalDocuments / limitNum),
        currentPage: pageNum,
        limit: limitNum,
      },
    });

  } catch (err) {
    res.status(500).json({ error: "Server error fetching work orders: " + err.message });
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
    res.status(500).json({ error: err.message });
  }
}

// Create a new work order
export async function createWorkOrder(req, res) {
  try {
    const workOrderData = req.body;
    const result = await WorkOrder.create(workOrderData);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

// Update a work order by ID
export async function updateWorkOrder(req, res) {
  const id = req.params.id;
  const workOrderData = req.body;
  try {
    const result = await WorkOrder.findByIdAndUpdate(id, workOrderData, {
      new: true,
      runValidators: true
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Work order not found" });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
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
    res.status(500).json({ error: err.message });
  }
}