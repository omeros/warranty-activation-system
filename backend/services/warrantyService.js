// services/WarrantyService.js
const Warranty = require('../models/WarrantyModel');

class WarrantyService {
  /** 
   * Paginated list of warranties (optional filter by installer/client)
   */
  async getWarranties({ page = 1, perPage = 20, installerId, clientId }) {
    const query = {};
    if (installerId) query.installerId = installerId;
    if (clientId)    query.clientId    = clientId;

    return await Warranty
      .find(query)
      .skip((page - 1) * perPage)
      .limit(perPage)
      .lean();
  }

  /** Create a new warranty entry */
  async createWarranty(data) {
    const warranty = new Warranty(data);
    return await warranty.save();
  }

  /** Update only the status field */
  async updateStatus(id, status) {
    return await Warranty.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ).lean();
  }

  /** Fetch single warranty by ID */
  async getById(id) {
    return await Warranty.findById(id).lean();
  }
}

module.exports = new WarrantyService();
