// routes/admin/users.js

const express         = require('express');
const { authenticate, requireAdmin } = require('../middlaware/auth');
console.log('➤ authenticate:', authenticate);
console.log('➤ requireAdmin:', requireAdmin);

const adminController = require('../controllers/adminController');
const clientCtrl    = require('../controllers/clientController');
const router = express.Router();

// protect all these routes
router.use(authenticate, requireAdmin);

router.get(   '/users',        adminController.listInstallers);
router.post(  '/users',        adminController.createInstaller);
router.delete('/users/:id',    adminController.deleteInstaller);

router.get(   '/warranties',   adminController.listWarranties);
router.put(   '/warranties/:id/status', adminController.updateWarrantyStatus);


router.get('/clients', clientCtrl.listClients);
router.get('/clients/:id', clientCtrl.getById);

module.exports = router;
 