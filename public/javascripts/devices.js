//main div element
var wrapper = document.getElementById("main-pad"),
//button that starts all device activation the process 
    capturebutton = wrapper.querySelector("[data-action=captureButton]"),
    device_name =$('#device_name').text(),
    query_url="http://127.0.0.1:3006/WelchAllyn/Device/GetCurrentReading?deviceid="+device_name;

//click listener added 
    capturebutton.addEventListener("click", function (event) {
    	
    	$.get(query_url,
    		function(data,status){
                var retStr='';
                var domStr='';
                var devicesArray;
                if(status !== 'success'){
                    alert( "Didn't find the welchAllyn device service in user's machine \n Status: " + status);
                    return;
                }
                try{
                devicesArray =JSON.parse(data);
            	}
            	catch(e){
            		alert( "Check the device : device power may be off");
                    return;
            	}
                //check for data
                if(devicesArray == null || !('length' in devicesArray) || devicesArray.length < 1){
                    alert( "Check the device connection: 0 device detected!");
                    return;
                }
                //console.log(devicesArray[0].hr)
                $("#weight").val( Math.round(devicesArray[0].weight*100)/100 );
                $("#height").val( Math.round(devicesArray[0].height*100)/100 );
                $("#bmi").val( Math.round(devicesArray[0].bmi*100)/100 );
                $("#diastolic").val( Math.round(devicesArray[0].diastolic*100)/100 );
                $("#systolic").val( Math.round(devicesArray[0].systolic*100)/100 );
                $("#heartRate").val( Math.round(devicesArray[0].hr) );
                $("#temperature").val( Math.round(devicesArray[0].temperature*100)/100 );


    			//alert("Device Name: "+device_name+"\nData: " + data + "\nStatus: " + status);
  			});

	});