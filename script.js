
var steps = $(".page");
var stepNum=0;
var completedSteps=0;
var validation = [true,true,true]; // Validations for each step
var validateStep3=0 // Since on step 3 we have more than one field to check
$("#step1 .alert-message").addClass("inline");
$("#paid-internship").hide();
$("#support").hide();
step();

// Submit
$( "form" ).submit(function( event ) {
        // checking of validity of  step 3(Step 1 and 2 are already valid) :
        if(validateForm(2)){
            return;
        }
        event.preventDefault();

});
// Disable enter key
$(document).keypress(
    function(event){
      if (event.which == '13') {
        event.preventDefault();
      }
  });


$(".next").on('click',function(){
    if(validateForm(stepNum)){
        if(stepNum<completedSteps){
            stepNum+=1;
            step();
            }
        else {
             completedSteps+=1;
             stepNum+=1;
             step();
        } 

    }
    else{
        validateForm(stepNum);

    }


});
$(".previous").on('click',function(){
    stepNum-=1;
    step();
    
});
$(".progressbar li").on("click",function () {
    if(stepNum<$(".progressbar li").index(this)){
        if($(this).hasClass("active") && validateForm(stepNum)){
            stepNum=$(".progressbar li").index(this);
            step();
            }
    }
    else{
        if($(this).hasClass("active")){
            stepNum=$(".progressbar li").index(this);
            step();
            }
    }

});

$(".required:not(.telephone , .number)").focus(function(){
    $(this).parent().children(".alert-message").html("");
});
/////////////////////////////////
var values = {
    weeks:{
        min:10,
        max:52
    },
    cvnum:{
        min:1,
        max:150
    },
    trainees:{
        min:1,
        max:150
    },
    amount:{
        min:100,
        max:999
    }
};
$(".number").focusout(function(){
    var value=$(this).val();
    var id = $(this).attr('id');
    var min= values[id].min;
    var max=values[id].max;
    if(id=='trainees'){
        if(value<min || value>max){
            $(this).val("")
        }
    }
    else{
        if(value<min){
            $(this).val(min)
        }
        if(value>min){
            $(this).val(max)
        }
    }

});


$(".number").keyup(function(){
    var value=$(this).val();
    var id = $(this).attr('id');
    var min= values[id].min;
    var max=values[id].max;
    // if( input is not blank and contains non number elements)=> display alert message
   if(!isValidNumInput(value) && !(isBlank(value))){
       $(this).parent().children(".alert-message").html("Please input number");
       $(this).css("border-bottom","1px solid  red");
        if($(this).attr('name')=='trainees'){
            validation[1]=false;
        }
        else{
            validateStep3+=1;
            validation[2]=(validateStep3==0);
        }
   }
    // else=> delete alert message    
   else{
       $(this).parent().children(".alert-message").html("");
       if($(this).attr('name')=='trainees'){
            validation[1]=true;
        }
        else{
            validateStep3-=1;
            validation[2]=(validateStep3==0);
        }
   }
});



$(".telephone").keyup(function(){
    var value=$(this).val();
    if(!isValidNumInput(value) && !isBlank(value)){
        $(this).parent().children(".alert-message").html("Please input number");
        $(this).css("border-bottom","1px solid  red");
        validation[0]=false;
    }
    // if input is not blank and number is not valid => display alert message;
    else if(!(isValidTelephone(value)) && !(isBlank(value))){
        $(this).parent().children(".alert-message").html("Incorrect Number");
        $(this).css("border-bottom","1px solid  red");
        validation[0]=false;
    }
    else{
        $(this).parent().children(".alert-message").html("");
        validation[0]=true;
    }
});

$('input:radio[name="type"]').change(function(){
    if($(this).val() == 'paid'){
       $("#paid-internship").show();
       $("#amount").attr("required", true);
    }
    else{
        $("#paid-internship").hide();
        $("#amount").attr("required", false);
    }
});

$('input:radio[name="selection"]').change(function(){
    if($(this).val() == 'yes'){
       $("#support").show();
       $("#supportText").attr("required", true);
    }
    else{
        $("#support").hide();
        $("#supportText").attr("required", false);
    }
});

$("input[type='text'],input[type='email'],input[type='url']").focus(function(){
    $(this).attr("placeholder","");
    $(this).css("border-bottom","1px solid  #263238");
});
// Date Picker

    $( ".datepicker" ).datepicker({
    minDate: new Date(2020,2,2),
    maxDate: new Date(2020,11,30)});
  
// Criterias 
$("#hiddenTextarea").hide(); // this is actual container for criterias but user doesn't see it
$("#criterias-list").on('click','span',function(){ // when user click to delete icon list item is removed
    $(this).parent().fadeOut(500,function(){
        $(this).remove();
    });

});
$("#criteria").keypress(function(event){ // add criterias to list
    // if (user pressed enter)=>create new list item
    if(event.which === 13){
        // grabbing new criteria from input
        var inputText=$(this).val();

        $(this).val(""); // clearing input

        // create a new li and add it to ul
        $("#criterias-list").append("<li><span class='icon-wrapper'><i class='fas fa-trash'></i></span> "+inputText+"</li>");

        // write ul content to the textarea
        var text= $("#criterias-list").text();
        $("#hiddenTextarea").val(text);
        console.log($("#hiddenTextarea").val());
    }
});

// Functions
 // Function for display current step  
 function step() {
     if(stepNum==0){
        $(".page:not(#step1)").hide();
        $("#step1").show();
        $(".step-title").text("Company");
     }
     else if(stepNum==1){
        $(".page:not(#step2)").hide();
        $("#step2").show();
        $("#icon2").addClass("active");
        $(".step-title").text("Project");
     }
     else{
            $(".page:not(#step3)").hide();
            $("#step3").show();
            $("#icon3").addClass("active");
            $(".step-title").text("Terms & Conditions");
     }
     
 }   
 // Functions for Validity

 function isValidNumInput(input) {
    var numbers = /^[-+]?[0-9]+$/;

    if(!input.match(numbers)){
        return false
    }
    return true;
}  
function isValidTelephone(num){
    // Length of numbers in Azerbaijan is not more than 10
    return !(num.length>10);
}

function isBlank(val){
    return (val=="")||(val==null);
}

function validateForm(stepNum){
    var valid = true;

    const page = document.getElementsByClassName('page')[stepNum];

    const requiredFields = page.getElementsByClassName('required');
    for (let i = 0; i < requiredFields.length; i++) {
        if(requiredFields[i].checkValidity()){
        }
        else{
            valid=false;
            var message = requiredFields[i].parentElement.getElementsByClassName("alert-message")[0];
            message.textContent = "This field can't be blank";
            requiredFields[i].style.borderBottom="1px solid red"
        }
        
    }
    if(stepNum==1){
        var checked = page.querySelectorAll('input:checked');
        if(checked.length === 0){
            valid=false;
            var alert=document.getElementById("checkbox-message");
            alert.textContent= "Choose at least one speciality";
        }
        
    }
    return valid
};