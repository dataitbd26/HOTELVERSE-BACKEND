// TableReservation.controller.js
import TableReservation from "./TableReservation.model.js";

export const getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", branch } = req.query;

    if (!branch) {
      return res.status(400).json({ error: "Branch is required" });
    }

    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const skip = (pageNumber - 1) * limitNumber;

    const query = { branch };

    if (search) {
      query.$or = [
        { guestName: { $regex: search, $options: "i" } },
        { phoneNumber: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
        { outlet: { $regex: search, $options: "i" } }
      ];
    }

    const totalDocuments = await TableReservation.countDocuments(query);
    const totalPages = Math.ceil(totalDocuments / limitNumber);

    const data = await TableReservation.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);

    return res.status(200).json({
      data,
      pagination: {
        totalDocuments,
        totalPages,
        currentPage: pageNumber,
        limit: limitNumber
      }
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await TableReservation.findById(id);
    if (!data) {
      return res.status(404).json({ error: "Record not found" });
    }
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const create = async (req, res) => {
  try {
    if (!req.body.branch) {
      return res.status(400).json({ error: "Branch is required" });
    }
    const newData = new TableReservation(req.body);
    const savedData = await newData.save();
    console.log("Created Table Reservation:", savedData);
    return res.status(201).json(savedData);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = await TableReservation.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );
    if (!updatedData) {
      return res.status(404).json({ error: "Record not found" });
    }
    return res.status(200).json(updatedData);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedData = await TableReservation.findByIdAndDelete(id);
    if (!deletedData) {
      return res.status(404).json({ error: "Record not found" });
    }
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};