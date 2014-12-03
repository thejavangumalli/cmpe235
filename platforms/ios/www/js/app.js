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
                $('#firstname').val(result.firstname);
                $('#lastname').val(result.lastname);
                $('#phone').val(result.phone);
                $('#email').val(result.email);
                $('#id-info').val($username);
                $('#homeworks').val(result.homeworks);
                $('#labs').val(result.labs);
                $('#midterm').val(result.midterm);
                $('#presentation').val(result.presentation);
                $('#project').val(result.project);
                $('#final').val(result.final);
                $.getJSON('http://vangumalli.com/project/class_description.php?callback=?',
                  'class_id=235',function(classResult){
                    $('#class-description').val(classResult.class_description);
                  });
                var type = result.type; //1 = student; 2= professor
                if(type == 1)
                  {
                    window.location=window.location.href+"#studentMainPage"
                  }
                else
                  {
                    window.location=window.location.href+"#mainPage"
                  }
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
