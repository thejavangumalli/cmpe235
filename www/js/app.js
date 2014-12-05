(function($) {
 "use strict";

 var checkLogin= function()
 {
 var $username = $('#username').val();
 var $password = $('#password').val();
 $.getJSON('http://poojaindi.com/project/login.php?callback=?',
          'username='+$username+'&password='+$password,function(result){
            if(result.error)
              {
                //error
                $('#error').text(result.error);
                $('#loginSuccessId').css('display','block');
                $('.toastLogin').fadeIn(400).delay(3000).fadeOut(400);
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
                    $.getJSON('http://poojaindi.com/project/class_description.php?callback=?',
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
                    $.getJSON('http://poojaindi.com/project/class_description.php?callback=?',
                    'class_id=235',function(classResult){
                      $('#class-description_prof').val(classResult.class_description);
                    });
                    window.location=window.location.href+"#mainPage"
                  }
              }
        });
 };

 var getConfigurations = function(){
   $.getJSON('http://poojaindi.com/project/class.php?callback=?',
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

  var saveDetails = function()
 {
   var $max_homework_points = $('#hw_points').val();
   var $max_labs_points = $('#lab_points').val();
   var $max_project_points = $('#project_points').val();
   var $max_present_points = $('#present_points').val();
   var $max_mid_points = $('#mid_points').val();
   var $max_final_points = $('#final_points').val();
   var $max_homework_sf = $('#hw_sf').val();
   var $max_labs_sf = $('#lab_sf').val();
   var $max_project_sf = $('#project_sf').val();
   var $max_present_sf = $('#present_sf').val();
   var $max_mid_sf = $('#mid_sf').val();
   var $max_final_sf = $('#final_sf').val();   
   var $min_a_grade = $('#Agrade-1a').val();
   var $min_b_grade = $('#Bgrade-1a').val();
   var $min_c_grade = $('#Cgrade-1a').val();
   var $min_d_grade = $('#Dgrade-1a').val();
   var percentage_sum = parseInt($max_final_sf)+parseInt($max_mid_sf)+parseInt($max_homework_sf)+parseInt($max_labs_sf)+parseInt($max_project_sf)+parseInt($max_present_sf); 
   if(percentage_sum==100)
   {
     $.getJSON('http://poojaindi.com/project/save-settings.php?callback=?',
            'class_id=235&max_homework_points='+$max_homework_points+'&max_labs_points='+$max_labs_points+"&max_project_points="+$max_project_points+
            '&max_present_points='+$max_present_points+'&max_mid_points='+$max_mid_points+"&max_final_points="+$max_final_points+
            '&max_homework_sf='+$max_homework_sf+'&max_labs_sf='+$max_labs_sf+"&max_project_sf="+$max_project_sf+
            '&max_present_sf='+$max_present_sf+'&max_mid_sf='+$max_mid_sf+"&max_final_sf="+$max_final_sf+
            '&min_a_grade='+$min_a_grade+'&min_b_grade='+$min_b_grade+'&min_c_grade='+$min_c_grade+'&min_d_grade='+$min_d_grade,
            function(result){
              if(result.msg)
                {
                  window.location.href='#mainPage';
                  $('#settingsSuccessId').css('display','block');
                  $('.toast').fadeIn(400).delay(3000).fadeOut(700);
                }
               else
               {
                $('#scalingFactorsError').css('display','block');
                $('.toast').fadeIn(400).delay(3000).fadeOut(700);
               }
          });
    }
    else
    {
      $('#scalingError').css('display','block');
      $('.toastLogin').text('scaling factors sum must be 100').fadeIn(400).delay(3000).fadeOut(700);
    }
 }

 //Calculate grade
  var calculateGrade = function()
 {
   var $student_id = $('#student-id_prof').val();
   var $homework_points = $('#homeworks_prof').val();
   var $labs_points = $('#labs_prof').val();
   var $project_points = $('#project_prof').val();
   var $mid_points = $('#midterm_prof').val();
   var $pres_points = $('#presentation_prof').val();
   var $final_points = $('#final_prof').val();
   
   $.getJSON('http://poojaindi.com/project/validate_grades.php?callback=?',
   'class_id=235',function(result){
              if(result.error)
              {
                //error
                $('#error').text(result.error);
                $('#computeError').css('display','block');
                $('.toast').fadeIn(400).delay(3000).fadeOut(400);
              }
              else
              {
                  var homework_max = parseInt(result.homework_max);
                  var labs_max = parseInt(result.labs_max);
                  var project_max = parseInt(result.project_max);
                  var presentation_max = parseInt(result.presentation_max);
                  var midterm_max = parseInt(result.midterm_max);
                  var final_max = parseInt(result.final_max);
                  var homework_sf = parseInt(result.homework_sf)/100;
                  var labs_sf = parseInt(result.labs_sf)/100;
                  var project_sf = parseInt(result.project_sf)/100;
                  var presentation_sf = parseInt(result.presentation_sf)/100;
                  var midterm_sf = parseInt(result.midterm_sf)/100;
                  var final_sf = parseInt(result.final_sf)/100;
                  var grade_a_min = parseInt(result.grade_a_min);
                  var grade_b_min = parseInt(result.grade_b_min);
                  var grade_c_min = parseInt(result.grade_c_min);
                  var grade_d_min = parseInt(result.grade_d_min);

                  if(parseInt($homework_points) > homework_max){
                    $('#compute_error').text("Homework grade should be less than "+homework_max);
                    $('#computeError').css('display','block');
                    $('.toast').fadeIn(400).delay(3000).fadeOut(400);
                  }
                  else if(parseInt($labs_points) > labs_max)
                  {
                    $('#compute_error').text("Labs grade should be less than "+labs_max);
                    $('#computeError').css('display','block');
                    $('.toast').fadeIn(400).delay(3000).fadeOut(400);
                  }
                  else if(parseInt($project_points) > project_max)
                  {
                    $('#compute_error').text("Project grade should be less than "+project_max);
                    $('#computeError').css('display','block');
                    $('.toast').fadeIn(400).delay(3000).fadeOut(400);
                  }
                  else if(parseInt($mid_points) > midterm_max)
                  {
                    $('#compute_error').text("Midterm grade should be less than "+midterm_max);
                    $('#computeError').css('display','block');
                    $('.toast').fadeIn(400).delay(3000).fadeOut(400);
                  }
                  else if(parseInt($pres_points) > presentation_max)
                  {
                    $('#compute_error').text("presentation grade should be less than "+presentation_max);
                    $('#computeError').css('display','block');
                    $('.toast').fadeIn(400).delay(3000).fadeOut(400);
                  }
                  else if(parseInt($final_points) > final_max)
                  {
                    $('#compute_error').text("final grade should be less than "+final_max);
                    $('#computeError').css('display','block');
                    $('.toast').fadeIn(400).delay(3000).fadeOut(400);
                  }
                  else
                  {
                    $.getJSON('http://poojaindi.com/project/save-grades.php?callback=?',
                    'class_id=235&student_id='+$student_id+'&homework_points='+$homework_points+'&labs_points='+$labs_points+'&project_points='+$project_points+'pres_points='+$pres_points+'&mid_points='+$mid_points+'&final_points='+$final_points,function(result){
                      if(result.msg)
                      {   
                          var student_grade = (((parseInt($homework_points)/homework_max)*homework_sf)+((parseInt($labs_points)/labs_max)*labs_sf)+((parseInt($project_points)/project_max)*project_sf)+((parseInt($pres_points)/presentation_max)*presentation_sf)
                                              +((parseInt($mid_points)/midterm_max)*midterm_sf)+((parseInt($final_points)/final_max)*final_sf))*100;
                          window.alert(student_grade);
                          if(parseInt(student_grade) >= parseInt(grade_a_min)){
                            $('#finalgrade_prof').val("A");
                          }else if(parseInt(student_grade) >= parseInt(grade_b_min)){
                            $('#finalgrade_prof').val("B");
                          }else if(parseInt(student_grade) >= parseInt(grade_c_min)){
                            $('#finalgrade_prof').val("C");
                          }else if(parseInt(student_grade) >= parseInt(grade_d_min)){
                            $('#finalgrade_prof').val("D");
                          }else{
                            $('#finalgrade_prof').val("F");
                          }

                          window.location.href='#mainPage';
                          $('#computeSuccessId').css('display','block');
                          $('.toast').fadeIn(400).delay(3000).fadeOut(700);
                      }
                      else
                      {
                          $('#computeError').css('display','block');
                          $('.toast').fadeIn(400).delay(3000).fadeOut(700);
                          window.location=window.location.href+"#mainPage"
                      }
                    });
                  }
                  }
              });
 }

 // Setup the event handlers
 $( document ).on( "ready", function(){

                  $('#login').on('click', checkLogin);
                  $('#settingsButton').on('click', getConfigurations);
                  $('#saveButton').on('click',saveDetails);
                  $('#computeGrade').on('click',calculateGrade);
                  });

 // Load plugin
 $( document ).on( "deviceready", function(){
                  StatusBar.overlaysWebView( false );
                  StatusBar.backgroundColorByName("gray");
                  });

 $( document ).on( "pagecreate", function()
              {
                  //slider a minimum change  
                  $("#Agrade-1a").change(function() 
                  {
                    var slider_val = $('#Agrade-1a').val();
                    $('#Bgrade-1b').val(parseInt(slider_val)-1).slider("refresh");
                    var slider1b = $('#Bgrade-1b').val();
                    var slider1a = $('#Bgrade-1a').val();
                    if(parseInt(slider1b)==parseInt(slider1a))
                    {
                      $('#Bgrade-1a').val(parseInt(slider1a)-10).slider("refresh");
                    }
                  });
                  //slider b minimum change
                  $("#Bgrade-1a").change(function() 
                  {
                    var slider_val = $('#Bgrade-1a').val();
                    $('#Cgrade-1b').val(parseInt(slider_val)-1).slider("refresh");
                    // var slider1b = $('#Cgrade-1b').val();
                    // var slider1a = $('#Cgrade-1a').val();
                    // if(parseInt(slider1b)==parseInt(slider1a))
                    // {
                    //   $('#Cgrade-1a').val(parseInt(slider1a)-10).slider("refresh");
                    // }
                  });
                  //slider c minimum change
                  $("#Cgrade-1a").change(function() 
                  {
                    var slider_val = $('#Cgrade-1a').val();
                    $('#Dgrade-1b').val(parseInt(slider_val)-1).slider("refresh");
                    // var slider1b = $('#Dgrade-1b').val();
                    // var slider1a = $('#Dgrade-1a').val();
                    // if(parseInt(slider1b)==parseInt(slider1a))
                    // {
                    //   $('#Dgrade-1a').val(parseInt(slider1a)-10).slider("refresh");
                    // }
                  });
                  //slider d minimum change
                  $("#Dgrade-1a").change(function() 
                  {
                    var slider_val = $('#Dgrade-1a').val();
                    $('#Fgrade-1b').val(parseInt(slider_val)-1).slider("refresh");
                    // var slider1b = $('#Fgrade-1b').val();
                    // var slider1a = $('#Fgrade-1a').val();
                    // if(parseInt(slider1b)==parseInt(slider1a))
                    // {
                    //   $('#Fgrade-1a').val(parseInt(slider1a)-10).slider("refresh");
                    // }
                  });
                  //slider b maximum change
                  $("#Bgrade-1b").change(function() 
                  {
                    var slider_val = $('#Bgrade-1b').val();
                    $('#Agrade-1a').val(parseInt(slider_val)+1).slider("refresh");
                    var slider1b = $('#Agrade-1b').val();
                    var slider1a = $('#Agrade-1a').val();
                    if(parseInt(slider1b)==parseInt(slider1a))
                    {
                      $('#Agrade-1b').val(parseInt(slider1b)+10).slider("refresh");
                    }
                  });
                  //slider c maximum change
                  $("#Cgrade-1b").change(function() 
                  {
                    var slider_val = $('#Cgrade-1b').val();
                    $('#Bgrade-1a').val(parseInt(slider_val)+1).slider("refresh");
                    // var slider1b = $('#Bgrade-1b').val();
                    // var slider1a = $('#Bgrade-1a').val();
                    // if(parseInt(slider1b)==parseInt(slider1a))
                    // {
                    //   $('#Bgrade-1b').val(parseInt(slider1b)+10).slider("refresh");
                    // }
                  });
                  //slider b maximum change
                  $("#Dgrade-1b").change(function() 
                  {
                    var slider_val = $('#Dgrade-1b').val();
                    $('#Cgrade-1a').val(parseInt(slider_val)+1).slider("refresh");
                    // var slider1b = $('#Cgrade-1b').val();
                    // var slider1a = $('#Cgrade-1a').val();
                    // if(parseInt(slider1b)==parseInt(slider1a))
                    // {
                    //   $('#Cgrade-1b').val(parseInt(slider1b)+10).slider("refresh");
                    // }
                  });
              });

 }


 )(jQuery);
