let express = require('express');
let router = express.Router();
 
const customers = require('./controller.js');
const reparateurs = require('./controller.js');

router.post('/api/customer', customers.createCustomer);
router.get('/api/customer/:id', customers.getCustomer);
router.get('/api/customers', customers.customers);
router.put('/api/customer', customers.updateCustomer);
router.delete('/api/customer/:id', customers.deleteCustomer);

router.get('/api/reparateurs', reparateurs.reparateurs);

module.exports = router;