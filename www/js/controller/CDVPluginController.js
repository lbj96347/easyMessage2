var user_action = {
  "tap" : function(obj){
    var item_select = obj.id;
    var item_father_name =  item_select.split("-")[0]
    var item_key =  item_select.split("-")[1]
    for( var x in select_items){
      if(item_father_name == select_items[x].en_name ){
        var delivery_content = select_items[x].function_list.content[item_key].msg;
        var delivery_num = select_items[x].number;
        user_action.action(delivery_num, delivery_content);
      }
    }
  },
  "action" : function (delivery_num, delivery_content){
    actionSheet.create(
    null,
    ['短信', '微信', '取消'],
    function(buttonValue, buttonIndex) {
        /* 在这里获取了值之后，产生发送短信或者推送到微信的功能 */
        console.log("这里是按钮值" + buttonValue + "这里的buttonIndex的值是" + buttonIndex);
        console.warn('create(), arguments=' + Array.prototype.slice.call(arguments).join(', '));
        if( buttonIndex == 0 ){ senderAction.sms(delivery_num, delivery_content); }
        if( buttonIndex == 1 ){ senderAction.weixin(delivery_content); }
    },
    {
        cancelButtonIndex: 2
                       
    });
  }
}

var senderAction = {
    "sms" : function (delivery_num, delivery_content){
        smsPlugin.showSMSComposer(delivery_num, delivery_content );
    },
    "weixin" : function (delivery_content){
        sendTextContent(delivery_content);
        
        //navigator.notification.alert("暂时未开通微信服务");
    }
}