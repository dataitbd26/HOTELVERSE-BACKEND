// File: PaymentMethods.controller.js

import PaymentMethod from "./PaymentMethods.model.js";

// Get all payment methods
export async function getAllPaymentMethods(req, res) {
  try {
    const result = await PaymentMethod.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getSuperAdminPaymentMethods(req, res) {
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
        { status: { $regex: search, $options: 'i' } },
        { type: { $regex: search, $options: 'i' } },
        { ledger: { $regex: search, $options: 'i' } },
        { branch: { $regex: search, $options: 'i' } },
      ];
    }

    // --- Execute Queries ---
    const [paymentMethods, totalPaymentMethods] = await Promise.all([
        PaymentMethod.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum),
        PaymentMethod.countDocuments(query)
    ]);
      
    res.status(200).json({
      data: paymentMethods,
      pagination: {
        totalDocuments: totalPaymentMethods,
        totalPages: Math.ceil(totalPaymentMethods / limitNum),
        currentPage: pageNum,
        limit: limitNum,
      },
    });

  } catch (err) {
    res.status(500).send({ error: "Server error fetching payment method data: " + err.message });
  }
}

export async function getPaymentMethodById(req, res) {
  const id = req.params.id;
  try {
    const result = await PaymentMethod.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Payment method not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export const getPaymentMethodsByBranch = async (req, res) => {
  const { branch } = req.params;
  try {
    const paymentMethods = await PaymentMethod.find({ branch });
    res.status(200).json(paymentMethods);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch payment methods", error: err.message });
  }
};

// Create a new payment method
export async function createPaymentMethod(req, res) {
  try {
    const paymentMethodData = req.body;
    const result = await PaymentMethod.create(paymentMethodData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update a payment method by ID
export async function updatePaymentMethod(req, res) {
  const id = req.params.id;
  const paymentMethodData = req.body;
  try {
    const result = await PaymentMethod.findByIdAndUpdate(id, paymentMethodData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Payment method not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove a payment method by ID
export async function removePaymentMethod(req, res) {
  const id = req.params.id;
  try {
    const result = await PaymentMethod.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Payment method deleted successfully" });
    } else {
      res.status(404).json({ message: "Payment method not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
