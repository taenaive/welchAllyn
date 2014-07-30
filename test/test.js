var http = require('http');


exports.Test = {
    "Verify WelchAllyn is running": function (test) {
        test.expect(2);
        
	var testBuffer = null;
	
	var callback = function(response) {
	  var str = '';
	  //another chunk of data has been recieved, so append it to `str`
	  response.on('data', function (chunk) {
	    str += chunk;
	  });
	  //the whole response has been recieved, so we just print it out here
	  response.on('end', function () {
	    console.log('Data Recieved from WlechAllyn: '+str);
	    testBuffer = str;	    
	  });
	}
	//The url we want is: '127.0.0.1:9233/WelchAllyn/Device/GetDevices'
	var options = {
	  host: '127.0.0.1',
	  port:  9233,
	  path: '/WelchAllyn/Device/GetDevices'
	};

	// http.get("http://127.0.0.1:9233/WelchAllyn/Device/GetDevices", function(res) {
 //    console.log("Received response: " + res.statusCode);
	// });
	var server = http.get(options, callback);
        //soapSave.retrieve(data , callBackTest);
    server.on("error", function(e){
									  console.log("Got error: " + e.message);
									});

    setTimeout(function(){
        	
        	test.ok(testBuffer != null, "response from welchAllyn not found");//test passed
            test.equal(true, true, 'shoud pass');//future test
            test.done();
            server.end();
        }, 1000);
    //while(true){}
       
    },

    "WelchAllyn Devices found": function (test) {
        test.expect(1);
        var testBuffer = null;
        var options = {
		  host: '127.0.0.1',
		  port:  9233,
		  path: '/WelchAllyn/Device/GetDevices'
		};
		var callback = function(response) {
			  var str = '';
			  //another chunk of data has been recieved, so append it to `str`
			  response.on('data', function (chunk) {
			    str += chunk;
			  });
			  //the whole response has been recieved, so we just print it out here
			  response.on('end', function () {
			    console.log('Data Recieved from WlechAllyn: ');
			    var devicesArray =JSON.parse(str);
			    for (var i=0; i<devicesArray.length ; ++i){
			    	console.log("device "+ i +" = "+devicesArray[i].deviceid);
			    	console.log("location of device"+ i +" = "+devicesArray[i].location);
			    }
			    testBuffer = str;	    
			  });
			}
		var server = http.get(options, callback);
        //soapSave.retrieve(data , callBackTest);
    	server.on("error", function(e){
									  console.log("Got error: " + e.message);
									});
    	 setTimeout(function(){
        	test.ok(testBuffer != null, "response from welchAllyn not found");//test passed
            test.done();
            server.end();
        }, 1000);

    }


}