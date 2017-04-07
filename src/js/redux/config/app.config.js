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


export default {
  fetchOptions,
  ajaxData,
/*  requestUrl: 'http://119.23.132.97:8001/api',
  trace_product: 'http://119.23.132.97:8001/api/trace_product',
  product_info: 'http://119.23.132.97:8001/api/product',*/
  requestUrl: 'http://sr.keyel.net/api',
  trace_product: 'http://sr.keyel.net/api/trace_product',
  product_info: 'http://sr.keyel.net/api/product',
}