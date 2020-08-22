$(document).ready(function () {
  $('#ajax-form button[type="submit"]').click((event) => {
    event.preventDefault()
    //====== ajax打包資料 ====================================================================================================

    //====== ajax資料回顯 ====================================================================================================
    $.get('./step5', {
      u: $('#ajax-form input[name=USER]').val(),
      c: $('#ajax-form input[name=CARD]').val(),
      s: $('#ajax-form input[name=SPEND]').val(),
      m: $('#ajax-form input[name=IMG]').val(),
      i: $('#ajax-form input[name=IN]').val(),
      o: $('#ajax-form input[name=OUT]').val(),


      y: $('#ajax-form input[name=YEAR]').val(),
      mon: $('#ajax-form input[name=MONTH]').val(),
      d: $('#ajax-form input[name=DATE]').val(),
      pw: $('#ajax-form input[name=PAYWAY]').val(),

    }, (data) => {



      $('.pay_spendlist').html(data);
    })

    //====== ajax同步等待loading ====================================================================
    setTimeout(() => { //update `div#ajax-output` first
      $('#ajax-output').html('')
    }, 0)
  })
});


$(document).ready(function () {
  $('#ajax-form_card_load button[type="submit"]').click((event) => {
    event.preventDefault()
    //====== ajax資料回顯 ====================================================================================================
    $.get('./card_load', {
      u_load: $('#ajax-form_card_load input[name=USER_LOAD]').val(),
    }, (data) => {
      $('#pay_home').html(data);
    })

    //====== ajax同步等待loading ====================================================================
    setTimeout(() => { //update `div#ajax-output` first
      $('#pay_home').html('')
    }, 0)
  })
});



////===========like card===================================================================================
$(document).ready(function () {
  $('#ajax-form_cardlike button[type="submit"]').click((event) => {
    event.preventDefault()
    //====== ajax打包資料 ====================================================================================================

    //====== ajax資料回顯 ====================================================================================================
    $.get('./step5_cardlike', {
      u_cardlike: $('#ajax-form_cardlike input[name=USER_cardlike]').val(),
      c_cardlike: $('#ajax-form_cardlike input[name=CARD_cardlike]').val(),
      s_cardlike: $('#ajax-form_cardlike input[name=SPEND_cardlike]').val(),
      m_cardlike: $('#ajax-form_cardlike input[name=IMG_cardlike]').val(),
      i_cardlike: $('#ajax-form_cardlike input[name=IN_cardlike]').val(),
      o_cardlike: $('#ajax-form_cardlike input[name=OUT_cardlike]').val(),


      y_cardlike: $('#ajax-form_cardlike input[name=YEAR_cardlike]').val(),
      mon_cardlike: $('#ajax-form_cardlike input[name=MONTH_cardlike]').val(),
      d_cardlike: $('#ajax-form_cardlike input[name=DATE_cardlike]').val(),
      pw_cardlike: $('#ajax-form_cardlike input[name=PAYWAY_cardlike]').val(),

    }, (data) => {



      $('.pay_spendlist').html(data);
    })

    //====== ajax同步等待loading ====================================================================
    setTimeout(() => { //update `div#ajax-output` first
      $('#ajax-output').html('')
    }, 0)
  })
});


$(document).ready(function () {
  $('#ajax-form_card_load_cardlike button[type="submit"]').click((event) => {
    event.preventDefault()
    //====== ajax資料回顯 ====================================================================================================
    $.get('./card_load_cardlike', {
      u_load_cardlike: $('#ajax-form_card_load_cardlike input[name=USER_LOAD_cardlike]').val(),
    }, (data) => {
      $('#pay_home2').html(data);
    })

    //====== ajax同步等待loading ====================================================================
    setTimeout(() => { //update `div#ajax-output` first
      $('#pay_home2').html('')
    }, 0)
  })
});


//================================================================================================================




$("#p_header_span_number").click(function () {
  ham_hide();
  document.getElementById("ng_Page_4to8").style.display = "none";

  document.getElementById("pay_home").style.display = "none";
  document.getElementById("pay_view").style.display = "none";

        document.getElementById("ajax-output_notice").style.display = "none";
        document.getElementById("ng_Comment").style.display = "none";
  document.getElementById("pay_search").style.display = "none";
  $(".ng_collection").css({"display":"none"});
  
$('#totalmytalk_u_annmy').val(mail);
  $('#view_b_totalmytalk_annmy').trigger('click');



  $(".ng_mypost").css({"display":"block"});
  $('#p_title').html("我的貼文");
});
$("#p_header_span_number2").click(function () {
  ham_hide();
  $("#bottom_buttom")[0].style.opacity = '1';
   //document.getElementById("bottom_buttom").style.display= 'block';
  $('.ng_collection').css('display','none');
        document.getElementById("pay_view").style.display = "none";
        document.getElementById("pay_search").style.display = "none";
        document.getElementById("ajax-output_notice").style.display = "none";
        document.getElementById("ajax-output_totalmytalk_annmy").style.display = "none";
       
        document.getElementById("ng_Comment").style.display = "none";
        document.getElementById("ng_Page_4to8").style.display = "none";
       
  
  
  document.getElementById("pay_home").style.display="block";
  document.getElementById("u_load").value=pay_user;
  $('#b_load').get(0).click();
  $('#p_title').html("我的卡片");
});
