//view objects 
var cm_fnc = {
  "name" : "chinamobile" ,
  "content" : [
    {"name": "移动查询余额","msg":"ye"},
    {"name": "移动查询流量","msg":"cxgprstc"},
    {"name": "归属地","msg":""}
  ]
};

var un_fnc = {
  "name" : "unicom",
  "content" : [
    {'name':'联通查询余额流量','msg':'hf'}
  ]
}

var te_fnc = {
  "name" : "telcom",
  "content" : [
    {'name':'暂时未能提供服务','msg':'none'}
  ]
}

var se_fnc = {
  "name" : "self",
  "content" : [
    {'name':'起床','msg':'起床咯Baby'},
    {'name':'吃饭','msg':'够钟吃饭啦，不要饿着啊'},
    {'name':'吃药','msg':'够钟吃药啦，要快点好起来噢'},
    {'name':'在哪里','msg':'在哪里啊baby'},
    {'name':'到你楼下了','msg':'baby我到你楼下咯'},
  ]
}

var select_items = [
  {"name":"中国移动服务" , "number" : "10086" , "function_list" : cm_fnc , "en_name" : "chinamobile" },
  {"name":"中国联通服务" , "number" : "10010" , "function_list" : un_fnc , "en_name" : "unicom" },
  {"name":"中国电信服务" , "number" : "10000" , "function_list" : te_fnc , "en_name" : "telcom" },
  {"name":"Baby K" , "number" : "13824528834" , "function_list" : se_fnc , "en_name" : "self" }
]