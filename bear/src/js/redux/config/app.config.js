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

export default {
  fetchOptions,
  requestUrl: 'http://119.23.132.97:8001/api',
}