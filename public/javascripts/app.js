//main div element
var wrapper = document.getElementById("main-pad"),
//button that starts all device activation the process 
    chooseButton = wrapper.querySelector("[data-action=choose]");
//click listener added 
    chooseButton.addEventListener("click", function (event) {
    	$.get("http://127.0.0.1:3006/WelchAllyn/Device/GetDevices",function(data,status){
                var retStr='';
                var domStr='';
                if(status !== 'success'){
                    alert( "Didn't find the welchAllyn device service in user's machine \n Status: " + status);
                    return;
                }
                var devicesArray =JSON.parse(data);
                if(devicesArray == null || !('length' in devicesArray) || devicesArray.length < 1){
                    alert( "Check the device connection: 0 device detected!");
                    return;
                }
                $( "#device_list" ).empty();
                $( "#device_list" ).append( "<h4>Device list</h4>" );
                domStr += '<ul id="dev_list_ul">' ;
                for (var i=0; i<devicesArray.length ; ++i){
                    retStr +="device "+ i +" = "+devicesArray[i].deviceid+"\n";
                    retStr +="location of device"+ i +" = "+devicesArray[i].location;
                    
                    domStr+= '<li class="box effect2">Device name : <button class="button_device" data-action="launch">'+devicesArray[i].deviceid+'</button>';
                    domStr+= '<span class="right">Location : '+ devicesArray[i].location +"</span></li>" ;
                    // domStr+= '<li class="box effect2">Device name : <button class="button_device" data-action="launch">'+devicesArray[i].deviceid+'</button>';
                    // domStr+= '<span class="right">Location : '+ devicesArray[i].location +"</span></li>" ;
                }
                $( "#device_list" ).append( domStr +"</ul>" );//close domStr and append
                $( "[data-action=launch]").click(function() {
                      alert( "Handler for .click() called." +$(this).text() );
                      window.location = '/devices?deviceid='+ $(this).text();
                    })
    			//alert("Data: " + retStr + "\nStatus: " + status);
  			});

    	// $.ajax({
     //    url : "http://127.0.0.1:9233/WelchAllyn/Device/GetDevices",
     //    dataType:"jsonp",
     //    jsonp:"mycallback",
     //    success:function(data)
     //    {
     //        alert("Data: " + data + "\nStatus: " + status);
     //    }
    //});
	});