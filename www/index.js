//public variable
var smsPlugin;
var actionSheet;

  function onConfirm(data){
    console.log(console.log("this is the callback data number : " + data));
    console.log("run show confirm box ");
  }
  
  function showConfirmBox(){
    navigator.notification.confirm(
    '获取歌曲资源失败，是否重试',  // message
    onConfirm,              // callback to invoke with index of button pressed
    '提示',            // title
    '取消,确定'          // buttonLabels
    );
  }



/* require all the js files here */
requirejs.config({
  //By default load any module IDs from js/lib
  baseUrl: 'lib',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
  paths: {
      app: '../js'
  }
});

requirejs([
  /* Cordova Plugins */
  'ActionSheet',
  'SMSComposer',
  'weixin_api',
  'weixin',
  /* Javascript Libraries */
  'iscroll',
  'zepto',
  /* App Files */
  '../js/controller/CDVPluginController',
  '../js/model/itemRender',
  '../js/view/defaultReceiver',
  /* App Config */
  '../js/config/iscroll_config'
  ],
  function (){
    console.log("Check Require Js");
    //onDeviceReady();
    document.addEventListener("deviceready",onDeviceReady,false);
  }
);

var scrollPart;

var onDeviceReady = function (){


  
  console.log("If device is ready,require for javascript files");
      $(document).ready(function(){
      smsPlugin = window.plugins.smsComposer;
      actionSheet = window.plugins.actionSheet;
      view_render.option_render();
      view_render.list_render();
      /* 允许wrapper 滚动 */
      scrollPart = new iScroll('scroller');
      //scrollConfig();
      console.log(scrollPart);
      $("#header select").change( function (){
        view_render.list_render();
      });
    });
  // Start the main app logic.
}

var scrollConfig = function (){
  scrollPart.scrollerH = 360;
  scrollPart.scrollerW = 320;
  scrollPart.maxScrollY = -360;
  scrollPart.wrapperH = 360;
  scrollPart.wrapperW = 320;
  scrollPart.y = -360;
  scrollPart.wrapperOffsetTop = 80;//根据bar的大小进行定义
}

//localStorage objects