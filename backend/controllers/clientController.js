// controllers/ClientController.js
const clientService = require('../services/clientService');

class ClientController {
  // GET /api/admin/clients?page=&perPage=
  async listClients(req, res) {
    console.log('listClients');
    
    try {
    if (req.query.filter) {
      const { id: ids } = JSON.parse(req.query.filter);
      const data = await clientService.getByIds(ids);
      // Return the array itself, not wrapped in an object
      console.log('  if (req.query.filter) :',data);
      return res.json(data);
    }
      const page    = parseInt(req.query.page,    10) || 1;
      const perPage = parseInt(req.query.perPage, 10) || 20;
      const data    = await clientService.getClients({ page, perPage });
      console.log('  if (req.query.filter) :',data);
      
      res.json({
        data,
        total: data.length,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // GET /api/admin/clients/:id
  async getById(req, res) {
    console.log('ClientController - getById:');
    try {
      // console.log('ClientController - getById:',req.params.id);
      
      const client = await clientService.getById(req.params.id);
      if (!client) return res.status(404).json({ message: 'Not found' });
      res.json(client);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }
}

module.exports = new ClientController();
