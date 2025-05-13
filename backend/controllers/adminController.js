// controllers/AdminController.js

const userService = require('../services/userService');
const warrantyService = require('../services/warrantyService');

class AdminController {
  // GET /api/admin/users
  async listInstallers(req, res) {
    console.log('listInstallers');

    try {
      if (req.query.filter) {
        const { id: ids } = JSON.parse(req.query.filter);
        const data = await userService.getByIds(ids);
        // return raw array so your dataProvider.getMany can wrap it
        return res.json(data);
      }
      const page    = parseInt(req.query.page, 10)    || 1;
      const perPage = parseInt(req.query.perPage, 10) || 20;

      const installers = await userService.getUsers(page, perPage);
      console.log('installers:',installers);
      
      res.json({ page, perPage, data: installers });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // POST /api/admin/users
  async createInstaller(req, res) {
    try {
      const { username, password, fullname, email } = req.body;
      const newUser = await userService.createInstaller({ username, password, fullname, email });
      res.status(201).json(newUser);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  // DELETE /api/admin/users/:id
  async deleteInstaller(req, res) {
    try {
      const { id } = req.params;
      await userService.deleteInstaller(id);
      res.status(204).end();
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }
    async approveWarranty(req, res) {
    const { id } = req.params;
    // this lives in warrantyService
    const updated = await warrantyService.updateStatus(id, 'approved');
    res.json(updated);
  }

// controllers/WarrantyController.js

async listWarranties(req, res) {
  try {
    const page    = parseInt(req.query.page,    10) || 1;
    const perPage = parseInt(req.query.perPage, 10) || 20;
    const data    = await warrantyService.getWarranties({ page, perPage });

    // Always respond with { data: [...], total: number }
    res.json({
      data: data,               // an empty array if there are no records
      total: data.length        // zero in that case
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

  async updateWarrantyStatus(req, res){
   res.end()
  }
  
}

module.exports = new AdminController();
