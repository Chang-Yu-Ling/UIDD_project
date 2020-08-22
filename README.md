
# **檔案說明**

## <操作流程說明>
#### 1. 下載
```
git clone https://github.com/Chang-Yu-Ling/UIDD_project.git
```
* 如下圖

![](https://i.imgur.com/XC2PDQg.png)


#### 2. 執行
```
cd ~/home的檔案路徑
node ser.js
```
* 如下圖

![](https://i.imgur.com/NcBJbfA.png)


#### 3. 登入

> * 測試用帳號/密碼
> 新用戶
> 
> 新用戶    |  帳號：BEEP_new<br>密碼 ：BEEP_new
> --------------|------------------------
> 舊用戶     |  帳號：BEEP_old<br>密碼 ：BEEP_old
> * 登入流程
> 
> 網址：http://luffy.ee.ncku.edu.tw:9999/home.html
> 
<table border="1">
　<tr>
　<td>輸入網址</td>
　<td>點選登入</td>
  <td>選擇登入方式</td>
　<td>輸入帳號/密碼</td>
　<td>點選登入</td>
　</tr>
　<tr>
　<td><img src="https://i.imgur.com/CpQyEkM.png"></td>
　<td><img src="https://i.imgur.com/JQEguvo.png"></td>
　<td><img src="https://i.imgur.com/13eP5Vx.png"></td>
　<td><img src="https://i.imgur.com/iwKbi2a.png"></td>
　<td><img src="https://i.imgur.com/ZD4bL7v.png"></td>
　</tr>
</table>



## <檔案結構>
#### 1.  tree ~/home/ 
```
/home/
├── Card_key.json         ＼
├── notice.json
├── Pay.json                後
├── Paylike.json
├── ser.js                  端
├── Talk.json
├── node_modules          ／
└── dist                  ＼
    ├── announce.html
    ├── card_data2.json
    ├── exercise.css
    ├── exercise.js         
    ├── home.html           前
    ├── id.js
    ├── main.css
    ├── main.js
    ├── pic                 端
    ├── res
    │   └── img
    ├── talk.css
    └── talk.js           ／
``` 
#### 2.  json檔內容說明 
* 前端
> 
> 檔名    |  內容
>  --------------|------------------------
> card_data2.json     |  信用卡資料爬蟲結果`(更新日期：2020/05/17)`

* 後端
> 
> 檔名    |  內容
>  --------------|------------------------
> Pay.json     |  使用者加入`我的信用卡`的記帳資料
> Paylike.json     |  使用者加入`喜愛信用卡`的試算資料
> Talk.json     |  所有論壇資料
> notice.json     |  所有使用者的通知資料    
> Card_key.json     |  比對通知用關鍵字資料    
