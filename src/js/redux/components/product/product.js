Page({
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 500,
    showMsg: true,
    tips: 'error_msg: ',
    traceState: 'loading',
    product: {
      area: "全国",
      description: "农夫山泉选取天然的优质水源，仅对原水做最小限度的、必要的处理，保存了原水中钾、钠、钙、镁、偏硅酸等对人体有益的矿物元素，pH值为7.3±0.5，呈天然弱碱性，适于人体长期饮用。",
      id: "0001",
      image: "https://www.wulian2025.net/images/thumb/103.jpg",
      name: "农夫山泉纯净水",
      standard: "600ml",
      supplier: "农夫山泉",
      "type": "饮料 >  纯净水",
    },
    trace_product: [
    ]


  },
  closeMsg: function () {
    this.setData({ showMsg: false })
  },
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var _this = this;
    var imgUrls = [];
    var codeUrl = decodeURIComponent(options.q)
    var productid = "";
    var openid = "";
    var latitude = "";
    var longitude = "";
    if (options.q) {
      var strs = codeUrl.split("=");
      productid = strs[1];
    } else if (options.productid) {
      productid = options.productid;
    }
    wx.login({
      success: function (res) {
        // success
        var appId = "wxa60033b8c184b8e0";
        var appSecret = "5c8c628a1016541b01926264877f23de";
        if (res.code) {
          wx.request({
            url: "https://api.weixin.qq.com/sns/jscode2session",
            data: {
              js_code: res.code,
              secret: appSecret,
              appid: appId,
              grant_type: 'authorization_code',
            },
            header: {
              'content-type': 'application/json'
            },
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (sessionResult) {
              // success
              wx.getLocation({
                type: 'gcj02', // 默认为 wgs84 返回 gps 坐标，gcj02 返回可用于 wx.openLocation 的坐标
                success: function (res) {
                  // success
                  wx.request({
                    url: 'https://www.wulian2025.net/api',
                    data: {
                      header: { "tokenOperator": "", "tokenDevice": "" },
                      data: {
                        "event_id": "handle_qr_scanning",
                        "param": {
                          "instance": productid,
                          "latitude": res.latitude.toString(),
                          "longitude": res.longitude.toString(),
                          "wid": sessionResult.data.openid
                        }
                      },
                    },
                    method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
                    header: {
                      'content-type': 'application/json'
                    },
                    success: function (res) {
                      // success
                      if (res.data.error_code == 200) {
                        if (res.data.data.length && res.data.data[0].instance_id) {
                          var data = _this.parseTraceData(res.data.data, productid);
                          console.warn(data)
                          _this.setData({
                            trace_product: res.data.data,
                            traceState: 'success'
                          });
                        } else {
                          _this.setData({
                            traceState: 'error',
                            tips: '当前商品无溯源信息'
                          })
                        }
                      }
                      else {
                        _this.setData({
                          traceState: 'error',
                          tips: res.data.error_msg || '产品溯源信息出现错误'
                        })
                      }
                    },
                    fail: function (res) {
                      // fail

                      _this.setData({
                        traceState: 'error',
                        tips: '产品溯源信息出现错误'
                      })
                    },
                    complete: function (res) {
                      // complete
                    }
                  })
                },
                fail: function (res) {
                  // fail
                },
                complete: function (res) {
                  // complete
                }
              })

            },
            fail: function (res) {
              // fail
            },
            complete: function (res) {
              // complete
            }
          })
        }
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })

  },
  parseTraceData: function (list, instance_id) {
    var new_list = [], tmp_list = [], i=0;
    tmp_list = list.filter( m => m.instance_id == instance_id)
      .map( h => {h.level = i;return h;});
    list = list.filter( m => {
     return  tmp_list.every( n => n.instance_id != m.instance_id);
    })
    if(tmp_list.length){
      new_list.push(tmp_list[0]);
      while (new_list.length < list.length) {
        i++;
        tmp_list = list.filter( m => {
          return tmp_list.some(n => n.last_instance_id == m.instance_id);
        })
        //.map(h => { h.level = i; new_list.push(h); return h; });
        list = list.filter(m => {
          return tmp_list.every(n => n.instance_id != m.instance_id);
        })
      }
    }
    return new_list;
    
  }
})