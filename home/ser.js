#!/usr/bin/env node
//====== initial ===================================================================================================
const express = require('express')     // include `express`

const app = express()          // create an express, aka web server, instance

const port = 9999
app.listen(port, () => {
  console.log(`listening on port: ${port}`)
});
//====== 相對url =================================================================================================
app.use(express.static(`${__dirname}/dist`))     // handle other urls

const bodyParser = require('body-parser')            // include `body-parser`

app.use(bodyParser.urlencoded({ extended: false }))   // setup `body-parser`

app.use(bodyParser.json())


//@@@@@@@@@@@@@@@@@@@@@@@以下為主要的服務器的服務

app.get('/ngLogin',(req, res) => {//登錄驗證密碼與email是否存在
if((req.query.Email=='BEEP_new' && req.query.Password=='BEEP_new')||(req.query.Email=='BEEP_old' && req.query.Password=='BEEP_old')){
	res.send('true');
       console.log('login success');
}
else
     {
      res.send('falseP')
       console.log('wrong password')
     }
})

var msg_list=["閒聊","心得","問題","情報"];
var heat_list=["$","$$","$$$","$no"];
var heat_margrn=[3,10];
var note_dict={"anntalk":"anntalk","liketalk":"liketalk","owncard":"owncard","likecard":"likecard",};
var payway_list=["國內消費","國外消費"]

app.get('/step5', (req, res) => {          //`[host]:[port]/step5?fname=[fname]&lname=[lname]`  

	var user=req.query.u;
	var card=req.query.c;
	var spend=req.query.s;
	var img=req.query.m;
	var input=req.query.i;
	var out=req.query.o;
	var pway=req.query.pw;


    
    var dt = new Date();
var year=dt.getFullYear();
var momth=dt.getMonth()+1;
var date=dt.getDate();

	var wday=year+"-"+momth+"-"+date;//req.query.wday;
    
	//console.log(obj);
	console.log(user);
	console.log(card);
	console.log(spend);  
	console.log(img);
	console.log(input);
	console.log(out);  

    var fs=require('fs');
    var file="./Pay.json";
    fs.readFile(file, function (err, data) {
        if (err) throw err;
 
        var obj =JSON.parse(data.toString());      //讀入 Pay.json 轉為 parse
        var jsonLength=Object.keys(obj).length     //求 obj length

        var exisit=0;
        var card_num=0;
        
        for(var j=0;j<jsonLength;j++){
            if(Object.keys(obj)[j]==user){     
                
                var obj2 = spend;  
                //console.log(obj2);
                var obj1=obj[user][0].jspend;
                
                //console.log(obj[user]);
                //console.log(obj[user].length);
                for(var ci=0;ci<obj[user].length;ci++){  //if 有 user 且有 這張卡
                    if(obj[user][ci].jcard==card){ 

                       /////////////////////////////////////////////////////////////////////////////////                 
                        obj1=obj[user][ci].jspend; 
                        obj1date=obj[user][ci].jdate; 
                        obj1type=obj[user][ci].jtype; 
                        
///////////////////////////////////////////////////////////////////////////////////
                        //console.log(obj1);
                        if(parseInt(obj2)>0){      //加入新消費項目
                            obj1.push(parseInt(obj2));
///////////////////////////////////////////////////////////////////  
                            obj1date.push(wday);
                            obj1type.push(payway_list[parseInt(pway)]);
///////////////////////////////////////////////////////////////////////                            
                            console.log(obj1);
                            exisit=2;
                            card_num=ci;
                        }
                        if(parseInt(obj2)<=0){     //刪除花費項目
                            var obj2 = []; 
                            var obj2date = []; 
                            var obj2type = []; 
                            for(var di=0;di<obj[user][ci].jspend.length;di++){
                                if((di+1)!=-parseInt(spend)) {
                                    obj2.push(parseFloat(obj[user][ci].jspend[di]))
                                    obj2date.push(obj[user][ci].jdate[di])
                                    obj2type.push(obj[user][ci].jtype[di])
                                }
                            }
                            obj[user][ci].jspend=obj2;
                            obj[user][ci].jdate=obj2date;
                            obj[user][ci].jtype=obj2type;
                            console.log(obj[user][ci]);
                            exisit=2;
                            card_num=ci;
                        }
                        
                    }
                }
            //obj1.push(obj2); 
                if(exisit==0){exisit=1;card_num=obj[user].length;}
            //console.log(obj1);    
                console.log("yes");break;
             }
            
        }
        
        //"user1":[{"jcard":"AA","jspend":[1,4,5,6]}]
        if(exisit==0) {                                //if no this user
            if(parseFloat(spend)>=0){
            obj[user]=[{jcard: card,jimg:img,jin:input,jout:out, jspend:[parseFloat(spend)], jdate:[wday], jtype:[payway_list[parseInt(pway)]]}];          
            }/*
            if(parseFloat(spend)=0){
            obj[user]=[{jcard: card,jimg:img,jin:input,jout:out, jspend:[]}];          
            }*/
            console.log(obj[user]);
            console.log("No_No_yes");            
         }
        else if(exisit==1){                             //if this user 沒這張卡
            var obj2 = {jcard: card,jimg:img,jin:input,jout:out, jspend:[parseFloat(spend)], jdate:[wday], jtype:[payway_list[parseInt(pway)]]};  
            //console.log(obj2);
            if(parseFloat(spend)>=0){
            var obj1=obj[user];
            obj1.push(obj2);  
            }/*
            var obj2 = {jcard: card,jimg:img,jin:input,jout:out, jspend:[]};  
            //console.log(obj2);
            if(parseFloat(spend)=0){
            var obj1=obj[user];
            obj1.push(obj2);  
            }*/
            console.log(obj[user]);
            //console.log(obj1.lengh);
            //card_num=obj1.lengh-1;
            console.log("No_yes");
        }

        var spend_total='';//'<table class="pay_spend" id="pay_feedback"><tr><td>本月消費</td><td>本月回饋</td></tr></table>';//<div class="pay_spend" id="pay_feedback"></div>';
        //res.send(`<h1>Hello, ${obj[user][0]} ${obj[user][0]}</h1>`)
        for(var si=0;si<obj[user][card_num].jspend.length;si++){
            if(obj[user][card_num].jspend[si]>0){     
    	    var int=-(si+1);
	    var re=(obj[user][card_num].jspend[si]*0.01).toFixed(2);
                
var time=(obj[user][card_num].jdate[si])
var years=time.substring(0,time.indexOf("-"))

var time2=time.substring(time.indexOf("-")+1)
var momths=time2.substring(0,time2.indexOf("-"))

var time3=time2.substring(time2.indexOf("-")+1)
var dates=time3

            spend_total=spend_total+'<table id="'+si+'" class="pay_spend"  onclick="pay_delete('+int+');"><tr><td>'+obj[user][card_num].jtype[si]+'</td><td><font style="font:normal 2vmin/1 "Ubuntu", sans-serif;">出帳金額</font><br>'+obj[user][card_num].jspend[si]+'</td><td>'+years+'<br>'+momths+'/'+dates+'</td></tr></table>';
                //'<li id="'+si+'" class="pay_spend">'+obj[user][card_num].jspend[si]+"</li>";    
            }
            /*else if(obj[user][card_num].jspend[si]>0){  
            spend_total=spend_total+'<li id="'+si+'" class="pay_spend">'+obj[user][card_num].jspend[si]+"</li>";    
            }*/
        }
        
        //spend_total=spend_total+'<div class="pay_cal"></div><div class="pay_bottom"></div>';

        res.send(`<h1 class="pay_return">${user}${obj[user][card_num].jcard}</h1>${spend_total}`)
        
        var json = JSON.stringify(obj);
        fs.writeFile(file, json, 'utf8',function (error) {
        console.log(error)
        console.log('successful')
        })
        
        
    })

})

//======== form回傳 ==================================================================================================
app.get('/card_load', (req, res) => {          //`[host]:[port]/step5?fname=[fname]&lname=[lname]`  

	var user=req.query.u_load;//"user2";//
    var card_return='<ul class="pay_cardlist" onmouseover="drag();" ontouchstart="drag();">';
    
	console.log(user);
    
    var fs=require('fs');
    var file="./Pay.json";
    fs.readFile(file, function (err, data) {
        if (err) throw err;
 
        var obj =JSON.parse(data.toString());      //讀入 Pay.json 轉為 parse
        var jsonLength=Object.keys(obj).length     //求 obj length
        
        for(var j=0;j<jsonLength;j++){
            if(Object.keys(obj)[j]==user){ 
                
                for(var ci=0;ci<obj[user].length;ci++){  //if 有 user 且有 這張卡
                    var id_c=String.fromCharCode(ci+97);
                    card_return=card_return+'<li draggable="true" id="'+obj[user][ci].jcard+'" class="pay_card" style="background-image: url('+obj[user][ci].jimg+'),url(./res/img/card_back.png);" value="'+obj[user][ci].jin+'">'+'<div id="inr" class="'+obj[user][ci].jin+'"></div><div id="outr" class="'+obj[user][ci].jout+'"></div><div id="imgr" class="'+obj[user][ci].jimg+'"></div><div class="pay_io" value="'+obj[user][ci].jout+'">國內：'+obj[user][ci].jin+'&emsp;國外：'+obj[user][ci].jout+'</div></li>';                    
                    
                }           
             }            
        }
        //spend_total=spend_total+'<div class="pay_cal"></div><div class="pay_bottom"></div>';
	
	if(card_return=='<ul class="pay_cardlist" onmouseover="drag();" ontouchstart="drag();">')	{
	res.send(`<div id="ni_add" onclick="open_search();"><div id="ni_wrapper"><img src="./pic/add_icon.svg"><br>新增一張卡片吧!</br><p>｡◕‿◕｡</p></div></div>`);
	}
	else{
        card_return=card_return+'<div class="pay_addcard" id="pay_addcard" onclick="open_search();"></div></ul>';
        res.send(card_return)  
	}     
    })

})
//======== form my like talk ==================================================================================================
app.get('/step5_totalmytalk', (req, res) => {          //`[host]:[port]/step5?fname=[fname]&lname=[lname]`  
console.log('/step5_totalmytalk');
	var likeuser=req.query.lu;
var return_html="";

	//console.log(obj);
	//console.log(topic);

    var fs=require('fs');
    var file="./Talk.json";
    fs.readFile(file, function (err, data) {
        if (err) throw err;
 
        var obj =JSON.parse(data.toString());      //讀入 Talk.json 轉為 parse
        var jsonLength=Object.keys(obj).length     //求 obj length

        const talkList = Object.keys(obj);
        
        var exisit=0;
        var card_num=0;        
	
        console.log(talkList);

        for(var j=0;j<jsonLength;j++){
            //if(Object.keys(obj)[j]==topic){    

                var obj1=obj[talkList[j]][0];
                
                
		
		var id_n=j+1;
		var name_n="talk"+id_n.toString();//+"_"+obj1.jcom_t.length.toString();
		
		for(var jliker=0;jliker<obj1.jlike.length;jliker++){
		var jlikeuse=obj1.jlike[jliker];
		if(jlikeuse==likeuser){

		console.log(obj1.jpict);
                console.log(obj1.jicon);
                console.log(obj1.jsub);
                console.log(obj1.jtopic);
                console.log(obj1.jdate);
                console.log(obj1.jtext);

            var heat=3;
            if(obj1.jpict!=0.5){

                if(obj1.jpict>heat_margrn[1]){                
                heat=2;
                }
                else if(obj1.jpict>heat_margrn[0]){                
                heat=1;
                }
                else{                
                heat=0;
                }
            }
            
		/*return_html=return_html+'<div class="ng_PostColumn" onclick="view_talk('+id_n+');" name='+name_n+' ><div class="ng_PostColumn_Img">'+obj1.jpict+'</div><div style="width:10%;height:100%;margin-right: 1%;float: left;"><div class="ng_PostColumn_PostType">'+obj1.jicon+'</div><div class="ng_PostColumn_Name">'+obj1.jsub+'</div></div><div style="width:70%;height:100%;float: left;"><div class="ng_PostColumn_Title">'+obj1.jtopic+'</div><div class="ng_PostColumn_Date">'+obj1.jdate+'</div></div></div><br>';*/
          /*return_html=return_html+'<div class="ng_PostColumn" onclick="view_talk('+id_n+');" name='+name_n+' ><div class="ng_PostColumn_Img"><img style="height:100%;" src="">'+heat_list[heat]+'</div><div style="width:10%;height:100%;margin-right: 1%;float: left;"><div class="ng_PostColumn_PostType"><img style="height:100%;" src='+imglink+'></div><div class="ng_PostColumn_Name">'+obj1.jsub+'</div></div><div style="width:70%;height:100%;float: left;"><div class="ng_PostColumn_Title">'+obj1.jtopic+'</div><div class="ng_PostColumn_Date">'+obj1.jdate+'</div></div></div><br>';*/
            
            /*var id_n=j+1;
		var name_n="talk"+id_n.toString();//+"_"+obj1.jcom_t.length.toString();
        var imglink='"./res/img/'+obj1.jicon+'.png"'
                
		return_html=return_html+'<div class="ng_PostColumn" onclick="view_talk('+id_n+');" name='+name_n+' ><div class="ng_PostColumn_Img"><img style="height:100%;" src="">'+heat_list[heat]+'</div><div style="width:10%;height:100%;margin-right: 1%;float: left;"><div class="ng_PostColumn_PostType"><img style="height:100%;" src='+imglink+'></div><div class="ng_PostColumn_Name">'+obj1.jsub+'</div></div><div style="width:70%;height:100%;float: left;"><div class="ng_PostColumn_Title">'+obj1.jtopic+'</div><div class="ng_PostColumn_Date">'+obj1.jdate+'</div></div></div><br>';
            */
		var id_n=j+1;
		var name_n="talk"+id_n.toString();//+"_"+obj1.jcom_t.length.toString();
        var imglink='"./res/img/'+obj1.jicon+'.png"'
                
	var imgheatlink='"./res/img/'+heat_list[heat]+'.png"'
		return_html=return_html+'<div style="top:3%;left:8%;width: 40%;position:absolute;border-top: 3px solid yellow;margin-bottom: 2px;border-radius: 30px;"></div><div class="ng_PostColumn" onclick="view_talk('+id_n+');" name='+name_n+' ><div class="ng_PostColumn_Img"><img style="height:75%;" src='+imgheatlink+'></div><div style="width:10%;height:100%;margin-right: 1%;float: left;"><div class="ng_PostColumn_PostType"><img style="width:90%;" src='+imglink+'></div><div class="ng_PostColumn_Name">'+obj1.jsub+'</div></div><div style="width:70%;height:100%;float: left;"><div class="ng_PostColumn_Title">'+obj1.jtopic+'</div><div class="ng_PostColumn_Date">'+obj1.jdate+'</div></div></div><br>';
            



		//return_html=return_html+obj1.jpict+obj1.jicon+obj1.jsub+obj1.jtopic+obj1.jdate+'<br>';
            	}

	      }
                if(exisit==0){exisit=1;}
        }
 //res.send("123")
        res.send(`${return_html}`)
    })

})

//======== form my like talk ==================================================================================================
app.get('/step5_totalmytalk_annmy', (req, res) => {          //`[host]:[port]/step5?fname=[fname]&lname=[lname]`  
console.log('/step5_totalmytalk_annmy');
	var likeuser=req.query.lu_annmy;
var return_html="";

	console.log(likeuser);
	//console.log(topic);
    var fs=require('fs');
    var file="./Talk.json";
    fs.readFile(file, function (err, data) {
        if (err) throw err;
 
        var obj =JSON.parse(data.toString());      //讀入 Talk.json 轉為 parse
        var jsonLength=Object.keys(obj).length     //求 obj length

        const talkList = Object.keys(obj);        
        var exisit=0;
        var card_num=0;        	
        //console.log(talkList);

        for(var j=0;j<jsonLength;j++){
            //if(Object.keys(obj)[j]==topic){    
                var obj1=obj[talkList[j]][0];     
		var id_n=j+1;
		var name_n="talk"+id_n.toString();//+"_"+obj1.jcom_t.length.toString();


		if(obj1.jsub==likeuser){
		console.log(obj1.jpict);
                console.log(obj1.jicon);
                console.log(obj1.jsub);
                console.log(obj1.jtopic);
                console.log(obj1.jdate);
                console.log(obj1.jtext);
            var heat=3;
            if(obj1.jpict!=0.5){

                if(obj1.jpict>heat_margrn[1]){                
                heat=2;
                }
                else if(obj1.jpict>heat_margrn[0]){                
                heat=1;
                }
                else{                
                heat=0;
                }
            }
            
		/*return_html=return_html+'<div class="ng_PostColumn" onclick="view_talk('+id_n+');" name='+name_n+' ><div class="ng_PostColumn_Img">'+obj1.jpict+'</div><div style="width:10%;height:100%;margin-right: 1%;float: left;"><div class="ng_PostColumn_PostType">'+obj1.jicon+'</div><div class="ng_PostColumn_Name">'+obj1.jsub+'</div></div><div style="width:70%;height:100%;float: left;"><div class="ng_PostColumn_Title">'+obj1.jtopic+'</div><div class="ng_PostColumn_Date">'+obj1.jdate+'</div></div></div><br>';*/
          /*return_html=return_html+'<div class="ng_PostColumn" onclick="view_talk('+id_n+');" name='+name_n+' ><div class="ng_PostColumn_Img"><img style="height:100%;" src="">'+heat_list[heat]+'</div><div style="width:10%;height:100%;margin-right: 1%;float: left;"><div class="ng_PostColumn_PostType"><img style="height:100%;" src='+imglink+'></div><div class="ng_PostColumn_Name">'+obj1.jsub+'</div></div><div style="width:70%;height:100%;float: left;"><div class="ng_PostColumn_Title">'+obj1.jtopic+'</div><div class="ng_PostColumn_Date">'+obj1.jdate+'</div></div></div><br>';*/
            
            /*var id_n=j+1;
		var name_n="talk"+id_n.toString();//+"_"+obj1.jcom_t.length.toString();
        var imglink='"./res/img/'+obj1.jicon+'.png"'
                
		return_html=return_html+'<div class="ng_PostColumn" onclick="view_talk('+id_n+');" name='+name_n+' ><div class="ng_PostColumn_Img"><img style="height:100%;" src="">'+heat_list[heat]+'</div><div style="width:10%;height:100%;margin-right: 1%;float: left;"><div class="ng_PostColumn_PostType"><img style="height:100%;" src='+imglink+'></div><div class="ng_PostColumn_Name">'+obj1.jsub+'</div></div><div style="width:70%;height:100%;float: left;"><div class="ng_PostColumn_Title">'+obj1.jtopic+'</div><div class="ng_PostColumn_Date">'+obj1.jdate+'</div></div></div><br>';
            */

		var id_n=j+1;
		var name_n="talk"+id_n.toString();//+"_"+obj1.jcom_t.length.toString();
        var imglink='"./res/img/'+obj1.jicon+'.png"'
                
	var imgheatlink='"./res/img/'+heat_list[heat]+'.png"'
		return_html=return_html+'<div style="top:3%;left:8%;width: 40%;position:absolute;border-top: 3px solid yellow;margin-bottom: 2px;border-radius: 30px;"></div><div class="ng_PostColumn" onclick="view_talk('+id_n+');" name='+name_n+' ><div class="ng_PostColumn_Img"><img style="height:75%;" src='+imgheatlink+'></div><div style="width:10%;height:100%;margin-right: 1%;float: left;"><div class="ng_PostColumn_PostType"><img style="width:90%;" src='+imglink+'></div><div class="ng_PostColumn_Name">'+obj1.jsub+'</div></div><div style="width:70%;height:100%;float: left;"><div class="ng_PostColumn_Title">'+obj1.jtopic+'</div><div class="ng_PostColumn_Date">'+obj1.jdate+'</div></div></div><br>';
            


		//return_html=return_html+obj1.jpict+obj1.jicon+obj1.jsub+obj1.jtopic+obj1.jdate+'<br>';
            	}
                if(exisit==0){exisit=1;}
		//}
        }
 //res.send("123")
        res.send(`${return_html}`)
    })

})

//======== form hot talk ==================================================================================================
app.get('/step5_totalhottalk', (req, res) => {          //`[host]:[port]/step5?fname=[fname]&lname=[lname]`  
console.log('/step5_totalhottalk');
	//var likeuser=req.query.lu;
var return_html="";

	//console.log(obj);
	//console.log(topic);

    var fs=require('fs');
    var file="./Talk.json";
    fs.readFile(file, function (err, data) {
        if (err) throw err;
 
        var obj =JSON.parse(data.toString());      //讀入 Talk.json 轉為 parse
        var jsonLength=Object.keys(obj).length     //求 obj length

        const talkList = Object.keys(obj);
        
        var exisit=0;
        var card_num=0;        
	
        console.log(talkList);

        for(var j=0;j<jsonLength;j++){
            //if(Object.keys(obj)[j]==topic){    

                var obj1=obj[talkList[j]][0];
                
                
		
		var id_n=j+1;
		var name_n="talk"+id_n.toString();//+"_"+obj1.jcom_t.length.toString();
		
		if(obj1.jpict>3){

		console.log(obj1.jpict);
                console.log(obj1.jicon);
                console.log(obj1.jsub);
                console.log(obj1.jtopic);
                console.log(obj1.jdate);
                console.log(obj1.jtext);

            
            var heat=3;
            if(obj1.jpict!=0.5){

                if(obj1.jpict>heat_margrn[1]){                
                heat=2;
                }
                else if(obj1.jpict>heat_margrn[0]){                
                heat=1;
                }
                else{                
                heat=0;
                }
            }
		/*return_html=return_html+'<div class="ng_PostColumn" onclick="view_talk('+id_n+');" name='+name_n+' ><div class="ng_PostColumn_Img">'+obj1.jpict+'</div><div style="width:10%;height:100%;margin-right: 1%;float: left;"><div class="ng_PostColumn_PostType">'+obj1.jicon+'</div><div class="ng_PostColumn_Name">'+obj1.jsub+'</div></div><div style="width:70%;height:100%;float: left;"><div class="ng_PostColumn_Title">'+obj1.jtopic+'</div><div class="ng_PostColumn_Date">'+obj1.jdate+'</div></div></div><br>';*/
            /*return_html=return_html+'<div class="ng_PostColumn" onclick="view_talk('+id_n+');" name='+name_n+' ><div class="ng_PostColumn_Img"><img style="height:100%;" src="">'+heat_list[heat]+'</div><div style="width:10%;height:100%;margin-right: 1%;float: left;"><div class="ng_PostColumn_PostType"><img style="height:100%;" src='+imglink+'></div><div class="ng_PostColumn_Name">'+obj1.jsub+'</div></div><div style="width:70%;height:100%;float: left;"><div class="ng_PostColumn_Title">'+obj1.jtopic+'</div><div class="ng_PostColumn_Date">'+obj1.jdate+'</div></div></div><br>';*/
            /*var id_n=j+1;
		var name_n="talk"+id_n.toString();//+"_"+obj1.jcom_t.length.toString();
        var imglink='"./res/img/'+obj1.jicon+'.png"'
                
		return_html=return_html+'<div class="ng_PostColumn" onclick="view_talk('+id_n+');" name='+name_n+' ><div class="ng_PostColumn_Img"><img style="height:100%;" src="">'+heat_list[heat]+'</div><div style="width:10%;height:100%;margin-right: 1%;float: left;"><div class="ng_PostColumn_PostType"><img style="height:100%;" src='+imglink+'></div><div class="ng_PostColumn_Name">'+obj1.jsub+'</div></div><div style="width:70%;height:100%;float: left;"><div class="ng_PostColumn_Title">'+obj1.jtopic+'</div><div class="ng_PostColumn_Date">'+obj1.jdate+'</div></div></div><br>';
		*/
		var id_n=j+1;
		var name_n="talk"+id_n.toString();//+"_"+obj1.jcom_t.length.toString();
        var imglink='"./res/img/'+obj1.jicon+'.png"'
                
	var imgheatlink='"./res/img/'+heat_list[heat]+'.png"'
		return_html=return_html+'<div style="top:3%;left:51.5%;width: 40%;position:absolute;border-top: 3px solid yellow;margin-bottom: 2px;border-radius: 30px;"></div><div class="ng_PostColumn" onclick="view_talk('+id_n+');" name='+name_n+' ><div class="ng_PostColumn_Img"><img style="height:75%;" src='+imgheatlink+'></div><div style="width:10%;height:100%;margin-right: 1%;float: left;"><div class="ng_PostColumn_PostType"><img style="width:90%;" src='+imglink+'></div><div class="ng_PostColumn_Name">'+obj1.jsub+'</div></div><div style="width:70%;height:100%;float: left;"><div class="ng_PostColumn_Title">'+obj1.jtopic+'</div><div class="ng_PostColumn_Date">'+obj1.jdate+'</div></div></div><br>';
            


//return_html=return_html+obj1.jpict+obj1.jicon+obj1.jsub+obj1.jtopic+obj1.jdate+'<br>';
            }
                if(exisit==0){exisit=1;}
        }
 //res.send("123")
        res.send(`${return_html}`)
    })

})


//======== load ==================================================================================
app.get('/step5_total', (req, res) => {          //`[host]:[port]/step5?fname=[fname]&lname=[lname]`  

	//var topic=req.query.tp;
var return_html="";

	//console.log(obj);
	//console.log(topic);

    var fs=require('fs');
    var file="./Talk.json";
    fs.readFile(file, function (err, data) {
        if (err) throw err;
 
        var obj =JSON.parse(data.toString());      //讀入 Talk.json 轉為 parse
        var jsonLength=Object.keys(obj).length     //求 obj length

        const talkList = Object.keys(obj);
        
        var exisit=0;
        var card_num=0;        
	
        console.log(talkList);

        for(var j=0;j<jsonLength;j++){
            //if(Object.keys(obj)[j]==topic){    

                var obj1=obj[talkList[j]][0];
                
                console.log(obj1.jpict);
                console.log(obj1.jicon);
                console.log(obj1.jsub);
                console.log(obj1.jtopic);
                console.log(obj1.jdate);
                console.log(obj1.jtext);
            
            var heat=3;
            if(obj1.jpict!=0.5){

                if(obj1.jpict>heat_margrn[1]){                
                heat=2;
                }
                else if(obj1.jpict>heat_margrn[0]){                
                heat=1;
                }
                else{                
                heat=0;
                }
            }
            //heat_list[heat]
            
            
		
		var id_n=j+1;
		var name_n="talk"+id_n.toString();//+"_"+obj1.jcom_t.length.toString();
        var imglink='"./res/img/'+obj1.jicon+'.png"'
                
	var imgheatlink='"./res/img/'+heat_list[heat]+'.png"'
		return_html=return_html+'<div style="top:3%;left:8%;width: 40%;position:absolute;border-top: 3px solid yellow;margin-bottom: 2px;border-radius: 30px;"></div><div class="ng_PostColumn" onclick="view_talk('+id_n+');" name='+name_n+' ><div class="ng_PostColumn_Img"><img style="height:75%;" src='+imgheatlink+'></div><div style="width:10%;height:100%;margin-right: 1%;float: left;"><div class="ng_PostColumn_PostType"><img style="width:90%;" src='+imglink+'></div><div class="ng_PostColumn_Name">'+obj1.jsub+'</div></div><div style="width:70%;height:100%;float: left;"><div class="ng_PostColumn_Title">'+obj1.jtopic+'</div><div class="ng_PostColumn_Date">'+obj1.jdate+'</div></div></div><br>';
            
		//return_html=return_html+obj1.jpict+obj1.jicon+obj1.jsub+obj1.jtopic+obj1.jdate+'<br>';
            
                if(exisit==0){exisit=1;}
        }

        res.send(`${return_html}`)
    })

})
//======== load ==================================================================================
app.get('/step5_announce', (req, res) => {          //`[host]:[port]/step5?fname=[fname]&lname=[lname]`  

	var wtopic=req.query.wt;

	var wmsg1=req.query.wmsg;

console.log(wmsg1);


	var wmsg=parseInt(req.query.wmsg);

console.log(wmsg);
//var msg_list=["閒聊","心得","問題","情報"];

	var wsub=req.query.wsub;

	var whot=0.5;//req.query.whot;
var dt = new Date();
var year=dt.getFullYear();
var momth=dt.getMonth()+1;
var date=dt.getDate();

	var wday=year+"-"+momth+"-"+date;//req.query.wday;

	var wtext=req.query.wtext;


var return_html="";

	//console.log(obj);
	//console.log(topic);

    var fs=require('fs');
    var file="./Talk.json";
    fs.readFile(file, function (err, data) {
        if (err) throw err;
 
        var obj =JSON.parse(data.toString());      //讀入 Talk.json 轉為 parse

        var jsonLength=Object.keys(obj).length     //求 obj length
        var talknum="talk"+(jsonLength+1).toString();
        //////////////////////////////////////////////////////////////////////////
        /* var fs_sign=require('fs');
    var file_sign="./Talk_sign.json";
        //console.log("11111111111111111111111111");
    fs_sign.readFile(file_sign, function (err_sign, data_sign) {
        
        //console.log("2222222222222222222222222222");
        if (err_sign) throw err_sign;
 
        //console.log("3333333333333333333333333333333");
        var obj_sign =JSON.parse(data_sign.toString());      //讀入 Talk.json 轉為 parse

        var jsonLength_sign=Object.keys(obj_sign).length     //求 obj length
        
        
        
        var exisit_sign=0;
        
        for(var j_sign=0;j_sign<jsonLength_sign;j_sign++){
            if(Object.keys(obj_sign)[j_sign]==wsub){     //if 有 user
                
        //console.log("5555555555555555555555555555555555");
                var obj1_sign=obj_sign[wsub][0];
                
                (obj1_sign.jann).push(talknum);
                (obj1_sign.jann_len).push(0);
                
            //obj1.push(obj2); 
                if(exisit_sign==0){exisit_sign=1;}
            //console.log(obj1);    
                console.log("ann_yes");break;
             }
            
        }
        
        //"user1":[{"jcard":"AA","jspend":[1,4,5,6]}]
        if(exisit_sign==0) {                                //if no this user
            
        //console.log("7777777777777777777777777777");
            obj_sign[wsub]=[{jann: [talknum],jann_len:[0],jlike:[],jlike_len:[]}];          
            /*
            if(parseFloat(spend)=0){
            obj[user]=[{jcard: card,jimg:img,jin:input,jout:out, jspend:[]}];          
            }*/
 /*           console.log(obj_sign[wsub]);
            console.log("ann_No_yes");            
         } 
        
        
        var json_sign = JSON.stringify(obj_sign);
        fs_sign.writeFile(file_sign, json_sign, 'utf8',function (error_sign) {
        console.log(error_sign)
        console.log('successful_sign')
        })
        
        
        })*/
        
        
        /////////////////////////////////////////////////////////////////////////////


obj[talknum]=[{jpict: whot, jicon: msg_list[wmsg],jsub: wsub,jtopic: wtopic,jdate: wday,jtext:wtext,jcom_t:[],jcom_h:[],jcom_u:[],jcom_d:[],jlike:[]}];

var jsonLength=Object.keys(obj).length     //求 obj length

        const talkList = Object.keys(obj);
        
        var exisit=0;
        var card_num=0;        
	
        console.log(talkList);

        for(var j=0;j<jsonLength;j++){
            //if(Object.keys(obj)[j]==topic){    

                var obj1=obj[talkList[j]][0];
                
                console.log(obj1.jpict);
                console.log(obj1.jicon);
                console.log(obj1.jsub);
                console.log(obj1.jtopic);
                console.log(obj1.jdate);
                console.log(obj1.jtext);
                console.log(obj1.jcom_t,obj1.jcom_h,obj1.jcom_u,obj1.jcom_d);

		var heat=3;
            if(obj1.jpict!=0.5){

                if(obj1.jpict>heat_margrn[1]){                
                heat=2;
                }
                else if(obj1.jpict>heat_margrn[0]){                
                heat=1;
                }
                else{                
                heat=0;
                }
            }
            //heat_list[heat]



		/*var id_n=j+1;
		var name_n="talk"+id_n.toString();//+"_"+obj1.jcom_t.length.toString();
		return_html=return_html+'<div class="ng_PostColumn" onclick="view_talk('+id_n+');" name='+name_n+' ><div class="ng_PostColumn_Img">'+obj1.jpict+'</div><div style="width:10%;height:100%;margin-right: 1%;float: left;"><div class="ng_PostColumn_PostType">'+obj1.jicon+'</div><div class="ng_PostColumn_Name">'+obj1.jsub+'</div></div><div style="width:70%;height:100%;float: left;"><div class="ng_PostColumn_Title">'+obj1.jtopic+'</div><div class="ng_PostColumn_Date">'+obj1.jdate+'</div></div></div><br>';
            */
var id_n=j+1;
		var name_n="talk"+id_n.toString();//+"_"+obj1.jcom_t.length.toString();
        var imglink='"./res/img/'+obj1.jicon+'.png"'
                
	var imgheatlink='"./res/img/'+heat_list[heat]+'.png"'
		return_html=return_html+'<div style="top:3%;left:8%;width: 40%;position:absolute;border-top: 3px solid yellow;margin-bottom: 2px;border-radius: 30px;"></div><div class="ng_PostColumn" onclick="view_talk('+id_n+');" name='+name_n+' ><div class="ng_PostColumn_Img"><img style="height:75%;" src='+imgheatlink+'></div><div style="width:10%;height:100%;margin-right: 1%;float: left;"><div class="ng_PostColumn_PostType"><img style="width:90%;" src='+imglink+'></div><div class="ng_PostColumn_Name">'+obj1.jsub+'</div></div><div style="width:70%;height:100%;float: left;"><div class="ng_PostColumn_Title">'+obj1.jtopic+'</div><div class="ng_PostColumn_Date">'+obj1.jdate+'</div></div></div><br>';
            

		//return_html=return_html+obj1.jpict+obj1.jicon+obj1.jsub+obj1.jtopic+obj1.jdate+'<br>';
            
                if(exisit==0){exisit=1;}
        }

        res.send(`${return_html}`)
	var json = JSON.stringify(obj);
        fs.writeFile(file, json, 'utf8',function (error) {
        console.log(error)
        console.log('successful')
        })

    })

})


//======= 取 text==========================================================================================
app.get('/step5_text', (req, res) => {          //`[host]:[port]/step5?fname=[fname]&lname=[lname]`  

	var topic=req.query.tp;
var comh=req.query.th;
var comc=req.query.tc;
var comu=req.query.tu;
var comup=req.query.tup;



//var msg_list=["閒聊","心得","問題","情報"];
var return_html="";
	//console.log(obj);
	console.log(topic);

    var fs=require('fs');
    var file="./Talk.json";
    fs.readFile(file, function (err, data) {
        if (err) throw err;
 
        var obj =JSON.parse(data.toString());      //讀入 Pay.json 轉為 parse
        var jsonLength=Object.keys(obj).length     //求 obj length

        var exisit=0;
        var card_num=0;
        
        for(var j=0;j<jsonLength;j++){
            if(Object.keys(obj)[j]==topic){   

		

                var obj1=obj[topic][0];
                
		if(comc!="0"){        //寫入評論
		(obj1.jcom_t).push(comc);
		(obj1.jcom_h).push(comh);
		(obj1.jcom_u).push(comu);
		var hotdefine=[-1,0,2];
		hotpict=0
		for(var jch=0;jch<obj1.jcom_h.length;jch++){
			hotpict=hotpict+hotdefine[parseInt(obj1.jcom_h[jch])-1];
		}
		obj1.jpict=hotpict;
/*var dt = new Date();
var year=dt.getFullYear();
var momth=dt.getMonth()+1;
var date=dt.getDate();

	var cday=year+"-"+momth+"-"+date;*/

		(obj1.jcom_d).push(comup);
            
            
                    //////////////////////////////////////////////////////////////////////////
         var fs_sign=require('fs');
    var file_sign="./notice.json";
    fs_sign.readFile(file_sign, function (err_sign, data_sign) {        
        if (err_sign) throw err_sign;

        var obj_sign =JSON.parse(data_sign.toString());      //讀入 Talk.json 轉為 parse
        var jsonLength_sign=Object.keys(obj_sign).length     //求 obj length
        
        
        
        var exisit_sign=0;
	var exisit_talk=0;
        var note_user=obj1.jlike;
        note_user.push(obj1.jsub);
        
        for(var j_tl=0;j_tl<note_user.length;j_tl++){
            
        for(var j_sign=0;j_sign<jsonLength_sign;j_sign++){
            if(Object.keys(obj_sign)[j_sign]==note_user[j_tl] && note_user[j_tl]!=comu){     //if 有 user
				
                var obj1_sign=obj_sign[Object.keys(obj_sign)[j_sign]][0];		  //notice中此user的資料
                
                
                

		for(var jltcom=0;jltcom<(obj1_sign.jn).length;jltcom++){     //有此user 且其尚無此talk或已讀
			if(obj1_sign.jn[jltcom]!=topic || obj1_sign.jnr==1){
                obj1_sign.jn.push(topic);
                if(note_user[j_tl]==obj1.jsub){
                obj1_sign.jnt.push("anntalk_"+comu);
                }
                else{
                obj1_sign.jnt.push("liketalk_"+comu);
                }
                obj1_sign.jnr.push(0);
                obj1_sign.jntxt.push(comc);
                break;
			}
		}
		       //obj1.push(obj2); 
                exisit_sign=1;
            console.log(obj1_sign);    
                console.log("like_yes");break;
             }
            
        }
        
        //"user1":[{"jcard":"AA","jspend":[1,4,5,6]}]
        if(exisit_sign==0 && note_user[j_tl]!=comu) {                                //if no this user
            if(note_user[j_tl]==obj1.jsub){
                obj_sign[note_user[j_tl]]=[{jn: [topic],jnt:["anntalk_"+comu],jnr:[0],jntxt:[comc]}]; 
                }
                else{
                obj_sign[note_user[j_tl]]=[{jn: [topic],jnt:["liketalk_"+comu],jnr:[0],jntxt:[comc]}]; 
                }
                     
            /*
            if(parseFloat(spend)=0){
            obj[user]=[{jcard: card,jimg:img,jin:input,jout:out, jspend:[]}];          
            }*/
            console.log(obj_sign[note_user[j_tl]]);
            console.log("like_No_yes");            
         } 
            
        }      
        
        var json_sign = JSON.stringify(obj_sign);
        fs_sign.writeFile(file_sign, json_sign, 'utf8',function (error_sign) {
        console.log(error_sign)
        console.log('successful_sign')
        })
        
        
        })
        
        
        /////////////////////////////////////////////////////////////////////////////
            
        }
		/*else {
			obj1.jpict=0.5;

		}*/


                console.log(obj1.jpict);
                console.log(obj1.jicon);
                console.log(obj1.jsub);
                console.log(obj1.jtopic);
                console.log(obj1.jdate);
                console.log(obj1.jtext);
                console.log(obj1.jcom_t,obj1.jcom_h,obj1.jcom_u,obj1.jcom_d);
		
		
		var com="<br>"
		for(var comj=0;comj<obj1.jcom_t.length;comj++){
			//var photolink= obj1.jcom_d[comj] 
			var photolink='"'+obj1.jcom_d[comj]+'"'
			
			var imgheatlink='"./res/img/'+heat_list[parseInt(obj1.jcom_h[comj])-1]+'.png"'

			com=com+'<div class="ng_Comment_block_comment"><div class="ng_Comment_block_comment_container"><div class="ng_Comment_block_comment_container_rate"><img style="height:100%;" src='+imgheatlink+'></div><div class="ng_Comment_block_comment_container_pic"><img style="height:100%;" src='+photolink+'></div><div class="ng_Comment_block_comment_container_name">'+obj1.jcom_u[comj]+'</div></div><div class="ng_Comment_block_comment_main">'+obj1.jcom_t[comj]+'</div></div>';
			//com=com+"<br>"+obj1.jcom_h[comj]+" "+obj1.jcom_d[comj]+" "+obj1.jcom_u[comj]+" "+obj1.jcom_t[comj];
		}                
                //return_html=obj1.jicon+" "+obj1.jtopic+" "+obj1.jdate+" "+obj1.jtext+" "+com;
                
                var id_n=j+1;
		var name_n="talk"+id_n.toString();//+"_"+obj1.jcom_t.length.toString();
                var imglink='"./res/img/'+obj1.jicon+'.png"'
		return_html='<div class="ng_Comment_block" name='+topic+'><div style="padding-left: 5%; padding-top:5%;position:absolute;" onclick="ng_function5()"><img src="./pic/Component 9 – 1.svg"></div><div class="ng_Comment_block_top"><div class="ng_Comment_block_top_img"><img style="height:100%;" src='+imglink+'></div><div class="ng_Comment_block_top_name">'+obj1.jtopic+'</div><div class="ng_Comment_block_top_date">'+obj1.jdate+'</div></div><div class="ng_Comment_block_middle" style="z-index: 2;"><div class="ng_Comment_block_main">'+obj1.jtext+'</div>'+com;
                return_html=return_html+' </div><div class="ng_extraButton" style="top:68vh;text-align: center;" onclick="ng_function_LikeComment()"><img style="width: 100%;height: 100%;" src="./pic/Component 19 – 4.svg"></div><div class="ng_extraButton" style="top:77vh;text-align: center;" onclick="ng_function8(1)"><img style="margin-top:25%;" src="./pic/Group193.svg"></div></div>';
		return_html=return_html+'<div class="ng_preventClick" id="ng_preventClick1" style="display:none;position: absolute;top:-7%;width: 100vw;height: 100vh;z-index: 4;"><div class="ng_Comment_write"><div style="padding-top:5px;right:6.5%;position:absolute;" onclick="ng_function8(2)"><img src="./pic/Component 12 – 5.svg"></div><div style="height:11%;margin-left: 3%;"><div class="ng_Comment_rating" onclick="ng_function9(1)"> <img style="width:100% ;height: 100%;" src="./pic/Component 21 – 1.svg"> </div><div class="ng_Comment_rating" onclick="ng_function9(2)"> <img style="width:100% ;height: 100%;" src="./pic/Component 21 – 1.svg"> </div><div class="ng_Comment_rating" onclick="ng_function9(3)"> <img style="width:100% ;height: 100%;" src="./pic/Component 21 – 1.svg"> </div></div><div class="ng_Comment_write_main" contenteditable="true"></div><div style="text-align:center;float:left;margin-left:60%;width: 17.4%;height: 12.7%;margin-top:1.5%;border-radius: 30px;background-color: #FFFFFFB3;padding-top: 2%;color: black;" onclick="ng_function_writeComment()">留言</div><div style="text-align:center;float:left;margin-left:5%;width: 17.4%;height: 12.7%;margin-top:1.5%;border-radius: 30px;background-color: #FFFFFFB3;padding-top: 2%;color: black;" onclick="ng_function8(2)">取消</div></div></div>';
                
                if(exisit==0){exisit=1;}

                console.log("yes");break;
             }
            
        }
       /* if(exisit==0) {                                //if no this user
            if(parseInt(spend)>=0){
            obj[user]=[{jcard: card, jspend:[parseFloat(spend)]}];          
            }
            console.log(obj[user]);
            console.log("No_No_yes");            
         }
        else if(exisit==1){                             //if this user 沒這張卡
            var obj2 = {jcard: card, jspend:[parseInt(spend)]};  
            //console.log(obj2);
            if(parseInt(spend)>=0){
            var obj1=obj[user];
            obj1.push(obj2);  
            }
            console.log(obj[user]);
            console.log("No_yes");
        }*/
       
        
        //spend_total=spend_total+'<div class="pay_cal"></div><div class="pay_bottom"></div>';
res.send(`${return_html}`)
        //var first=`${return_html}`;
        //var second="0";
        //var ret={first,second};
        //res.send(ret)

        //res.send(`<h1 class="pay_return">${user}${obj[user][card_num].jcard}</h1>${spend_total}`)
        
        
	if(comc!="0"){  //寫入評論

	var json = JSON.stringify(obj);
        fs.writeFile(file, json, 'utf8',function (error) {
        console.log(error)
        console.log('successful')
        })    
	
	}    
        
    })

})

//======= like ==========================================================================================
app.get('/step5_talklike', (req, res) => {          //`[host]:[port]/step5?fname=[fname]&lname=[lname]`  

	var btltop=req.query.tltop;
	var btlu=req.query.tlu;

		var liketop=btltop;//btltop.substring(0,btltop.indexOf("_"));
		//var likecomlen=btltop.substring(btltop.indexOf("_")+1);
		console.log(liketop);
		//console.log(likecomlen);
    
    
    var return_html="";
	//console.log(obj);
	console.log(liketop);

    var fs=require('fs');
    var file="./Talk.json";
    fs.readFile(file, function (err, data) {
        if (err) throw err;
 
        var obj =JSON.parse(data.toString());      //讀入 Pay.json 轉為 parse
        var jsonLength=Object.keys(obj).length     //求 obj length

        var exisit=0;
        var card_num=0;
        
        for(var j=0;j<jsonLength;j++){
            if(Object.keys(obj)[j]==liketop){   

		

                var obj1=obj[liketop][0];
                (obj1.jlike).push(btlu);

                console.log(obj1.jpict);
                console.log(obj1.jicon);
                console.log(obj1.jsub);
                console.log(obj1.jtopic);
                console.log(obj1.jdate);
                console.log(obj1.jtext);
                console.log(obj1.jcom_t,obj1.jcom_h,obj1.jcom_u,obj1.jcom_d); 
                console.log(obj1.jlike);
		
		
		var com="<br>"
		for(var comj=0;comj<obj1.jcom_t.length;comj++){
			com=com+"<br>"+heat_list[parseInt(obj1.jcom_t[comj])-1]+" "+obj1.jcom_h[comj]+" "+obj1.jcom_u[comj]+" "+obj1.jcom_d[comj];
		}                
                return_html=obj1.jtopic+" "+obj1.jdate+" "+obj1.jtext+" "+com;

                if(exisit==0){exisit=1;}

                console.log("yes");break;
             }
            
        }
       /* if(exisit==0) {                                //if no this user
            if(parseInt(spend)>=0){
            obj[user]=[{jcard: card, jspend:[parseFloat(spend)]}];          
            }
            console.log(obj[user]);
            console.log("No_No_yes");            
         }
        else if(exisit==1){                             //if this user 沒這張卡
            var obj2 = {jcard: card, jspend:[parseInt(spend)]};  
            //console.log(obj2);
            if(parseInt(spend)>=0){
            var obj1=obj[user];
            obj1.push(obj2);  
            }
            console.log(obj[user]);
            console.log("No_yes");
        }*/
       
        
        //spend_total=spend_total+'<div class="pay_cal"></div><div class="pay_bottom"></div>';
res.send(`${return_html}`)
        //res.send(`<h1 class="pay_return">${user}${obj[user][card_num].jcard}</h1>${spend_total}`)
        
        
	

	var json = JSON.stringify(obj);
        fs.writeFile(file, json, 'utf8',function (error) {
        console.log(error)
        console.log('successful')
        })    
        
    })

})
//======== load notice==================================================================================
app.get('/step5_notice', (req, res) => {          //`[host]:[port]/step5?fname=[fname]&lname=[lname]`  
cardnote();
var note_u=req.query.nu;
	//var topic=req.query.tp;
var return_html="";
    
    var ret="124111113411";

	console.log('/step5_notice');
	//console.log(topic);

    var fs=require('fs');
    var file="./Talk.json";
    fs.readFile(file, function (err, data) {
        if (err) throw err;
 
        var obj =JSON.parse(data.toString());      //讀入 Talk.json 轉為 parse
        var jsonLength=Object.keys(obj).length     //求 obj length

        const talkList = Object.keys(obj);
        //////////////////////////////////////////////////////////////////////////////
        var fs_note=require('fs');
    var file_note="./notice.json";
    fs_note.readFile(file_note, function (err_note, data_note) {
        if (err_note) throw err_note;
 
        var obj_note =JSON.parse(data_note.toString());      //讀入 Talk.json 轉為 parse
        var jsonLength_note=Object.keys(obj_note).length     //求 obj length

        const userList_note = Object.keys(obj_note); 
        
        
        
        var exisit=0;
        var card_num=0;        
	
        //console.log(talkList);
        
        for(var jnote=0;jnote<jsonLength_note;jnote++){
            if(userList_note[jnote]==note_u){ 
                //console.log("note_u");
 var obj1_note=obj_note[note_u][0];
            
        for(var jnl=0;jnl<obj1_note.jn.length;jnl++){    
        for(var j=0;j<jsonLength;j++){   
                
            if(Object.keys(obj)[j]==obj1_note.jn[jnl]){    

                //console.log(obj1_note.jn[jnl]);
                var obj1=obj[talkList[j]][0];
                
                //ret=ret+" @ ";
                //console.log(ret);
                console.log(obj1.jpict);
                console.log(obj1.jicon);
                console.log(obj1.jsub);
                console.log(obj1.jtopic);
                console.log(obj1.jdate);
                console.log(obj1.jtext);
		
		var id_n=j+1;
		var name_n="talk"+id_n.toString();//+"_"+obj1.jcom_t.length.toString();
                
        var type={"anntalk":'回復了您的貼文',"liketalk":'回復了您收藏的貼文',"owncard":'發佈您擁有卡片的貼文'}
        var ntype=obj1_note.jnt[jnl].substring(0,obj1_note.jnt[jnl].indexOf("_"))
        var nuser=obj1_note.jnt[jnl].substring(obj1_note.jnt[jnl].indexOf("_")+1)
        //console.log(type[ntype]);
        
        
        var imglink='"./res/img/'+note_dict[ntype]+'.png"'
		//return_html=return_html+' '+id_n+' '+name_n+' '+note_dict[ntype]+' '+nuser+' '+type[ntype]+' '+obj1.jtopic+' '+obj1_note.jntxt[jnl]+'<br>';
         return_html=return_html+'<div class="ng_notification_block"><div class="ng_notification_block_img"><img src='+imglink+'></div><div class="ng_notification_block_content"><div class="ng_notification_block_content_topic">'+nuser+' '+type[ntype]+' '+obj1.jtopic+'</div><div class="ng_notification_block_content_detail">'+obj1_note.jntxt[jnl]+'</div></div></div>';       
                
             if(exisit==0){exisit=1;}
            //break;
            }
        }
        }
		//return_html=return_html+obj1.jpict+obj1.jicon+obj1.jsub+obj1.jtopic+obj1.jdate+'<br>';
            
               
            }
        }
    res.send(`${return_html}`)
        
        })

        //res.send(`${return_html}`)
    })
//res.send("213243243")
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/step5_cardnote', (req, res) => {          //`[host]:[port]/step5?fname=[fname]&lname=[lname]`  
console.log('/step5_cardnote');
	//var user=req.query.u_load;//"user2";//
    //var card_return='<ul class="pay_cardlist" onmouseover="drag();" ontouchstart="drag();">';
    
	//console.log(user);
    
var writein=""

    var fs=require('fs');
    var file="./Pay.json";
    fs.readFile(file, function (err, data) {
        if (err) throw err;
 
        var obj =JSON.parse(data.toString());      //讀入 Pay.json 轉為 parse
        var jsonLength=Object.keys(obj).length     //求 obj length
        

        ////////////////////////////////////////////////////////////////////////
        var fs_talk=require('fs');
        var file_talk="./Talk.json";
        fs_talk.readFile(file_talk, function (err_talk, data_talk) {
            if (err_talk) throw err_talk;

                var obj_talk =JSON.parse(data_talk.toString());      //讀入 Pay.json 轉為 parse
                var jsonLength_talk=Object.keys(obj_talk).length;    //求 obj length
//////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////
var bool=0;
var fs_key=require('fs');
var file_key="./Card_key.json";
fs_key.readFile(file_key, function (err_key, data_key) {
    if (err_key) throw err_key;

        var obj_key =JSON.parse(data_key.toString());      //讀入 Pay.json 轉為 parse
        var jsonLength_key=Object.keys(obj_key).length     //求 obj length
        ///////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
var fs_notice=require('fs');
var file_notice="./notice.json";
fs_notice.readFile(file_notice, function (err_notice, data_notice) {
    if (err_notice) throw err_notice;

        var obj_notice =JSON.parse(data_notice.toString());      //讀入 Pay.json 轉為 parse
        var jsonLength_notice=Object.keys(obj_notice).length;    //求 obj length
        ////////////////////////////////////////////////////////////////////////////////////////////////////

        for(var j=0;j<jsonLength;j++){   //換不同user
            user=Object.keys(obj)[j];            
            console.log("\n==============================\n",user)

        ////////////////////////////////////////////////////////////////////////
        //load talk
        ////////////////////////////////////////////////////////////////////////   
        var boollist=[];
        var boolmax=0;
        var noticetopic="";
        for(tk=0;tk<jsonLength_talk;tk++){//換不同talk
            bool=0;
            var talk=Object.keys(obj_talk)[tk];
            obj1_talk=obj_talk[talk][0];
                    console.log(Object.keys(obj_talk)[tk]); 

                //console.log("\n"+user)
                for(var ci=0;ci<obj[user].length;ci++){  //if 有 user 且有 這張卡  //換不同卡
                        //user //卡
                        var card=obj[user][ci].jcard
                console.log(card)               
///////////////////////////////////////////////////////////
//load key
//////////////////////////////////////////////////                                   
                                    
                    //user //卡
                    //var card=obj[user][ci].jcard
			//console.log(obj_key);
                                for(var cl=0;cl<jsonLength_key;cl++){
                                    if(Object.keys(obj_key)[cl]==card){
                                    for(var ck=0;ck<obj_key[card].length;ck++){//換不同card key
                                        //var card=obj[user][ci].jcard
                                        key= obj_key[card][ck];
                                        console.log(key);
                          /////////////////////////////////////////////////////////////////////////////////

			//console.log(obj1_talk);
                                        //jtopic":"topic1","jdate":"2020-6-30","jtext":"text1","jcom_t"
                                        if(obj1_talk.jtopic.indexOf(key)!=-1){
                                            bool=bool+1;//break;
                                        }
                                        if(obj1_talk.jtext.indexOf(key)!=-1)  {
                                            bool=bool+1;//break;
                                        }  
                                        for(var tkcom=0;tkcom<obj1_talk.jcom_t.length;tkcom++){
                                            if(obj1_talk.jcom_t[tkcom].indexOf(key)!=-1){
                                                bool=bool+1;//break;
                                            }
                                        }
                                        //boollist.push(bool);
                                        //boolmax=Math.max(boollist)
                                    }   
                                }
                    }
                        }                            
                        console.log(bool)
                                 if(bool>=1){writein=talk;break;}
                                 //else writein=""
                        //console.log(writein+"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2")
                        /*for(var bn=0;bn<boollist.length;bn++){
                                if(boollist[bn]==boolmax && boolmax>0){
                                    noticetopic=Object.keys(obj_talk)[tk];
                                }
                            }*/		                    
                }   
                //////////////////////////////////////////////////////////////
                //load notice
                /////////////////////////////////////////////////////////////
                if(writein!=""){
                var note_exist=0  ;
                for(var np=0;np<jsonLength_notice;np++){
                        if(Object.keys(obj_notice)[np]==user){
                            var obt_insert=obj_notice[user][0];
                            //console.log(Object.keys(obj_notice)[np],user)			
                            //console.log(obj_notice[user])                                   
                            (obt_insert.jn).push(writein);
                            //console.log(writein,obj1_talk.jtext);
                            (obt_insert.jnt).push("owncard_新貼文");
                            (obt_insert.jnr).push(0);
                            (obt_insert.jntxt).push(obj1_talk.jtopic+" "+obj1_talk.jtext);
                        }
                    note_exist=1;break;
                    }
                    if(note_exist==0){
                        obj_notice[user]=[{jn: [writein],jnt:["owncard_新貼文"],jnr:[0],jntxt:[obj1_talk.jtopic+" "+obj1_talk.jtext]}];    
                    }
                
                }  
                //////////////////////////////////////////////////////////////////////////////	
                console.log(obj_notice[user]);        
             }  
             var json_notice = JSON.stringify(obj_notice);
                                fs_notice.writeFile(file_notice, json_notice, 'utf8',function (error_notice) {
                                console.log(error_notice)
                                console.log('successful')
                                })   
               }) 
            })///////
        })/////////
    })
})
//======== form 計數 ==================================================================================================
app.get('/card_load_count', (req, res) => {          //`[host]:[port]/step5?fname=[fname]&lname=[lname]`  

                                console.log('/card_load_count');


	var user=req.query.u_load_count;//"user2";//
    var card_return='<ul class="pay_cardlist" onmouseover="drag();" ontouchstart="drag();">';
    
	console.log(user);
    
    var fs=require('fs');
    var file="./Pay.json";
    fs.readFile(file, function (err, data) {
        if (err) throw err;
 
        var obj =JSON.parse(data.toString());      //讀入 Pay.json 轉為 parse
        var jsonLength=Object.keys(obj).length     //求 obj length
        
	var c_count=0;

        for(var j=0;j<jsonLength;j++){
            if(Object.keys(obj)[j]==user){ 
               	 c_count=obj[user].length;
             }            
        } 
        console.log(c_count);

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var likeuser=user;
var return_html="";
var t_count=0;

    var fs=require('fs');
    var file="./Talk.json";
    fs.readFile(file, function (err, data) {
        if (err) throw err;
 
        var obj =JSON.parse(data.toString());      //讀入 Talk.json 轉為 parse
        var jsonLength=Object.keys(obj).length     //求 obj length

        const talkList = Object.keys(obj);
        
        var exisit=0;
        var card_num=0;        
	
        console.log(talkList);

        for(var j=0;j<jsonLength;j++){
            //if(Object.keys(obj)[j]==topic){    

                var obj1=obj[talkList[j]][0];
                		
		var id_n=j+1;
		var name_n="talk"+id_n.toString();//+"_"+obj1.jcom_t.length.toString();
		
		
		if(obj1.jsub==likeuser){
            t_count=t_count+1;
            	}
        console.log(t_count);
      
        }

	var ret={c_count,t_count};

   ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        res.send(ret) 
        
    }) 
    })

})

//==========================like card =============================================================================================
app.get('/step5_cardlike', (req, res) => {          //`[host]:[port]/step5?fname=[fname]&lname=[lname]`  

	var user=req.query.u_cardlike;
	var card=req.query.c_cardlike;
	var spend=req.query.s_cardlike;
	var img=req.query.m_cardlike;
	var input=req.query.i_cardlike;
	var out=req.query.o_cardlike;
	var pway=req.query.pw_cardlike;


    
    var dt = new Date();
var year=dt.getFullYear();
var momth=dt.getMonth()+1;
var date=dt.getDate();

	var wday=year+"-"+momth+"-"+date;//req.query.wday;
    
	//console.log(obj);
	console.log(user);
	console.log(card);
	console.log(spend);  
	console.log(img);
	console.log(input);
	console.log(out);  

    var fs=require('fs');
    var file="./Paylike.json";
    fs.readFile(file, function (err, data) {
        if (err) throw err;
 
        var obj =JSON.parse(data.toString());      //讀入 Pay.json 轉為 parse
        var jsonLength=Object.keys(obj).length     //求 obj length

        var exisit=0;
        var card_num=0;
        
        for(var j=0;j<jsonLength;j++){
            if(Object.keys(obj)[j]==user){     
                
                var obj2 = spend;  
                //console.log(obj2);
                var obj1=obj[user][0].jspend;
                
                //console.log(obj[user]);
                //console.log(obj[user].length);
                for(var ci=0;ci<obj[user].length;ci++){  //if 有 user 且有 這張卡
                    if(obj[user][ci].jcard==card){ 

                       /////////////////////////////////////////////////////////////////////////////////                 
                        obj1=obj[user][ci].jspend; 
                        obj1date=obj[user][ci].jdate; 
                        obj1type=obj[user][ci].jtype; 
                        
///////////////////////////////////////////////////////////////////////////////////
                        //console.log(obj1);
                        if(parseInt(obj2)>0){      //加入新消費項目
                            obj1.push(parseInt(obj2));
///////////////////////////////////////////////////////////////////  
                            obj1date.push(wday);
                            obj1type.push(payway_list[parseInt(pway)]);
///////////////////////////////////////////////////////////////////////                            
                            console.log(obj1);
                            exisit=2;
                            card_num=ci;
                        }
                        if(parseInt(obj2)<=0){     //刪除花費項目
                            var obj2 = []; 
                            var obj2date = []; 
                            var obj2type = []; 
                            for(var di=0;di<obj[user][ci].jspend.length;di++){
                                if((di+1)!=-parseInt(spend)) {
                                    obj2.push(parseFloat(obj[user][ci].jspend[di]))
                                    obj2date.push(obj[user][ci].jdate[di])
                                    obj2type.push(obj[user][ci].jtype[di])
                                }
                            }
                            obj[user][ci].jspend=obj2;
                            obj[user][ci].jdate=obj2date;
                            obj[user][ci].jtype=obj2type;
                            console.log(obj[user][ci]);
                            exisit=2;
                            card_num=ci;
                        }
                        
                    }
                }
            //obj1.push(obj2); 
                if(exisit==0){exisit=1;card_num=obj[user].length;}
            //console.log(obj1);    
                console.log("yes");break;
             }
            
        }
        
        //"user1":[{"jcard":"AA","jspend":[1,4,5,6]}]
        if(exisit==0) {                                //if no this user
            if(parseFloat(spend)>=0){
            obj[user]=[{jcard: card,jimg:img,jin:input,jout:out, jspend:[parseFloat(spend)], jdate:[wday], jtype:[payway_list[parseInt(pway)]]}];          
            }/*
            if(parseFloat(spend)=0){
            obj[user]=[{jcard: card,jimg:img,jin:input,jout:out, jspend:[]}];          
            }*/
            console.log(obj[user]);
            console.log("No_No_yes");            
         }
        else if(exisit==1){                             //if this user 沒這張卡
            var obj2 = {jcard: card,jimg:img,jin:input,jout:out, jspend:[parseFloat(spend)], jdate:[wday], jtype:[payway_list[parseInt(pway)]]};  
            //console.log(obj2);
            if(parseFloat(spend)>=0){
            var obj1=obj[user];
            obj1.push(obj2);  
            }/*
            var obj2 = {jcard: card,jimg:img,jin:input,jout:out, jspend:[]};  
            //console.log(obj2);
            if(parseFloat(spend)=0){
            var obj1=obj[user];
            obj1.push(obj2);  
            }*/
            console.log(obj[user]);
            //console.log(obj1.lengh);
            //card_num=obj1.lengh-1;
            console.log("No_yes");
        }

        var spend_total='';//'<table class="pay_spend" id="pay_feedback"><tr><td>本月消費</td><td>本月回饋</td></tr></table>';//<div class="pay_spend" id="pay_feedback"></div>';
        //res.send(`<h1>Hello, ${obj[user][0]} ${obj[user][0]}</h1>`)
        for(var si=0;si<obj[user][card_num].jspend.length;si++){
            if(obj[user][card_num].jspend[si]>0){     
    	    var int=-(si+1);
	    var re=(obj[user][card_num].jspend[si]*0.01).toFixed(2);
                
var time=(obj[user][card_num].jdate[si])
var years=time.substring(0,time.indexOf("-"))

var time2=time.substring(time.indexOf("-")+1)
var momths=time2.substring(0,time2.indexOf("-"))

var time3=time2.substring(time2.indexOf("-")+1)
var dates=time3

            spend_total=spend_total+'<table id="'+si+'" class="pay_spend"  onclick="pay_delete('+int+');"><tr><td>'+obj[user][card_num].jtype[si]+'</td><td><font style="font:normal 2vmin/1 "Ubuntu", sans-serif;">出帳金額</font><br>'+obj[user][card_num].jspend[si]+'</td><td>'+years+'<br>'+momths+'/'+dates+'</td></tr></table>';
                //'<li id="'+si+'" class="pay_spend">'+obj[user][card_num].jspend[si]+"</li>";    
            }
            /*else if(obj[user][card_num].jspend[si]>0){  
            spend_total=spend_total+'<li id="'+si+'" class="pay_spend">'+obj[user][card_num].jspend[si]+"</li>";    
            }*/
        }
        
        //spend_total=spend_total+'<div class="pay_cal"></div><div class="pay_bottom"></div>';

        res.send(`<h1 class="pay_return">${user}${obj[user][card_num].jcard}</h1>${spend_total}`)
        
        var json = JSON.stringify(obj);
        fs.writeFile(file, json, 'utf8',function (error) {
        console.log(error)
        console.log('successful')
        })
        
        
    })

})

//======== form回傳 ==================================================================================================
app.get('/card_load_cardlike', (req, res) => {          //`[host]:[port]/step5?fname=[fname]&lname=[lname]`  
console.log('/card_load_cardlike');

	var user=req.query.u_load_cardlike;//"user2";//
    var card_return='<ul class="pay_cardlist" onmouseover="drag();" ontouchstart="drag();">';
    
	console.log(user);
    
    var fs=require('fs');
    var file="./Paylike.json";
    fs.readFile(file, function (err, data) {
        if (err) throw err;
 
        var obj =JSON.parse(data.toString());      //讀入 Pay.json 轉為 parse
        var jsonLength=Object.keys(obj).length     //求 obj length
        

        for(var j=0;j<jsonLength;j++){
            if(Object.keys(obj)[j]==user){ 
                console.log(obj[user]);
                for(var ci=0;ci<obj[user].length;ci++){  //if 有 user 且有 這張卡
                    var id_c=String.fromCharCode(ci+97);
                    card_return=card_return+'<li draggable="true" id="'+obj[user][ci].jcard+'" class="pay_card" style="background-image: url('+obj[user][ci].jimg+'),url(./res/img/card_back.png);" value="'+obj[user][ci].jin+'">'+'<div id="inr" class="'+obj[user][ci].jin+'"></div><div id="outr" class="'+obj[user][ci].jout+'"></div><div id="imgr" class="'+obj[user][ci].jimg+'"></div><div class="pay_io" value="'+obj[user][ci].jout+'">國內：'+obj[user][ci].jin+'&emsp;國外：'+obj[user][ci].jout+'</div></li>';                    
                    
                }           
             }            
        }
        //spend_total=spend_total+'<div class="pay_cal"></div><div class="pay_bottom"></div>';
	
	if(card_return=='<ul class="pay_cardlist" onmouseover="drag();" ontouchstart="drag();">')	{
	res.send(`<div id="ni_add" onclick="open_search();"><div id="ni_wrapper"><img src="./pic/add_icon.svg"><br>新增一張卡片吧!</br><p>｡◕‿◕｡</p></div></div>`);
	}
	else{
        card_return=card_return+'<div class="pay_addcard" id="pay_addcard" onclick="open_search();"></div></ul>';
        res.send(card_return)  
	}     
    })

})
//======== form回傳 ==================================================================================================
function cardnote(){ 
    console.log('/step5_cardnote');
            
    var writein=[]
    
        var fs=require('fs');
        var file="./Pay.json";
        fs.readFile(file, function (err, data) {
            if (err) throw err;
     
            var obj =JSON.parse(data.toString());      //讀入 Pay.json 轉為 parse
            var jsonLength=Object.keys(obj).length     //求 obj length    
            ////////////////////////////////////////////////////////////////////////
            var fs_talk=require('fs');
            var file_talk="./Talk.json";
            fs_talk.readFile(file_talk, function (err_talk, data_talk) {
                if (err_talk) throw err_talk;
    
                    var obj_talk =JSON.parse(data_talk.toString());      //讀入 Pay.json 轉為 parse
                    var jsonLength_talk=Object.keys(obj_talk).length;    //求 obj length
    //////////////////////////////////////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////////////////
    var bool=0;
    var fs_key=require('fs');
    var file_key="./Card_key.json";
    fs_key.readFile(file_key, function (err_key, data_key) {
        if (err_key) throw err_key;
    
            var obj_key =JSON.parse(data_key.toString());      //讀入 Pay.json 轉為 parse
            var jsonLength_key=Object.keys(obj_key).length     //求 obj length
            ///////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////
    var fs_notice=require('fs');
    var file_notice="./notice.json";
    fs_notice.readFile(file_notice, function (err_notice, data_notice) {
        if (err_notice) throw err_notice;
    
            var obj_notice =JSON.parse(data_notice.toString());      //讀入 Pay.json 轉為 parse
            var jsonLength_notice=Object.keys(obj_notice).length;    //求 obj length
            ////////////////////////////////////////////////////////////////////////////////////////////////////
    
            for(var j=0;j<jsonLength;j++){   //換不同user
                writein=[];
                user=Object.keys(obj)[j];            
                console.log("\n==============================\n",user)
    
            ////////////////////////////////////////////////////////////////////////
            //load talk
            ////////////////////////////////////////////////////////////////////////   
            var boollist=[];
            var boolmax=0;
            var noticetopic="";
            for(tk=0;tk<jsonLength_talk;tk++){//換不同talk
                bool=0;
                var talk=Object.keys(obj_talk)[tk];
                obj1_talk=obj_talk[talk][0];
                        console.log(Object.keys(obj_talk)[tk]); 
    
                    //console.log("\n"+user)
                    for(var ci=0;ci<obj[user].length;ci++){  //if 有 user 且有 這張卡  //換不同卡
                            //user //卡
                            var card=obj[user][ci].jcard
                    console.log("no.:",ci," : ",card)               
    ///////////////////////////////////////////////////////////
    //load key
    //////////////////////////////////////////////////                                   
                                        
                        //user //卡
                        //var card=obj[user][ci].jcard
                //console.log(obj_key);
                                    for(var cl=0;cl<jsonLength_key;cl++){
                                        if(Object.keys(obj_key)[cl]==card){
                                        for(var ck=0;ck<obj_key[card].length;ck++){//換不同card key
                                            //var card=obj[user][ci].jcard
                                            key= obj_key[card][ck];
                                            console.log(key);
                              /////////////////////////////////////////////////////////////////////////////////
    
                //console.log(obj1_talk);
                                            //jtopic":"topic1","jdate":"2020-6-30","jtext":"text1","jcom_t"
                                            if(obj1_talk.jtopic.indexOf(key)!=-1){
                                                console.log("get + ",key);
                                                bool=bool+1;//break;
                                            }
                                            if(obj1_talk.jtext.indexOf(key)!=-1)  {
                                                console.log("get + ",key);
                                                bool=bool+1;//break;
                                            }  
                                            for(var tkcom=0;tkcom<obj1_talk.jcom_t.length;tkcom++){
                                                if(obj1_talk.jcom_t[tkcom].indexOf(key)!=-1){
                                                    console.log("get + ",key);
                                                    bool=bool+1;//break;
                                                }
                                            }
                                            //boollist.push(bool);
                                            //boolmax=Math.max(boollist)
                                        }   
                                    }
                        }
                            }                            
                            console.log(bool)
                                     if(bool>=1){writein.push(talk);}
                                     //else writein=""
                            //console.log(writein+"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2")
                            /*for(var bn=0;bn<boollist.length;bn++){
                                    if(boollist[bn]==boolmax && boolmax>0){
                                        noticetopic=Object.keys(obj_talk)[tk];
                                    }
                                }*/		                    
                    }   
                    //////////////////////////////////////////////////////////////
                    //load notice
                    /////////////////////////////////////////////////////////////
                    for(var wi=0;wi<writein.length;wi++){
                        writein_sign=writein[wi];
                    if(writein_sign!=""){
            console.log("@ 1 @@@@ yes _ "+writein_sign+" @@@@") 
                    var note_exist=0  ;
                    var talk_exist=0;
                    for(var np=0;np<jsonLength_notice;np++){
                            if(Object.keys(obj_notice)[np]==user){
                    console.log("@ 2_o @@@@ user _ "+user+" @@@@") 
                                 
                                var obt_insert=obj_notice[user][0];
                            for(var nt=0;nt<obt_insert.jn.length;nt++){
                                if(obt_insert.jn[nt]==writein_sign){talk_exist=1;break;}
                                }
                                if(talk_exist==0){
                                //console.log(Object.keys(obj_notice)[np],user)			
                                //console.log(obj_notice[user])                                   
                                (obt_insert.jn).push(writein_sign);
                                //console.log(writein_sign,obj1_talk.jtext);
                                (obt_insert.jnt).push("owncard_"+obj_talk[writein_sign][0].jsub);
                                (obt_insert.jnr).push(0);
                                (obt_insert.jntxt).push(obj_talk[writein_sign][0].jtopic+" "+obj_talk[writein_sign][0].jtext);
                                }
                note_exist=1;break;
                            }                    
                        }
                        if(note_exist==0){
                    console.log("@ 2_x @@@@ user _ "+user+" @@@@") 
                            obj_notice[user]=[{jn: [writein_sign],jnt:["owncard_"+obj_talk[writein_sign][0].jsub],jnr:[0],jntxt:[obj_talk[writein_sign][0].jtopic+" "+obj_talk[writein_sign][0].jtext]}];    
                        }
                    
                    }  
                }
                    //////////////////////////////////////////////////////////////////////////////	
                    console.log(obj_notice[user]);        
                 }  
                 var json_notice = JSON.stringify(obj_notice);
                                    fs_notice.writeFile(file_notice, json_notice, 'utf8',function (error_notice) {
                                    console.log(error_notice)
                                    console.log('successful')
                                    })   
                   }) 
                })///////
            })/////////
        })
    }