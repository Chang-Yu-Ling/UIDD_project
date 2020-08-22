let inn = -1;
let out = -1;
let year = -1;
let bank = -1;
let head_html;
let search = 0;
let hot_card = 0;
$(".p_hot_card_select").click(function () {
  if (hot_card == 0) {
    $(".p_hot_card").animate({
      top: "14%",
    });
    hot_card = 1;




  } else {
    $(".p_hot_card").animate({
      top: "92%"
    });
    hot_card = 0;

  }


});
$("#p_other_sidebar").click(function () {
  $("#p_sidebar").addClass("p_off").animate({
    left: "-60%",
    opacity: "0.8"
  },{
    complete:function(){
    $(".p_wrapper").css({"display":"none"});
  }});
  $("#p_sidebar").removeClass("p_show");
  $("#p_other_sidebar").addClass("d-none");

});

$("#ham,#ham2").click(function () {
  
  if ($("#p_sidebar").hasClass("p_off") == 1) {
    $(".p_wrapper").css({"display":"block"});
    $("#p_sidebar").addClass("p_show").animate({
      left: "0",
      opacity: "1"
    });
      
    

    $("#p_sidebar").removeClass("p_off");
    $("#p_other_sidebar").removeClass("d-none");
    
  } else {
    if ($("#p_sidebar").hasClass("p_off") == 0) {
      $("#p_sidebar").addClass("p_off").animate({
        left: "-60%",
        opacity: "0.8"
      },{
        complete:function(){
        $(".p_wrapper").css({"display":"none"});
      }});
      $("#p_sidebar").removeClass("p_show");
      $("#p_other_sidebar").addClass("d-none");
      
    }
  }
  document.getElementById("load_count_u").value = pay_user;
  console.log(pay_user);
  $("#view_b_load_count").get(0).click();
});

$("input[name *= 'select']").click(function () {
  $(".p_select-btn-show").addClass("d-none");
  $(".p_select-btn-extend").removeClass("d-none");
});

$("#p_cancel").click(function () {
  $(".p_select-btn-show").removeClass("d-none");
  $(".p_select-btn-extend").addClass("d-none");
});

$("input[name *= 'submit']").click(function () {
  if (inn == -1 || out == -1 || year == -1 || bank == -1) {
    Swal.fire({
      title: "查詢卡片失敗", //標題
      html: "請輸入查詢條件", //訊息內容(可省略)
      icon: "warning",
      animation: false //圖示(可省略) success/info/warning/error/question
      //圖示範例：https://sweetalert2.github.io/#icons
    });
  } else {
    $(".p_hot_card").addClass("d-none");
    $(".p_select-btn-extend").addClass("d-none");
    $(".p_card_display").css({
      "height": "91%",
      "width": "95%",
      "margin-left": "2.5%",
      "border-radius": "1.2em",

    });
    $(".p_card_display").removeClass("d-none");
    display();
  }
});


$("#p_in_less1,#p_in_bigger1,#p_in_bigger25").click(function () {

  $("#p_in_less1").css({
    "background-color": "#2B2D34",
    "color": "white"
  })
  $("#p_in_bigger1").css({
    "background-color": "#2B2D34",
    "color": "white"
  })
  $("#p_in_bigger25").css({
    "background-color": "#2B2D34",
    "color": "white"
  })
  $(this).css({
    "background-color": "#FFDD00",
    "color": "black"
  });
  inn = $(this).attr("id");
});

$("#p_out_less2,#p_out_bigger2").click(function () {

  $("#p_out_less2").css({
    "background-color": "#2B2D34",
    "color": "white"
  })
  $("#p_out_bigger2").css({
    "background-color": "#2B2D34",
    "color": "white"
  })
  $(this).css({
    "background-color": "#FFDD00",
    "color": "black"
  });

  out = $(this).attr("id");

});

$("#p_y_none,#p_y_less3,#p_y_bigger3").click(function () {

  $("#p_y_none").css({
    "background-color": "#2B2D34",
    "color": "white"
  })
  $("#p_y_less3").css({
    "background-color": "#2B2D34",
    "color": "white"
  })
  $("#p_y_bigger3").css({
    "background-color": "#2B2D34",
    "color": "white"
  })
  $(this).css({
    "background-color": "#FFDD00",
    "color": "black"
  });
  year = $(this).attr("id");

});

$("#p_mastercard,#p_visa,#p_ae,#p_jcb").click(function () {

  $("#p_mastercard").css({
    "background-color": "#2B2D34",
    "color": "white"
  })
  $("#p_visa").css({
    "background-color": "#2B2D34",
    "color": "white"
  })
  $("#p_ae").css({
    "background-color": "#2B2D34",
    "color": "white"
  })
  $("#p_jcb").css({
    "background-color": "#2B2D34",
    "color": "white"
  })
  $(this).css({
    "background-color": "#FFDD00",
    "color": "black"
  });
  bank = $(this).attr("id");

});

$("#p_close").click(function () {
  $(".p_hot_card").removeClass("d-none");
  $(".p_card_display").addClass("d-none");
  $(".p_select-btn-show").removeClass("d-none");
  $("#p_in_less1,#p_in_bigger1,#p_in_bigger25,#p_out_less2,#p_out_bigger2,#p_y_none, #p_y_less3, #p_y_bigger3, #p_mastercard, #p_visa, #p_ae, #p_jcb ").css({
    "background-color": "#2B2D34",
    "color": "white"
  });
  inn = -1;
  out = -1;
  year = -1;
  bank = -1;
  search = 0;
  $(".p_card_list").empty().removeClass("d-none");
  $(".p_card_detail").empty().addClass("d-none");
  $(".p_card_display_header").empty().removeAttr("style");


});
$(".p_q").click(function () {
  search = 1;
  $(".p_select-btn-show").addClass("d-none");
  $(".p_select-btn-extend").addClass("d-none");
  $(".p_card_display").css({
    "height": "91%",
    "width": "95%",
    "margin-left": "2.5%",
    "border-radius": "1.2em",

  });
  $(".p_card_display").removeClass("d-none");
  $(".p_hot_card").addClass("d-none");
  display();
});




function display() {




  let aa = $.ajax({
    url: "card_data2.json",
    async: false
  });
  $('#p_list').empty();
  let c_data = aa.responseJSON;



  let count = new Array(c_data.name.length);
  let value_in = new Array(c_data.name.length);
  let value_out = new Array(c_data.name.length);
  let value_year = new Array(c_data.name.length);
  let list = new Array(c_data.name.length);

  for (i = 0; i < c_data.name.length; i++) {
    count[i] = i;
    let a = c_data.v_in[i].split("%", 5);
    let b = c_data.v_out[i].split("%", 5);
    let c = c_data.v_year[i].split("$", 5);
    list[i] = 0;
    value_in[i] = a[0];
    value_out[i] = b[0];
    if (c[0] == "NT") value_year[i] = c[1];
    else value_year[i] = c[0];
  }


  let h_a;
  let h_b;
  let h_c;
  let bank_value;
  if (inn == "p_in_less1") h_a = "國內<1%";
  else if (inn == "p_in_bigger1") h_a = "國內>1%";
  else if (inn == "p_in_bigger25") h_a = '國內>2.5%';

  if (out == "p_out_less2") h_b = '國內<2%';
  else if (out == "p_out_bigger2") h_b = '國內>2%';

  if (year == "p_y_none") h_c = '無年費';
  else if (year == "p_y_less3") h_c = '年費<3K';
  else if (year == "p_y_bigger3") h_c = '年費>3K';

  if (bank == "p_mastercard") bank_value = "Mastercard";
  else if (bank == "p_visa") bank_value = "VISA";
  else if (bank == "p_ae") bank_value = "美國運通卡";
  else if (bank = "p_jcb") bank_value = "JCB";


  let bankk = JSON.parse(aa.responseText);

  for (var i in bankk.finance) {

    if (bankk.finance[i].bank == bank_value) {
      list[i] = 1;

    }

  }
  if (search == 0) {
    let head = '<span class="p_card_display_header_style">' + h_a + '</span>' +
      '<span class="p_card_display_header_style">' + h_b + '</span>' +
      '<span class="p_card_display_header_style">' + h_c + '</span>';
    $('.p_card_display_header').empty();
    // $(head).appendTo('.p_card_display_header');
  }
  if (inn == "p_in_less1" && out == "p_out_less2" && year == "p_y_none") {
    for (i = 0; i < c_data.name.length; i++) {
      if (value_in[i] < 1 && value_out[i] < 2 && (value_year[i] == "首年無年費" || value_year[i] == "0") && list[i] == 1) {
        let a = '<li class="p_card" id=p_' + parseInt(i, 10) + '>' +
          '<div style="width: 100%;height: 82%;">' +
          '<div class="p_card_name">' +
          c_data.name[i] + '</div>' +
          '<div style="height: 87.5%;width: 100%;background-color: #2B2D34;border-radius:0.6em">' +
          '<img class="p_card_img" src="' + c_data.img[i] + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div' +
          '</div>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_list');

      }

    }

  } else if (inn == "p_in_less1" && out == "p_out_less2" && year == "p_y_less3") {
    for (i = 0; i < c_data.name.length; i++) {
      if (value_in[i] < 1 && value_out[i] < 2 && value_year[i] < 3000 && list[i] == 1) {

        let a = '<li class="p_card" id=p_' + parseInt(i, 10) + '>' +
          '<div style="width: 100%;height: 82%;">' +
          '<div class="p_card_name">' +
          c_data.name[i] + '</div>' +
          '<div style="height: 87.5%;width: 100%;background-color: #2B2D34;border-radius:0.6em">' +
          '<img class="p_card_img" src="' + c_data.img[i] + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div' +
          '</div>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_list');

      }
    }

  } else if (inn == "p_in_less1" && out == "p_out_less2" && year == "p_y_bigger3") {
    for (i = 0; i < c_data.name.length; i++) {
      if (value_in[i] < 1 && value_out[i] < 2 && value_year[i] >= 3000 && list[i] == 1) {

        let a = '<li class="p_card" id=p_' + parseInt(i, 10) + '>' +
          '<div style="width: 100%;height: 82%;">' +
          '<div class="p_card_name">' +
          c_data.name[i] + '</div>' +
          '<div style="height: 87.5%;width: 100%;background-color: #2B2D34;border-radius:0.6em">' +
          '<img class="p_card_img" src="' + c_data.img[i] + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div' +
          '</div>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_list');

      }
    }

  } else if (inn == "p_in_less1" && out == "p_out_bigger2" && year == "p_y_none") {
    for (i = 0; i < c_data.name.length; i++) {
      if (value_in[i] < 1 && value_out[i] >= 2 && (value_year[i] == "首年無年費" || value_year[i] == "0") && list[i] == 1) {

        let a = '<li class="p_card" id=p_' + parseInt(i, 10) + '>' +
          '<div style="width: 100%;height: 82%;">' +
          '<div class="p_card_name">' +
          c_data.name[i] + '</div>' +
          '<div style="height: 87.5%;width: 100%;background-color: #2B2D34;border-radius:0.6em">' +
          '<img class="p_card_img" src="' + c_data.img[i] + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div' +
          '</div>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_list');
      }
    }

  } else if (inn == "p_in_less1" && out == "p_out_bigger2" && year == "p_y_less3") {
    for (i = 0; i < c_data.name.length; i++) {
      if (value_in[i] < 1 && value_out[i] >= 2 && value_year[i] < 3000 && list[i] == 1) {
        let a = '<li class="p_card" id=p_' + parseInt(i, 10) + '>' +
          '<div style="width: 100%;height: 82%;">' +
          '<div class="p_card_name">' +
          c_data.name[i] + '</div>' +
          '<div style="height: 87.5%;width: 100%;background-color: #2B2D34;border-radius:0.6em">' +
          '<img class="p_card_img" src="' + c_data.img[i] + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div' +
          '</div>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_list');

      }
    }
  } else if (inn == "p_in_less1" && out == "p_out_bigger2" && year == "p_y_bigger3") {
    for (i = 0; i < c_data.name.length; i++) {
      if (value_in[i] < 1 && value_out[i] >= 2 && value_year[i] >= 3000 && list[i] == 1) {

        let a = '<li class="p_card" id=p_' + parseInt(i, 10) + '>' +
          '<div style="width: 100%;height: 82%;">' +
          '<div class="p_card_name">' +
          c_data.name[i] + '</div>' +
          '<div style="height: 87.5%;width: 100%;background-color: #2B2D34;border-radius:0.6em">' +
          '<img class="p_card_img" src="' + c_data.img[i] + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div' +
          '</div>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_list');
      }
    }

  } else if (inn == "p_in_bigger1" && out == "p_out_less2" && year == "p_y_none") {
    for (i = 0; i < c_data.name.length; i++) {
      if (value_in[i] >= 1 && value_out[i] < 2 && (value_year[i] == "首年無年費" || value_year[i] == "0") && list[i] == 1) {
        let a = '<li class="p_card" id=p_' + parseInt(i, 10) + '>' +
          '<div style="width: 100%;height: 82%;">' +
          '<div class="p_card_name">' +
          c_data.name[i] + '</div>' +
          '<div style="height: 87.5%;width: 100%;background-color: #2B2D34;border-radius:0.6em">' +
          '<img class="p_card_img" src="' + c_data.img[i] + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div' +
          '</div>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_list');

      }
    }

  } else if (inn == "p_in_bigger1" && out == "p_out_less2" && year == "p_y_less3") {
    for (i = 0; i < c_data.name.length; i++) {
      if (value_in[i] >= 1 && value_out[i] < 2 && value_year[i] < 3000 && list[i] == 1) {
        let a = '<li class="p_card" id=p_' + parseInt(i, 10) + '>' +
          '<div style="width: 100%;height: 82%;">' +
          '<div class="p_card_name">' +
          c_data.name[i] + '</div>' +
          '<div style="height: 87.5%;width: 100%;background-color: #2B2D34;border-radius:0.6em">' +
          '<img class="p_card_img" src="' + c_data.img[i] + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div' +
          '</div>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_list');
      }
    }

  } else if (inn == "p_in_bigger1" && out == "p_out_less2" && year == "p_y_bigger3") {
    for (i = 0; i < c_data.name.length; i++) {
      if (value_in[i] >= 1 && value_out[i] < 2 && value_year[i] >= 3000 && list[i] == 1) {

        let a = '<li class="p_card" id=p_' + parseInt(i, 10) + '>' +
          '<div style="width: 100%;height: 82%;">' +
          '<div class="p_card_name">' +
          c_data.name[i] + '</div>' +
          '<div style="height: 87.5%;width: 100%;background-color: #2B2D34;border-radius:0.6em">' +
          '<img class="p_card_img" src="' + c_data.img[i] + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div' +
          '</div>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_list');

      }
    }

  } else if (inn == "p_in_bigger1" && out == "p_out_bigger2" && year == "p_y_none") {
    for (i = 0; i < c_data.name.length; i++) {
      if (value_in[i] >= 1 && value_out[i] >= 2 && (value_year[i] == "首年無年費" || value_year[i] == "0") && list[i] == 1) {
        let a = '<li class="p_card" id=p_' + parseInt(i, 10) + '>' +
          '<div style="width: 100%;height: 82%;">' +
          '<div class="p_card_name">' +
          c_data.name[i] + '</div>' +
          '<div style="height: 87.5%;width: 100%;background-color: #2B2D34;border-radius:0.6em">' +
          '<img class="p_card_img" src="' + c_data.img[i] + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div' +
          '</div>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_list');

      }
    }

  } else if (inn == "p_in_bigger1" && out == "p_out_bigger2" && year == "p_y_less3") {
    for (i = 0; i < c_data.name.length; i++) {
      if (value_in[i] >= 1 && value_out[i] >= 2 && value_year[i] < 3000 && list[i] == 1) {

        let a = '<li class="p_card" id=p_' + parseInt(i, 10) + '>' +
          '<div style="width: 100%;height: 82%;">' +
          '<div class="p_card_name">' +
          c_data.name[i] + '</div>' +
          '<div style="height: 87.5%;width: 100%;background-color: #2B2D34;border-radius:0.6em">' +
          '<img class="p_card_img" src="' + c_data.img[i] + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div' +
          '</div>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_list');

      }
    }

  } else if (inn == "p_in_bigger1" && out == "p_out_bigger2" && year == "p_y_bigger3") {
    for (i = 0; i < c_data.name.length; i++) {
      if (value_in[i] >= 1 && value_out[i] >= 2 && value_year[i] > 3000 && list[i] == 1) {

        let a = '<li class="p_card" id=p_' + parseInt(i, 10) + '>' +
          '<div style="width: 100%;height: 82%;">' +
          '<div class="p_card_name">' +
          c_data.name[i] + '</div>' +
          '<div style="height: 87.5%;width: 100%;background-color: #2B2D34;border-radius:0.6em">' +
          '<img class="p_card_img" src="' + c_data.img[i] + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div' +
          '</div>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_list');

      }
    }

  } else if (inn == "p_in_bigger25" && out == "p_out_less2" && year == "p_y_none") {
    for (i = 0; i < c_data.name.length; i++) {
      if (value_in[i] >= 2.5 && value_out[i] < 2 && (value_year[i] == "首年無年費" || value_year[i] == "0") && list[i] == 1) {

        let a = '<li class="p_card" id=p_' + parseInt(i, 10) + '>' +
          '<div style="width: 100%;height: 82%;">' +
          '<div class="p_card_name">' +
          c_data.name[i] + '</div>' +
          '<div style="height: 87.5%;width: 100%;background-color: #2B2D34;border-radius:0.6em">' +
          '<img class="p_card_img" src="' + c_data.img[i] + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div' +
          '</div>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_list');
      }
    }

  } else if (inn == "p_in_bigger25" && out == "p_out_less2" && year == "p_y_less3") {
    for (i = 0; i < c_data.name.length; i++) {
      if (value_in[i] >= 2.5 && value_out[i] < 2 && value_year[i] < 3000 && list[i] == 1) {

        let a = '<li class="p_card" id=p_' + parseInt(i, 10) + '>' +
          '<div style="width: 100%;height: 82%;">' +
          '<div class="p_card_name">' +
          c_data.name[i] + '</div>' +
          '<div style="height: 87.5%;width: 100%;background-color: #2B2D34;border-radius:0.6em">' +
          '<img class="p_card_img" src="' + c_data.img[i] + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div' +
          '</div>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_list');

      }
    }

  } else if (inn == "p_in_bigger25" && out == "p_out_less2" && year == "p_y_bigger3") {
    for (i = 0; i < c_data.name.length; i++) {
      if (value_in[i] >= 2.5 && value_out[i] < 2 && value_year[i] >= 3000 && list[i] == 1) {

        let a = '<li class="p_card" id=p_' + parseInt(i, 10) + '>' +
          '<div style="width: 100%;height: 82%;">' +
          '<div class="p_card_name">' +
          c_data.name[i] + '</div>' +
          '<div style="height: 87.5%;width: 100%;background-color: #2B2D34;border-radius:0.6em">' +
          '<img class="p_card_img" src="' + c_data.img[i] + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div' +
          '</div>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_list');

      }
    }

  } else if (inn == "p_in_bigger25" && out == "p_out_bigger2" && year == "p_y_none") {
    for (i = 0; i < c_data.name.length; i++) {
      if (value_in[i] >= 2.5 && value_out[i] >= 2 && (value_year[i] == "首年無年費" || value_year[i] == "0") && list[i] == 1) {

        let a = '<li class="p_card" id=p_' + parseInt(i, 10) + '>' +
          '<div style="width: 100%;height: 82%;">' +
          '<div class="p_card_name">' +
          c_data.name[i] + '</div>' +
          '<div style="height: 87.5%;width: 100%;background-color: #2B2D34;border-radius:0.6em">' +
          '<img class="p_card_img" src="' + c_data.img[i] + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div' +
          '</div>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_list');

      }
    }

  } else if (inn == "p_in_bigger25" && out == "p_out_bigger2" && year == "p_y_less3") {
    for (i = 0; i < c_data.name.length; i++) {
      if (value_in[i] >= 2.5 && value_out[i] >= 2 && value_year[i] < 3000 && list[i] == 1) {

        let a = '<li class="p_card" id=p_' + parseInt(i, 10) + '>' +
          '<div style="width: 100%;height: 82%;">' +
          '<div class="p_card_name">' +
          c_data.name[i] + '</div>' +
          '<div style="height: 87.5%;width: 100%;background-color: #2B2D34;border-radius:0.6em">' +
          '<img class="p_card_img" src="' + c_data.img[i] + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div' +
          '</div>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_list');

      }
    }

  } else if (inn == "p_in_bigger25" && out == "p_out_bigger2" && year == "p_y_bigger3") {
    for (i = 0; i < c_data.name.length; i++) {
      if (value_in[i] >= 2.5 && value_out[i] >= 2 && value_year[i] >= 3000 && list[i] == 1) {

        let a = '<li class="p_card" id=p_' + parseInt(i, 10) + '>' +
          '<div style="width: 100%;height: 82%;">' +
          '<div class="p_card_name">' +
          c_data.name[i] + '</div>' +
          '<div style="height: 87.5%;width: 100%;background-color: #2B2D34;border-radius:0.6em">' +
          '<img class="p_card_img" src="' + c_data.img[i] + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div' +
          '</div>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_list');
      }
    }

  } else if (search == 1) {
    let value = $("#p_search_text").val();
    console.log(typeof (value));
    for (i = 0; i < c_data.name.length; i++) {
      if (c_data.name[i].includes(value) == true) {

        let a = '<li class="p_card" id=p_' + parseInt(i, 10) + '>' +
          '<div style="width: 100%;height: 82%;">' +
          '<div class="p_card_name">' +
          c_data.name[i] + '</div>' +
          '<div style="height: 87.5%;width: 100%;background-color: #2B2D34;border-radius:0.6em">' +
          '<img class="p_card_img" src="' + c_data.img[i] + '">' +
          '<div class="p_card_data">' +
          '<span class="p_card_data_style">年費:' + value_year[i] + '</span>' +
          '<span class="p_card_data_style">國內:' + value_in[i] + '%</span>' +
          '<span class="p_card_data_style">國外:' + value_out[i] + '%</span>' +
          '</div' +
          '</div>' +
          '</div>' +
          '</li>';
        $(a).appendTo('#p_list');
        console.log(a);
      }
    }
  }


  $(".p_card").click(function () {


    let id = $(this).attr("id");
    a = id.split("_", 3);
    id = a[1];
    $(".p_card_list").addClass("d-none");
    head_html = $(".p_card_display_header").html();
    console.log(head_html);

    $(".p_card_display_header").html(c_data.name[id]).css({
      "text-align": "center",
      "color": "white",
      "margin": "2% 0 0% 11%",
      "display": "inline"
    });
    $(".p_card_detail").removeClass("d-none").empty();

    let text = JSON.parse(aa.responseText);
    let obj = Object.entries(text.discount[id]);
    let temp = "";
    obj.forEach(([key, value], index) => {
      temp += key + "<p>" + value;
    });

    let obj2 = Object.entries(text.limit[id]);
    let temp2 = "";
    obj2.forEach(([key, value], index) => {
      if (key == 'age') temp2 += "最低申請年齡" + "&nbsp&nbsp&nbsp:&nbsp&nbsp&nbsp" + value + "<p>";
      else temp2 += "最低申請年薪" + "&nbsp&nbsp&nbsp:&nbsp&nbsp&nbsp" + value + "<p>";
    });

    let obj3 = Object.entries(text.finance[id]);
    let temp3 = "";
    obj3.forEach(([key, value], index) => {
      if (key == 'y_fee') temp3 += "國外手續費" + "&nbsp&nbsp&nbsp:&nbsp&nbsp&nbsp" + value + "<p>";
      else if (key == 'rate') temp3 += "年費" + "&nbsp&nbsp&nbsp:&nbsp&nbsp&nbsp" + value + "<p>";
      else if (key == 'rate_description') temp3 += "循環信用利率" + "&nbsp&nbsp&nbsp:&nbsp&nbsp&nbsp" + value + "<p>";
      else if (key == 'bank') temp3 += "發卡機構" + "&nbsp&nbsp&nbsp:&nbsp&nbsp&nbsp" + value + "<p>";
    });

    let html =
      '<div class="p_card_page_back">' +
      '  <img class="p_card_page_back_icon" style="margin-left:3%;width:10%" src="https://img.icons8.com/doodle/96/000000/return--v1.png" />' +
      '  </div><img class="p_card_detail_img" src="' + c_data.img[id] + '">' +


      '<div class = "p_card_detail_data">' +
      '<div style = "height:12.5%;width:95%;margin: 0 2.5% 0 2.5%;display:flex;flex-direction:row;padding:1.5em 0 0 0;font-size:0.9em" >' +
      '<span id = "p_data_btn_1"style = "border-radius: 1em;background-color:#F3F3F3;flex:1;padding:0.8% 1% 2% 1%;font-family:Segoe UI;font-size:2.2vmin/1;font-weight:bold" >' +
      '優惠訊息 </span> <span id = "p_data_btn_2"style = "flex:1;padding:0.8% 1% 2% 1%;font-family:Segoe UI;font-size:2.2vmin/1;color:white;font-weight:bold" > 申辦條件' +
      '</span> <span id = "p_data_btn_3"style = "flex:1;padding:0.8% 1% 2% 1%;font-family:Segoe UI;font-size:2.2vmin/1;color:white;font-weight:bold" > 卡片相關 ' +
      '</span> </div > <div style = "width:95%;margin:3% 2.5% 0 2.5%;height:70%;font-size:0.8em" >' +
      ' <div class = "p_data_1" style = "width:100%;height:100%;overflow-y:scroll;font-family:Segoe UI;font-weight:bold;font-size:1.8vmin/1;color:white;line-height:2em" >' +
      temp + '</div> <div class = "p_data_2 d-none"' +
      'style = "width:100%;height:100%;overflow-y:scroll;font-family:Segoe UI;font-weight:bold;font-size:1.8vmin/1;color:white;line-height:2em" >' +
      temp2 + '</div> <div class = "p_data_3 d-none"' +
      'style = "width:100%;height:100%;overflow-y:scroll; font-family:Segoe UI;font-weight:bold;font-size:1.8vmin/1;color:white;line-height:2em" >' +
      temp3 + '</div></div><div style = "height:15%;width:100%y;margin-top:1em;" > ' +
      '<span class="' + id + '" id="p_addwallet"  style = "font-size:2.2vmin/1;font-weight:bold;color:white;font-family:Segoe UI;padding:0 5% 2% 5%;margin:2% 0 0 0" >' + '匯入錢包 </span>' +
      '<span id="p_addlike" style = "font-size:2.2vmin/1;font-weight:bold;color:white;font-family:Segoe UI;padding:0 5% 2% 5%;margin:2% 0 0 0" > 加入收藏 </span>' +
      '</div > </div>';
    $(html).appendTo('.p_card_detail');
  });


}

$(".p_card_detail").on("click", '.p_card_page_back_icon', function () {

  $(".p_card_detail").empty().addClass("d-none");
  //$(".p_card_display_header").empty().html(head_html).removeAttr("style");
  $(".p_card_list").removeClass("d-none");


});
$(".p_card_detail").on("click", '#p_data_btn_1,#p_data_btn_2,#p_data_btn_3', function () {
  $("#p_data_btn_1").css({
    "background-color": "transparent",
    "color": "white"
  });
  $("#p_data_btn_2").css({
    "background-color": "transparent",
    "color": "white"
  });
  $("#p_data_btn_3").css({
    "background-color": "transparent",
    "color": "white"
  });
  $(".p_data_1").addClass("d-none");
  $(".p_data_2").addClass("d-none");
  $(".p_data_3").addClass("d-none");
  if ($(this).attr("id") == "p_data_btn_1") {
    $(this).css({
      "background-color": "#F3F3F3",
      "border-radius": "1em",
      "color": "black"
    });
    $(".p_data_1").removeClass("d-none");
  } else if ($(this).attr("id") == "p_data_btn_2") {
    $(this).css({
      "background-color": "#F3F3F3",
      "border-radius": "1em",
      "color": "black"
    });
    $(".p_data_2").removeClass("d-none");
  } else if ($(this).attr("id") == "p_data_btn_3") {
    $(this).css({
      "background-color": "#F3F3F3",
      "border-radius": "1em",
      "color": "black"
    });
    $(".p_data_3").removeClass("d-none");
  }
});
$(".p_card_detail").on("click", '#p_addlike,#p_addwallet', function () {
  let aa = $.ajax({
    url: "card_data2.json",
    async: false
  });
  let c_data = aa.responseJSON;


  if ($(this).attr("id") == "p_addlike") {
    $(this).css({
      "color": "#FFDD00"
    }).html("已收藏");

    let id = $("#p_addwallet").attr("class");
    document.getElementById("u_choose_cardlike").value = pay_user;
    document.getElementById("c_choose_cardlike").value = c_data.name[id];
    document.getElementById("s_choose_cardlike").value = 0;
    document.getElementById("m_choose_cardlike").value = c_data.img[id];
    document.getElementById("i_choose_cardlike").value = c_data.v_in[id];
    document.getElementById("o_choose_cardlike").value = c_data.v_out[id];
    document.getElementById("pw_choose_cardlike").value = 0;
    $("#b_choose_cardlike").get(0).click();
    // use id to add

  } else {
    $("#p_addwallet").css({
      "color": "#FFDD00"
    }).html("已加入錢包");

    let id = $("#p_addwallet").attr("class");

    document.getElementById("u_choose").value = pay_user;
    document.getElementById("c_choose").value = c_data.name[id];
    document.getElementById("s_choose").value = 0;
    document.getElementById("m_choose").value = c_data.img[id];
    document.getElementById("i_choose").value = c_data.v_in[id];
    document.getElementById("o_choose").value = c_data.v_out[id];
    $("#b_choose").get(0).click();
  }

});
$(".p_bottom_img").click(function () {
  $("#home").removeClass("p_bottom_click");
  $("#notification").removeClass("p_bottom_click");
  $("#bottom_card").removeClass("p_bottom_click");
  $(this).addClass("p_bottom_click");


});
$("#p_addcard_form1").change(function () {
  let bank = this.value;
  let aa = $.ajax({
    url: "card_data2.json",
    async: false
  });
  let c_data = aa.responseJSON;
  $("#p_addcard_form2").empty();

  for (i = 0; i < c_data.v_in.length; i++) {
    if (c_data.name[i].includes(bank) == true) {
      let html = '<option class="p_option_size" value="' + i + '">' + c_data.name[i] + '</option>';
      $(html).appendTo('#p_addcard_form2');
    }

  }

});
$("#p_addcard_button").click(function () {

  if ($("#p_addcard_form2").val() != null) {
    $('#p_addcard_block_frame').css({
      "display": "none"
    });
    $('#pay_home').css({
      "opacity": "1"
    });


    let aa = $.ajax({
      url: "card_data2.json",
      async: false
    });
    let c_data = aa.responseJSON;
    let id = $("#p_addcard_form2").val();
    document.getElementById("u_choose").value = pay_user;
    document.getElementById("c_choose").value = c_data.name[id];
    document.getElementById("s_choose").value = 0;
    document.getElementById("m_choose").value = c_data.img[id];
    document.getElementById("i_choose").value = c_data.v_in[id];
    document.getElementById("o_choose").value = c_data.v_out[id];
    $("#b_choose").get(0).click();
    $("#bottom_card").get(0).click();
  }
});
$("#p_addcard_form2").change(function () {
  $(".p_addcard_card").css({
    "display": "block"
  });

  let aa = $.ajax({
    url: "card_data2.json",
    async: false
  });
  let c_data = aa.responseJSON;
  $("#p_addcard_img").attr("src", c_data.img[this.value]);
      
})
$(".p_addcard_header2").click(function(){


  $("#pay_home").css({
    "opacity":"1"
  })
  $("#p_addcard_block_frame").css({
    "display":"none"
  })
  $(".p_addcard_card").css({
    "display":"none"
  })

});
function open_search(){
  $("#p_addcard_block_frame").css({
    "display":"block"
  })
 
  $("#pay_home").css({
    "opacity":"0.5"
  })



}
$("#ng_comment1").click(function(){
  $("#ajax-output_totalmytalk").css({"display":"none"});
  $("#ng_Post_frame3").css({"display":"block"});
  console.log(2);
});
$("#ng_comment2").click(function(){
  $("#ajax-output_totalmytalk").css({"display":"block"});
  $("#ng_Post_frame3").css({"display":"none"});
$('#totalmytalk_u').val(mail);
  $('#view_b_totalmytalk').trigger('click');

  console.log(1);
});
