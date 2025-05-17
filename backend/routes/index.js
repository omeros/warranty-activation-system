var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.redirect('/warranty-activation-system.apk');
});

// router.get('/', function(req, res, next) {  res.render('index', { title: 'Express' });
// });

module.exports = router;
