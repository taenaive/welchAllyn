//main div element
var wrapper = document.getElementById("main-pad"),
//button that starts all device activation the process 
    capturebutton = wrapper.querySelector("[data-action=captureButton]");
//click listener added 
    capturebutton.addEventListener("click", function (event) {
    	$.get("http://127.0.0.1:3006/WelchAllyn/Device/GetCurrentReading?deviceid=USB_00000001",
    		function(data,status){
                var retStr='';
                var domStr='';
                if(status !== 'success'){
                    alert( "Didn't find the welchAllyn device service in user's machine \n Status: " + status);
                    return;
                }
               
    			//alert("Data: " + retStr + "\nStatus: " + status);
  			});

	});