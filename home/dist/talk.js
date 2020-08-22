$(document).ready(function() {                     //取text
  $('#ajax-form_text button[type="submit"]').click((event) => {
    event.preventDefault()
//====== ajax資料回顯 ====================================================================================================
$.get('./step5_text', {
  tp: $('#ajax-form_text input[name=TOPIC]').val(),
  th: $('#ajax-form_text input[name=COM_H]').val(),
  tc: $('#ajax-form_text input[name=COM_T]').val(),
  tu: $('#ajax-form_text input[name=COM_U]').val(),
  tup: $('#ajax-form_text input[name=COM_UP]').val(),
}, (data) => { 
 
$('#ng_Comment').css('display','block');
$('#ng_Comment').html(data);
document.getElementById("notice_u").value=pay_user;
$('#view_b_notice').get(0).click();

})
//====== ajax同步等待loading ====================================================================
setTimeout(() => {    //update `div#ajax-output` first
  $('#ng_Comment').html('loading')
}, 0)
  })
});


$(document).ready(function() {                            //load
  $('#ajax-form_notice button[type="submit"]').click((event) => {
    event.preventDefault()
//====== ajax資料回顯 ====================================================================================================
$.get('./step5_notice', {

  nu: $('#ajax-form_notice input[name=NOTEUSER]').val(),


}, (data) => { 
    
$('#ajax-output_notice').html(data);
})


//====== ajax同步等待loading ====================================================================
setTimeout(() => {    //update `div#ajax-output` first
  $('#ajax-output_notice').html('loading')
}, 0)


  })
});



$(document).ready(function() {                            //load
  $('#ajax-form_cardnote button[type="submit"]').click((event) => {
    event.preventDefault()
//====== ajax資料回顯 ====================================================================================================
$.get('./step5_cardnote', {


}, (data) => { 
    
//$('#ajax-output_card_update_notice').html("qwewrwer");
})


//====== ajax同步等待loading ====================================================================
setTimeout(() => {    //update `div#ajax-output` first
  //$('#ajax-output_card_update_notice').html('loading')
}, 0)


  })
});




$(document).ready(function() {                            //load
  $('#ajax-form_load_count button[type="submit"]').click((event) => {
    event.preventDefault()
//====== ajax資料回顯 ====================================================================================================
$.get('./card_load_count', {
u_load_count: $('#ajax-form_load_count input[name=NOTEUSER_load_count]').val(),


}, (data) => { 
    console.log(data.c_count);   
    console.log(data.t_count);
    var a=data.c_count;
    var b=data.t_count;  

document.getElementById("p_header_span_number2").value=a;
    document.getElementById("p_header_span_number").value=b;

$("#p_header_span_number2").html(a); 
$("#p_header_span_number").html(b);    
console.log(document.getElementById("p_header_span_number2").value);   
    console.log(document.getElementById("p_header_span_number").value);
    
    

//$('#ajax-output_load_count').html("qwewrwer");
})


//====== ajax同步等待loading ====================================================================
setTimeout(() => {    //update `div#ajax-output` first
  //$('#ajax-output_load_count').html('loading')
}, 0)


  })
});




$(document).ready(function() {                            //load
  $('#ajax-form_total button[type="submit"]').click((event) => {
    event.preventDefault()
//====== ajax資料回顯 ====================================================================================================
$.get('./step5_total', {


}, (data) => { 
    
$('#ajax-output_total').html(data);
})


//====== ajax同步等待loading ====================================================================
setTimeout(() => {    //update `div#ajax-output` first
  $('#ajax-output_total').html('loading')
}, 0)


  })
});



$(document).ready(function() {                            //load
  $('#ajax-form_totalmytalk button[type="submit"]').click((event) => {
    event.preventDefault()
//====== ajax資料回顯 ====================================================================================================
$.get('./step5_totalmytalk', {

  lu: $('#ajax-form_totalmytalk input[name=TMYTUSER]').val(),

}, (data) => { 
    
$('#ajax-output_totalmytalk').html(data);
})


//====== ajax同步等待loading ====================================================================
setTimeout(() => {    //update `div#ajax-output` first
  $('#ajax-output_totalmytalk').html('loading')
}, 0)


  })
});


$(document).ready(function() {                            //load
  $('#ajax-form_totalmytalk_annmy button[type="submit"]').click((event) => {
    event.preventDefault()
//====== ajax資料回顯 ====================================================================================================
$.get('./step5_totalmytalk_annmy', {

  lu_annmy: $('#ajax-form_totalmytalk_annmy input[name=TMYTUSER_annmy]').val(),

}, (data) => { 
    
$('#ajax-output_totalmytalk_annmy').html(data);
})


//====== ajax同步等待loading ====================================================================
setTimeout(() => {    //update `div#ajax-output` first
  $('#ajax-output_totalmytalk_annmy').html('loading')
}, 0)


  })
});




$(document).ready(function() {                            //load
  $('#ajax-form_totalhottalk button[type="submit"]').click((event) => {
    event.preventDefault()
//====== ajax資料回顯 ====================================================================================================
$.get('./step5_totalhottalk', {

  //lu: $('#ajax-form_totalmytalk input[name=TMYTUSER]').val(),

}, (data) => { 
    
$('#ajax-output_totalhottalk').html(data);
})


//====== ajax同步等待loading ====================================================================
setTimeout(() => {    //update `div#ajax-output` first
  $('#ajax-output_totalhottalk').html('loading')
}, 0)


  })
});




$(document).ready(function() {                            //load
  $('#ajax-form_announce button[type="submit"]').click((event) => {
    event.preventDefault()
//====== ajax資料回顯 ====================================================================================================
$.get('./step5_announce', {
  wt: $('#ajax-form_announce input[name=ATOPIC]').val(),
  wmsg: $('#ajax-form_announce input[name=AICON]').val(),

  wsub: $('#ajax-form_announce input[name=ASUB]').val(),

  //whot: $('#ajax-form_announce input[name=wHOT]').val(),

  //wday: $('#ajax-form_announce input[name=wDAY]').val(),

  wtext: $('#ajax-form_announce input[name=ATEXT]').val(),

}, (data) => { 
    
$('#ajax-output_total').html(data);
})


//====== ajax同步等待loading ====================================================================
setTimeout(() => {    //update `div#ajax-output` first
  $('#ajax-output_announce').html('loading')
}, 0)


  })
});



$(document).ready(function() {                            //load
  $('#ajax-form_talklike button[type="submit"]').click((event) => {
    event.preventDefault()
//====== ajax資料回顯 ====================================================================================================
$.get('./step5_talklike', {
  tltop: $('#ajax-form_talklike input[name=TLTOPIC]').val(),
  tlu: $('#ajax-form_talklike input[name=TLUSER]').val(),

}, (data) => { 
    
//$('#ajax-output_total').html(data);
})


//====== ajax同步等待loading ====================================================================
setTimeout(() => {    //update `div#ajax-output` first
 // $('#ajax-output_announce').html('loading')
}, 0)


  })
});


var mail;


$('#ng_SignupByEmail').click(function (){
    $('.ng_Page_1').css("display","none");
    $('.ng_Page_1-3').css("display","block");
})

$('#ng_button_Signin').click(function (){
    $('.ng_Page_1').css("display","none");
    $('.ng_Page_2').css("display","block");
})

$('#ng_SigninByEmail').click(function(){
    $('.ng_Page_2').css("display","none");
    $('.ng_Page_2-3').css("display","block");
})

$('#ng_Page_2_back').click(function(){
    $('.ng_Page_2').css("display","none");
    $('.ng_Page_1').css("display","block");
})

//@@@@@@@@@@@@@@@@6/27
function ng_log1(){
  $('.ng_Page_1-3').css("display","none");
    $('.ng_Page_1').css("display","block");
}
function ng_log2(){
  $('.ng_Page_1-3').css("display","none");
    $('.ng_Page_1').css("display","block");
}

function ng_function_1(){
  $('.ng_Page_1-3').css("display","none");
  $('.ng_Page_1').css("display","block");
  $('.ng_input1').html('');
  $('#ng_SignupResponse').html('');
  }

  function ng_function_2(){
    $('.ng_Page_2-3').css("display","none");
    $('.ng_Page_2').css("display","block");
    $('.ng_input1').html('');
    $('#ng_SigninResponse').html('');
}

function ng_function_3(t){//signup by email
  var n,e,p,c,s,pic;
  n=$('#ng_input2').html();
  e=$('#ng_input1').html();
  p=$('#ng_input3').html();
  c=$('#ng_input4').html();
  console.log(t);
  if(t===0)//state type(0=mail,1=fb,2=google)
  {
    s='mail';
    pic='./pic/defaultProfilePic.svg';
  }
  else if(t===1)
{

}
else if(t===2)
{

}
  if(e.length>35)
  $('#ng_SignupResponse').html('Email must less than 35 character');
  else if(n.length>20)
  $('#ng_SignupResponse').html('Name must less than 20 character');
  else if(p.length>15)
  $('#ng_SignupResponse').html('Password must less than 15 character');
  else if(c!==p)
  $('#ng_SignupResponse').html('Password and confirm password does not match');
  else{
  $.get('./ngSignup',{
  Email:e,
  Password:p,
  Name:n,
  State:s,
  Pic:pic,
  },(data)=>{
  
  if(data=='existed'){
  $('#ng_SignupResponse').html('Email existed');
  }
  else if(data=='true')
  {
  mail =e;pay_user=mail;
  console.log('signup success');
  console.log('mail:'+mail);
  /*
  跳轉頁面
  */
 $('.ng_Page_1-3').css("display","none");
$('header').css("display","block");
$('#ng_ProfilePic').css("display","block");
$('.p_buttom').css("display","flex");
open_talk();
$('#ng_SignupResponse').html('');
$('.ng_input1').html('');
  }
})
}

}

function ng_function_4(){//signin by email

  var e,p;
  e=$('#ng_input5').html();
  p=$('#ng_input6').html();
  
  if(e.length>35)
  $('#ng_SigninResponse').html('Email must less than 35 character');
  
  else if(p.length>15)
  $('#ng_SigninResponse').html('Password must less than 15 character');
  
  else{
  $.get('./ngLogin',{
  Email:e,
  Password:p,
  },(data)=>{
  
  if(data=='falseE'){
  $('#ng_SigninResponse').html('Email no found');
  $('.ng_input1').html('');
  }
  else if(data=='falseP')
  {
      $('#ng_SigninResponse').html('Wrong password');
      $('.ng_input1').html('');
  }
  else if(data=='true')
  {
  mail =e;
    pay_user=mail;
  console.log('Login success');
  /*
  跳轉頁面
  */
  $('.ng_Page_2-3').css("display","none");
  $('header').css("display","block");
  $('#ng_ProfilePic').css("display","block");
  $('.p_buttom').css("display","flex");
open_talk();
  
  $('.ng_input1').html('');
  $('#ng_SigninResponse').html('');
  
  }
  })
  }
  
  }
  
  $(".ng_input1").keypress(function(e){ 
    return e.which != 13; 
  });

  function ng_fb(){

   FB.login(function(response) {
    // handle the response
    checkLoginState();
  }, {scope: 'email,public_profile'});

  }
 
  function ng_gg(){
  
  }

  //google and fb ~~~ also need to update
//google init()
function ng_function6(page){

  if(page===1)
  {
  $('#ajax-output_total').css("display",'block'); 
  $('#ajax-output_totalhottalk').css("display",'none');
  $('#load_talk').get(0).click();
  }
  else if(page ===2)
  {
    $('#ajax-output_totalhottalk').css("display",'block');
    $('#ajax-output_total').css("display",'none');
  $('#view_b_totalhottalk').trigger('click');
  }
  else if(page ===3)
  {
    $('#ng_Post_frame3').css("display",'block');
    $('#ajax-output_totalmytalk').css("display",'none');
  }
  else if(page ===4)
  {
    $('#ajax-output_totalmytalk').css("display",'block');
    $('#ng_Post_frame3').css("display",'none');
    $('#totalmytalk_u').val(mail);
    $('#view_b_totalmytalk').trigger('click');

  }



}

function ng_function5(){


    $('#ng_Comment').css("display",'none');
  

}

function ng_function7(temp){//open write post

  if(temp===1)//open
{
  $(".ng_writePostBlock").css('display','block');
  $(".ng_MainInterface_4to8_6").css('display','none');
}
  else if(temp ===2)//close
{
  $(".ng_MainInterface_4to8_6").css('display','block');
$(".ng_writePostBlock").css('display','none');
$("#ng_writePostBlock_title").html('');
$("#ng_writePostBlock_main").html('');



}

}

  
$("#ng_writePostBlock_title").keypress(function(e){ 
  return e.which != 13; 
});

$(".ng_writePostBlock_top_class").click(function() {
  for(i=2;i<=5;i++)
  {
  $('.ng_writePostBlock_top_class:nth-child('+i+')').css('background-color', '#2B2D34');  
  if(i==2)
  $('.ng_writePostBlock_top_class:nth-child('+i+')').children().attr('src','./pic/Group228-1.svg');
  else if(i==3)
  $('.ng_writePostBlock_top_class:nth-child('+i+')').children().attr('src','./pic/Group227-1.svg');
  else if(i==4)
  $('.ng_writePostBlock_top_class:nth-child('+i+')').children().attr('src','./pic/Group226-1.svg');
  else if(i==5)
  $('.ng_writePostBlock_top_class:nth-child('+i+')').children().attr('src','./pic/Group225-1.svg');
  if(i-1===$(this).index())
      {
        $(this).css('background-color','yellow');
        if(i==2)
        $('.ng_writePostBlock_top_class:nth-child('+i+')').children().attr('src','./pic/Group228-2.svg');
        else if(i==3)
        $('.ng_writePostBlock_top_class:nth-child('+i+')').children().attr('src','./pic/Group227-2.svg');
        else if(i==4)
        $('.ng_writePostBlock_top_class:nth-child('+i+')').children().attr('src','./pic/Group226-2.svg');
        else if(i==5)
        $('.ng_writePostBlock_top_class:nth-child('+i+')').children().attr('src','./pic/Group225-2.svg');
      }

}
});

function ng_function8(temp){

  if(temp==1)
{
$('.ng_Comment_block').css('opacity','0.3');
$('#ng_preventClick1').css('display','block');
}
  else if (temp==2)
{
$('.ng_Comment_block').css('opacity','1');
$('#ng_preventClick1').css('display','none');


}
}

function ng_function9(temp){
  $('.ng_Comment_rating').children().attr('src','./pic/Component 21 – 1.svg');
 
  if(temp==1)
  {
    $('.ng_Comment_rating:nth-child(1)').children().attr('src','./pic/Path 100.svg');
 
  }
  else if(temp==2)
  {
    $('.ng_Comment_rating:nth-child(1)').children().attr('src','./pic/Path 100.svg');
    $('.ng_Comment_rating:nth-child(2)').children().attr('src','./pic/Path 100-1.svg');
 
  }
  else if(temp==3)
  {
    $('.ng_Comment_rating:nth-child(1)').children().attr('src','./pic/Path 100.svg');
    $('.ng_Comment_rating:nth-child(2)').children().attr('src','./pic/Path 100-1.svg');
    $('.ng_Comment_rating:nth-child(3)').children().attr('src','./pic/Path 100-2.svg');
 
  }
}


function ng_function_writeComment(){

var topic =$('.ng_Comment_block').attr('name');
var ratepoint;
var comment =$('.ng_Comment_write_main').html();
var user =mail;
var pic =$('#p_sidebar').find('img').attr("src");
for(i=3;i>=1;i--)
{
  if(i==3&&$('.ng_Comment_rating:nth-child(3)').children().attr("src")=="./pic/Path 100-2.svg")
  {  ratepoint =3;
      break;
  }
  else if(i==2&&$('.ng_Comment_rating:nth-child(2)').children().attr("src")=="./pic/Path 100-1.svg")
    {ratepoint=2;
      break;
    }
    else if(i==1&&$('.ng_Comment_rating:nth-child(1)').children().attr("src")=="./pic/Path 100.svg")
    {ratepoint=1;
    break;
    }
}

$("#ajax-form_text input[name=TOPIC]").val(topic);
$("#ajax-form_text input[name=COM_H]").val(ratepoint);
$("#ajax-form_text input[name=COM_T]").val(comment);
$("#ajax-form_text input[name=COM_U]").val(user);
$("#ajax-form_text input[name=COM_UP]").val(pic);

$('#view_b_text').trigger('click');



}

function ng_function10(temp){

}

function ng_function_writePost(){


var icon;
var topic =$('#ng_writePostBlock_title').html();
var text =$('#ng_writePostBlock_main').html();
var subuser=mail;
for(i=5;i>=2;i--)
{
  if($('.ng_writePostBlock_top_class:nth-child('+i+')').css('background-color')=='rgb(255, 255, 0)')
  { 
     icon=i-2;
      break;
  }
}
$("#ajax-form_announce input[name=AICON]").val(icon);
$("#ajax-form_announce input[name=ATOPIC]").val(topic);
$("#ajax-form_announce input[name=ATEXT]").val(text);
$("#ajax-form_announce input[name=ASUB]").val(subuser);

$('#announce_b_text').trigger('click');
ng_function7(2);

}

function ng_function_LikeComment(){

var topic=$('.ng_Comment_block').attr('name');

$("#ajax-form_talklike input[name=TLTOPIC]").val(topic);
$("#ajax-form_talklike input[name=TLUSER]").val(mail);

$('#view_b_talklike').trigger('click');

}


//google fb script
//wraper zindex
//from ng_page_4to8 to ng_notification
//script yulin
