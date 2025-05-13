// services/ClientService.js
const Client = require('../models/ClientModel');

class ClientService {
  /** Paginated clients list */
  async getClients({ page = 1, perPage = 20 }) {
    return await Client
      .find()
      .skip((page - 1) * perPage)
      .limit(perPage)
      .lean();
  }

  /** Create a new client */
  async createClient(data) {
    const client = new Client(data);
    return await client.save();
  }

  /** Get single client by ID */
  async getById(id) {
    const ans =  await Client.findById(id).lean();
    console.log('clientService -getByI:', ans);
    
    return ans
  }
  async getByIds(ids) {
    return Client.find({ _id: { $in: ids } }).lean();
  }
  /** (Optional) Update client info */
  async updateClient(id, data) {
    return await Client.findByIdAndUpdate(id, data, { new: true, runValidators: true }).lean();
  }
}

module.exports = new ClientService();
