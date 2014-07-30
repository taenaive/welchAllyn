var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  var qString = (req.query.deviceid === undefined) ? 'Not Found' : req.query.deviceid;
  //console.log('Device id' + req.query.deviceid);
  res.render('devices', { title: 'MEPCOM Vital Device', device_name: qString});
});

module.exports = router;