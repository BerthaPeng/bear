var fetchOptions = function(type, event , params){
  return {
    method: type,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      header :{
        token:"",
        client_key:""
       },
      data :{
        event_id: event,
        param: params
       }
    })
  }
}

var ajaxData = function(event , params){
  return {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      header :{
        token:"",
        client_key:""
       },
      data :{
        event_id: event,
        param: params
       }
    })
  }
}

var device_list = [
  {id: 1, text: '生产线'},
  {id: 2, text: '仓库入口1'},
  {id: 3, text: '仓库出口1'},
  {id: 4, text: '沃尔玛入口1'},
]


export default {
  fetchOptions,
  ajaxData,
  device_list,
  ajax: 'http://119.23.132.97/api',
  test_auth: true, //开启测试权限时为true
/*  requestUrl: 'http://119.23.132.97:8001/api',
  trace_product: 'http://119.23.132.97:8001/api/trace_product',
  product_info: 'http://119.23.132.97:8001/api/product',*/
  requestUrl: 'http://sr.keyel.net/api',
  trace_product: 'http://goofyluo.oicp.net/api/trace_product',
  product_info: 'http://goofyluo.oicp.net/api/product',
}