//view render object
var view_render = {
  "option_render" : function (){
    for( var x in select_items ){
      $('#header select').append("<option id='item"+ x +"' value='item"+ x +"'>"+ select_items[x].name +"</option>");
    }
  },
  "list_render" : function (){
    $('ul').html("");
    var now_select_value = $("#header select").val();
    now_select_value = parseInt(now_select_value.substring(4));
    for( var x in select_items[now_select_value].function_list.content  ){
      var item_name =  select_items[now_select_value].function_list.content[x].name;
      var item_msg =  select_items[now_select_value].function_list.content[x].msg;
      $('ul').append("<li onclick='user_action.tap(this)' id='"+ select_items[now_select_value].function_list.name +"-"+ x +"' >"+ item_name +"</li>");
    }
  }
}