var soap = require('soap');
     /* UnitTest
       *
       * (1) Success Codes:
       *     ENROLLED      -- The biometric identity was enrolled succesfully
       *     VERIFIED      -- The verify operation obtained a match
       *     CHECKIN_OK    -- The checkin operation obtained a match
       *     CHECKOUT_OK   -- The checkout operation obtained a match
       * (2) Failure Codes:
       *     EXIST         -- Enroll failed, the supplied biometric identity exists
       *     VERIFY_FAIL   -- A match could not be obtained for a verify operation
       *     CHECKIN_FAIL  -- A match could not be obtained for a checkin operation
       *     CHECKOUT_FAIL -- A match could not be obtained for a checkout operation
       *     FAIL          -- The general failure code, mostly communication fail
       */

var soapSaveImage = function(url){

	
	var failedResponseHeader ={ operationStatus: 'false'} ;
	var func = {
		save : function(data , callback){

				 if (data.applicantId == null){
				 	data.applicantId='1261' //default test applicant
				 }
				 if (data.mode == null){
				 	data.mode='Applicant' //default
				 }else if (data.mode == "CHECKIN"){
				 	data.mode = "CHECKIN_OK";
				 }else if (data.mode == "CHECKOUT"){
				 	data.mode = "CHECKOUT_OK";
				 }else if (data.mode == "VERFIED"){
				 	data.mode = "VERIFIED";
				 }else if (data.mode == "ENROLLED"){
				 	data.mode = "ENROLLED";
				 }
				 
				 //needs to append ns2:
				 var saveArgs = { /*requestHeader:{ loginUserName: 'null', requestId:'1'}, */
                                        result: data.mode,
                                        modality: "FINGER",
                                        applicant_id: data.applicantId

                                    };
                console.log("saveArgs: " +JSON.stringify(saveArgs));

                soap.createClient(url, function(err, client) {
			  	  if(err){
			  	  	  console.log ("Error msg: " + err);
			  	  	   callback(failedResponseHeader);
			  	  }
  	              else{
	  	  				console.log(" ======= Oracle SOA biometric check : ======");
	  	  			 console.log(client.describe().mpstd_biometric_status_update_mdt_ep.service_pt.execute);
	  	 			 //console.log(client.describe().SignatureService_ep.SignatureServicePort_pt.retrieveSignature);
				        var executeResult =client.execute(saveArgs, function(err, result) {
				           console.log ("result: " +result);
				           console.log("error: " +err);
				           callback(result);
				        });
				        //console.log(executeResult);

				      }                     	
				});
        },        
		retrieve: function(data ,callback){ 
			//TODO:
		

		}
		
	}
	//console.log(" soapSave instanciated"); 
 	return func;
};

module.exports =  soapSaveImage;