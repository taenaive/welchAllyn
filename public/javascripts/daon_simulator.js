//daon_simulator.js

var wrapper = document.getElementById("main-pad");

//helper to get params 
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

 var checkInbutton = wrapper.querySelector("[data-action=checkInButton]");
 var checkOutbutton = wrapper.querySelector("[data-action=checkOutButton]");
 var verifybutton = wrapper.querySelector("[data-action=verifyButton]");

 checkInbutton.addEventListener("click", function (event) {
 	//alert("checkin");
    console.log('RawString: '+ window.location.search);
        var mode = getParameterByName('mode');
        var applicantId_in = getParameterByName('id');
        
        if( applicantId_in=="") {
            alert("Fail: applicantid not provided!");
            return;
        }
        if( mode == null || mode=="") {
            //alert("Fail: userRoleType not provided! using 'Applicant' as a default");
            mode="CHECKIN";
        }
        // console.log(getParameterByName('formid') );
        // console.log(getParameterByName('applicantid') );
        $.post(
        "post", // Gets the URL to sent the post to
        {applicantId : applicantId_in,
         mode: mode,
         }, // Serializes form data in standard format
        function(data ) {
            if (data != null) {
            alert("<Node server response>\n" + "Operation status : " + data.result );
          
            }
         },
        "json" // The format the response should be in
    );

 });

 checkOutbutton.addEventListener("click", function (event) {

 	alert("check out");
 });
 verifybutton.addEventListener("click", function (event) {

 	alert("verify");
 });