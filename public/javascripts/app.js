var wrapper = document.getElementById("main-pad"),
    chooseButton = wrapper.querySelector("[data-action=choose]"),
    saveButton = wrapper.querySelector("[data-action=launch]");

    chooseButton.addEventListener("click", function (event) {
    	$.get("http://127.0.0.1:3000/WelchAllyn/Device/GetDevices",function(data,status){
    			alert("Data: " + data + "\nStatus: " + status);
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