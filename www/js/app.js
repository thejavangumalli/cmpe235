(function($) {
 "use strict";

 var checkLogin= function()
 {
 var $username = $('#username').val();
 var $password = $('#password').val();
 $.getJSON('http://vangumalli.com/project/login.php?callback=?',
          'username='+$username+'&password='+$password,function(result){
            if(result.error)
              {
                //error
                $('#error').text(result.error);
              }
              else
              {
                //update the UI with student details
                $('#firstname').text(result.firstname);
                $('#lastname').text(result.lastname);
                $('#phone').text(result.phone);
                $('#email').text(result.email);
                $('#id-info').text($username);
                var type = result.type; //1 = student; 2= professor
                window.location=window.location.href+"#mainPage"
              }

        });
 }

 // Setup the event handlers
 $( document ).on( "ready", function(){

                  $('#login').on('click', checkLogin);

                  });

 // Load plugin
 $( document ).on( "deviceready", function(){
                  StatusBar.overlaysWebView( false );
                  StatusBar.backgroundColorByName("gray");
                  });
 }


 )(jQuery);
