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
                var type = result.type;
                if(type == 1)
                  {
                    $('#firstname').val(result.firstname);
                    $('#lastname').val(result.lastname);
                    $('#phone').val(result.phone);
                    $('#email').val(result.email);
                    $('#id-info').val($username);
                    $.getJSON('http://vangumalli.com/project/class_description.php?callback=?',
                    'class_id=235',function(classResult){
                      $('#class-description').val(classResult.class_description);
                    });
                    $('#homeworks').val(result.homeworks);
                    $('#labs').val(result.labs);
                    $('#midterm').val(result.midterm);
                    $('#presentation').val(result.presentation);
                    $('#project').val(result.project);
                    $('#final').val(result.final);
                    window.location=window.location.href+"#studentMainPage"
                  }
                else
                  {
                    $('#firstname_prof').val(result.firstname);
                    $('#lastname_prof').val(result.lastname);
                    $('#phone_prof').val(result.phone);
                    $('#email_prof').val(result.email);
                    $('#id-info_prof').val($username);
                    $.getJSON('http://vangumalli.com/project/class_description.php?callback=?',
                    'class_id=235',function(classResult){
                      $('#class-description_prof').val(classResult.class_description);
                    });
                    window.location=window.location.href+"#mainPage"
                  }
              }
        });
 };

 var getConfigurations = function(){
   $.getJSON('http://vangumalli.com/project/class.php?callback=?',
   'class_id=235',function(result){
     $('#hw_points').val(result.homework_max).slider("refresh");
     $('#lab_points').val(result.labs_max).slider("refresh");
     $('#project_points').val(result.project_max).slider("refresh");
     $('#present_points').val(result.presentation_max).slider("refresh");
     $('#mid_points').val(result.midterm_max).slider("refresh");
     $('#final_points').val(result.final_max).slider("refresh");
     $('#hw_sf').val(result.homework_sf).slider("refresh");
     $('#lab_sf').val(result.labs_sf).slider("refresh");
     $('#project_sf').val(result.project_sf).slider("refresh");
     $('#present_sf').val(result.presentation_sf).slider("refresh");
     $('#mid_sf').val(result.midterm_sf).slider("refresh");
     $('#final_sf').val(result.final_sf).slider("refresh");
     $('#Agrade-1a').val(result.grade_a_min).slider("refresh");
     $('#Bgrade-1a').val(result.grade_b_min).slider("refresh");
     $('#Bgrade-1b').val(parseInt(result.grade_a_min)-1).slider("refresh");
     $('#Cgrade-1a').val(result.grade_c_min).slider("refresh");
     $('#Cgrade-1b').val(parseInt(result.grade_b_min)-1).slider("refresh");
     $('#Dgrade-1a').val(result.grade_d_min).slider("refresh");
     $('#Dgrade-1b').val(parseInt(result.grade_c_min)-1).slider("refresh");
     $('#Fgrade-1b').val(parseInt(result.grade_d_min)-1).slider("refresh");
   });
 }


 // Setup the event handlers
 $( document ).on( "ready", function(){

                  $('#login').on('click', checkLogin);
                  $('#settingsButton').on('click', getConfigurations);
                  });

 // Load plugin
 $( document ).on( "deviceready", function(){
                  StatusBar.overlaysWebView( false );
                  StatusBar.backgroundColorByName("gray");
                  });
 }


 )(jQuery);
