// File: Organizations.controller.js

import Organization from "./Organizations.model.js";

// Get all organizations
export async function getAllOrganizations(req, res) {
  try {
    const result = await Organization.find();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export async function getSuperAdminOrganizations(req, res) {
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
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } },
        { registrationNumber: { $regex: search, $options: 'i' } },
      ];
    }

    // --- Execute Queries ---
    const [organizations, totalOrganizations] = await Promise.all([
        Organization.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limitNum),
        Organization.countDocuments(query)
    ]);
      
    res.status(200).json({
      data: organizations,
      pagination: {
        totalDocuments: totalOrganizations,
        totalPages: Math.ceil(totalOrganizations / limitNum),
        currentPage: pageNum,
        limit: limitNum,
      },
    });

  } catch (err) {
    res.status(500).send({ error: "Server error fetching organization data: " + err.message });
  }
}

export async function getOrganizationById(req, res) {
  const id = req.params.id;
  try {
    const result = await Organization.findById(id);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Organization not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

export const getOrganizationsByBranch = async (req, res) => {
  const { branch } = req.params;
  try {
    const organizations = await Organization.find({ branch });
    res.status(200).json(organizations);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch organizations", error: err.message });
  }
};

// Create a new organization
export async function createOrganization(req, res) {
  try {
    const organizationData = req.body;
    const result = await Organization.create(organizationData);
    res.status(201).json(result);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Update an organization by ID
export async function updateOrganization(req, res) {
  const id = req.params.id;
  const organizationData = req.body;
  try {
    const result = await Organization.findByIdAndUpdate(id, organizationData, {
      new: true,
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: "Organization not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}

// Remove an organization by ID
export async function removeOrganization(req, res) {
  const id = req.params.id;
  try {
    const result = await Organization.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ message: "Organization deleted successfully" });
    } else {
      res.status(404).json({ message: "Organization not found" });
    }
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
}
