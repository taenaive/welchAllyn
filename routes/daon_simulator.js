//daon_simulator.js
var express = require('express');
var router = express.Router();
var soapSave = require('../util/soapSave')
('http://mpstd-soa01:8001/soa-infra/services/default/BiometricServices/mpstd_biometric_status_update_mdt_ep?WSDL');

//var soapSave ={ save : function( x, y){ y({test: "test success!"});} };
/* GET home page. */
router.get('/BioClient.html', function(req, res) {
  res.render('daon_simulator', { title: 'Daon simulator' });
});

/** handle post from daon simuator page */
router.post('/post',function(req, res){
 
  var sig = req.body;
  console.log("applicant id = [%s]" ,sig.applicantId );
  
  if(sig.userRoleType == null){
    sig.userRoleType ="Applicant"
  }
  
  var inputData = {
  		applicantId: sig.applicantId,
        mode: sig.mode,
      
  };
 
  soapSave.save(inputData, function (result ){
  	res.send({result: result});
  });
  //Creature.prototype.insertSignature(this.req.body);
  //res.writeHead(200, { 'Content-Type': 'application/json' });
  
});


module.exports = router;