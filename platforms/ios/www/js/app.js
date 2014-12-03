(function($) {
 "use strict";

 var checkLogin= function()
 {
 var $username = $('#username').val();
 var $password = $('#password').val();
 $.ajax({
        url:'http://vangumalli.com/project/login.php',
        data:{'username':$username,'password':$password},
        dataType: 'jsonp',
        success:function(data){alert(data)}
        
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