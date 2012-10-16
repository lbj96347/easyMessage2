/* 
 * Author: CashLee
 * 
 */

var registed = false;

var appId = 'wx2429db493df6d4f0'; //please modify to your weichat application ID
var sendType='0';

function sendTypeA(){
    var detail=document.getElementById("sendTypeDescription");
    detail.innerHTML="发送内容到：会话";
    sendType='0';
}

function sendTypeB(){
    var detail=document.getElementById("sendTypeDescription");
    detail.innerHTML="发送内容到：朋友圈";
    sendType='1';
}

function onSuccess(){
    //set2SendView();
    
    console.log('success');

    $(".wechat_callback").html("发送成功");
    setTimeout("$('.wechat_callback').css('display','none')" , 600);

}

function onError(response){
    //set2SendView();
    
    console.log('error');

    $(".wechat_callback").html("发送成功");
    setTimeout("$('.wechat_callback').css('display','none')" , 600);
    
}

function sendTextContent(delivery_content) {

    
    if(!registed) {
        registerApp(appId);
        registed=true;
    }

    //var send_content = document.getElementById("send_content").value;
    
    //这里的内容要用传参数的形式传入
    //hello world 那个地方就是用来传入文字参数的
    plugins.weixin.textContent(onSuccess,onError,"send", delivery_content,{
                               scene:sendType
                               });
}

function sendImageContent(){
    var app={
    onCameraSuccess:function(imageURI){
        console.log('imageURI:'+imageURI);
        plugins.weixin.imageContent(onSuccess,onError,"send",imageURI,{
                                     title:"kris",
                                     description:"picture",
                                     scene:sendType
                                     });
    },
    onCameraFail:function(msg){
        var detail = document.getElementById("detail");
        detail.innerHTML="error msg:"+msg;
        console.log('error msg:'+msg);
    },
    getPicture:function(){
        navigator.camera.getPicture(app.onCameraSuccess, app.onCameraFail, {
                                    quality: 50,
                                    destinationType: Camera.DestinationType.FILE_URI,
                                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                                    saveToPhotoAlbum: false
                                    });
    }
    };
    app.getPicture();
}

function sendMusicContent(){
    var songname = localStorage.getItem("songname");
    var songid = localStorage.getItem("songid");
    var songpic = localStorage.getItem("musicpic");
    var singer = localStorage.getItem("artist");
    //这里要避免图片过大
    //var songpic = "http://img.xiami.com/images/album/img84/321984/i35024heu19_1.jpg";
    console.warn("分享到微信的songname:" + songname);
    console.warn("分享到微信的songpic:" + songpic);
    var post_url_para = "&songid="+ songid + "&songname=" + songname + "&singer=" + singer + "&albumCover=" + songpic ;
    var bs64_post_para = encode64(post_url_para);
    var send_music_content = {
        title: songname,
        description:"来自点歌台的心情音乐",
        thumbUrl: songpic,
        lowBandUrl: "http://bbgushi.sinaapp.com/play.php?songid=" + songid,
        scene:sendType
    }
    var send_mp3_link = localStorage.getItem("mp3_link");

    $(".wechat_callback").css("display","block").html("正在发送到微信...");

    cross_server_module.deliver_song();

    plugins.weixin.musicContent(onSuccess,onError,"send",send_mp3_link ,send_music_content);
    //服务器上面的play播放页面必须要处理好。
}

function sendVideoContent(){
    plugins.weixin.videoContent(onSuccess,onError,"send",
                                 "http://www.tudou.com/listplay/0nYp1obVv60/mA_xdJq7lSo.html",
                                 {
                                 title:"video",
                                 description:"Happy Video",
                                 thumbUrl:"http://pluginlist.sinaapp.com/client/images/video.png",
                                 scene:sendType
                                 });
}

function sendWebpageContent(){

    var songname = localStorage.getItem("songname");
    var songid = localStorage.getItem("songid");
    var songpic = localStorage.getItem("musicpic");
    var singer = localStorage.getItem("artist");

    console.log("发送的歌手名字:"+ singer );

    var openid = localStorage.getItem("openid");

    if( openid != null || openid != undefined || openid != "" ){ 
      cross_server_module.deliver_song();
    }else{
      console.log("未登陆");
    }

    /* 发送微信的时候需要监测是否有登陆腾讯微博，如果没有的话就不要做push 同时不要把点歌单写入到数据库中 */

    plugins.weixin.webpageContent(onSuccess,onError,"send",
                                   "http://bbgushi.sinaapp.com/play.php?songid="+ songid ,
                                   {
                                   title: songname ,
                                   description: singer +  "\n\n" + "来自点歌台" ,
                                   thumbUrl: songpic ,
                                   scene: sendType
                                   });
}

function sendAPPContent(){
    $(".wechat_callback").css("display","block").html("正在发送到微信...");
    console.warn("I can share a app to you guys");
    plugins.weixin.APPContent(onSuccess,onError,"send",
                           {
                           title:"点歌台",
                           description:"推荐你使用点歌台应用，可以快速点歌给你的好友，用音乐传达你的心",
                           thumbUrl:"http://sutui.me/static/website/img/1.png",
                           extInfo:"发送App",
                           url:"http://sutui.me",
                           fileData:JSON.stringify(
                                                   {title:"点歌台",
                                                   description:"推荐你使用点歌台应用，可以快速点歌给你的好友，用音乐传达你的心",
                                                   thumbUrl:"http://sutui.me/static/website/img/1.png"}
                                                   ),
                           scene:sendType
                           });
}

function getTextContent() {
    plugins.weixin.textContent(onSuccess,onError,"get","Sina App Engine");
    set2SendView();
}

function getImageContent(){
    var app={
    onCameraSuccess:function(imageURI){
        console.log('imageURI:'+imageURI);
        plugins.weixin.imageContent(onSuccess,onError,"get",imageURI,{
                                    title:"kris",
                                    description:"picture",
                                    });
        set2SendView();
    },
    onCameraFail:function(msg){
        var detail = document.getElementById("detail");
        detail.innerHTML="error msg:"+msg;
        console.log('error msg:'+msg);
    },
    getPicture:function(){
        navigator.camera.getPicture(app.onCameraSuccess, app.onCameraFail, {
                                    quality: 30,
                                    destinationType: Camera.DestinationType.FILE_URI,
                                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                                    saveToPhotoAlbum: false
                                    });
    }
    };
    app.getPicture();
}

function getMusicContent(){
    var mapp={
    onCameraSuccess:function(imageURI){
        console.log('imageURI:'+imageURI);
        plugins.weixin.musicContent(onSuccess,onError,"get",
                                    "http://pluginlist.sinaapp.com/client/music/Sunshine.mp3",
                                    {
                                    title:"Sunshine",
                                    description:"Happy Music",
                                    thumbUrl:imageURI
                                    });
        set2SendView();
    },
    onCameraFail:function(msg){
        var detail = document.getElementById("detail");
        detail.innerHTML="error msg:"+msg;
        console.log('error msg:'+msg);
    },
    getPicture:function(){
        navigator.camera.getPicture(mapp.onCameraSuccess, mapp.onCameraFail, {
                                    quality: 30,
                                    destinationType: Camera.DestinationType.FILE_URI,
                                    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                                    saveToPhotoAlbum: false
                                    });
    }
    };
    mapp.getPicture();
}

function getVideoContent(){
    plugins.weixin.videoContent(onSuccess,onError,"get",
                             "http://www.tudou.com/listplay/0nYp1obVv60/mA_xdJq7lSo.html",
                             {
                             title:"video",
                             description:"Get Happy Video",
                             thumbUrl:"http://tp3.sinaimg.cn/1685135222/180/1283204480/1"
                             });
    set2SendView();
}

function getWebpageContent(){
    plugins.weixin.webpageContent(onSuccess,onError,"get",
                                  "http://sae.sina.com.cn/?m=devcenter&catId=235",
                                  {
                                  title:"消息盒-CashLee李秉骏个人作品",
                                  description:"消息盒是李秉骏实验性作品，为您提供方便的消息发送服务。",
                                  thumbUrl:"http://tp3.sinaimg.cn/1685135222/180/1283204480/1"
                                  });
    set2SendView();
}

function getAPPContent(){
    plugins.weixin.APPContent(onSuccess,onError,"get",
                           {
                           title:"App消息",
                           description:"您的App消息到啦，快去看看吧",
                           thumbUrl:"http://pluginlist.sinaapp.com/client/images/icon.png",
                           extInfo:"dictionary",
                           url:"http://sae.sina.com.cn",
                           fileData:JSON.stringify(
                                                   {title:"App消息名称",
                                                   description:"内容描述",
                                                   thumbUrl:"缩略图链接地址"}
                                                   )
                           });
    set2SendView();
}

function cancle(){
    plugins.weixin.cancleGet();
}

function getWXAppInstallUrl(){
    plugins.weixin.getWXAppInstallUrl(function(resultUrl){
                                   var detail = document.getElementById("detail");
                                   detail.innerHTML="下载地址："+resultUrl;
                                   },onError);
}

function openWXApp(){
    plugins.weixin.openWXApp(function(){
                          console.log('open success');
                          var detail = document.getElementById("detail");
                          detail.innerHTML="open success";
                          },function(){
                          console.log('open error');
                          var detail = document.getElementById("detail");
                          detail.innerHTML="open error";
                          });
}

function isWeixinInstalled(){
    plugins.weixin.isWeixinInstalled(function(){
                          console.log('is installed');
                          var detail = document.getElementById("detail");
                          detail.innerHTML="微信已安装";
                          },function(){
                          console.log('not installed');
                          var detail = document.getElementById("detail");
                          detail.innerHTML="微信未安装";
                          });
}

function isSupportApi(){
    plugins.weixin.isSupportApi(function(){
                                  console.log('is support api');
                                     var detail = document.getElementById("detail");
                                     detail.innerHTML="支持微信API";
                                  },function(){
                                  console.log('not support api');
                                     var detail = document.getElementById("detail");
                                     detail.innerHTML="不支持微信API";
                                  });
}

function registerApp(){
    plugins.weixin.registerApp(function(){
                            registed=true;
                            },onError,appId);
}

function setResponse(){
    plugins.weixin.setResponser("receiveResponse");
}

function receiveResponse(response){
    if(response.type==0)
    {//显示来自第三方的APP扩展信息
        var detail = document.getElementById("detail");
        detail.innerHTML="response";
        detail.innerHTML=detail.innerHTML+"<br>extInfo:"+response.extInfo;
        detail.innerHTML=detail.innerHTML+"<br>url:"+response.url;
        var a=JSON.parse(response.fileData);
        detail.innerHTML=detail.innerHTML+"<br>---file data---<br>title:"+a.title;
        detail.innerHTML=detail.innerHTML+"<br>description:"+a.description;
        detail.innerHTML=detail.innerHTML+"<br>thumbUrl:"+a.thumbUrl;
        
        var viewport = document.getElementById('viewport');
        viewport.style.display = "";
        document.getElementById("picture").src = "data:image/jpeg;base64," + response.thumbData;
    }else if(response.type==4)
    {// 来自微信的请求信息，跳转到获取信息页面
        set2GetView();
    }
}

function set2SendView(){
    var btn1=document.getElementById("btn1");
    btn1.onclick=function(){sendTextContent();};
    btn1.innerHTML="发送文本";
    
    var btn2=document.getElementById("btn2");
    btn2.onclick=function(){sendImageContent();};
    btn2.innerHTML="发送图像";
    
    var btn3=document.getElementById("btn3");
    btn3.onclick=function(){sendMusicContent();};
    btn3.innerHTML="发送音乐";
    
    var btn4=document.getElementById("btn4");
    btn4.onclick=function(){sendVideoContent();};
    btn4.innerHTML="发送视频";
    
    var btn5=document.getElementById("btn5");
    btn5.onclick=function(){sendWebpageContent();};
    btn5.innerHTML="发送网页";
    
    var btn6=document.getElementById("btn6");
    btn6.onclick=function(){sendAPPContent();};
    btn6.innerHTML="发送APP";
    
    document.getElementById("picture").src ="";
}

function set2GetView(){
    var detail = document.getElementById("detail");
    detail.innerHTML="...........................";
    
    var btn1=document.getElementById("btn1");
    btn1.onclick=function(){getTextContent();};
    btn1.innerHTML="获取文本";
    
    var btn2=document.getElementById("btn2");
    btn2.onclick=function(){getImageContent();};
    btn2.innerHTML="获取图像";
    
    var btn3=document.getElementById("btn3");
    btn3.onclick=function(){getMusicContent();};
    btn3.innerHTML="获取音乐";
    
    var btn4=document.getElementById("btn4");
    btn4.onclick=function(){getVideoContent();};
    btn4.innerHTML="获取视频";
    
    var btn5=document.getElementById("btn5");
    btn5.onclick=function(){getWebpageContent();};
    btn5.innerHTML="获取网页";
    
    var btn6=document.getElementById("btn6");
    btn6.onclick=function(){getAPPContent();};
    btn6.innerHTML="获取APP";
    
    document.getElementById("picture").src ="";
}
