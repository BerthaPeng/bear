import React from 'react';
import { Input , Select, Button, Table, Icon, Layout, Breadcrumb, Row, Col} from 'antd';
import MyMap from 'utils/product_group_scope';
import Nav from '../common/pc_nav';
const { Content, Sider } = Layout;
import * as config from  'config/app.config.js';

class TopHeader extends React.Component{
  render(){
    return (
      <div>
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Breadcrumb.Item>首页</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      )
  }
}
export default class QrcodeManage extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      mapPrepared: false, //地图是否已加载好
      fullScreen: false, //地图是否全屏
      share: false,
    }
  }
  render(){
    let { fullScreen, share } = this.state;
    return (
      <div>
        <TopHeader />
        <Layout style={{padding:'24px 0', background: '#fff' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Nav />
          </Sider>
          <Content style={{padding:'0 24px', minHeight: 280 }}>
          <div className="panel">
            <div className="panel-body">
              <div ref="map" className={`product-map ${fullScreen ? 'full-screen' : ''}`}>
                <div className="map-toolbar">
                  <a onClick={this.fullScreen.bind(this)} className={`full-screen-btn ${share ? 'hidden' : ''} space-right`} href="javascript:;"></a>
                  {/*<SearchInput id="searchInput" type="text"  style={{width: 188}} />*/}
                </div>
                <div id="map_container" className="map-container"></div>
              </div>
            </div>
          </div>
          </Content>
        </Layout>
      </div>
      )
  }
  componentDidMount(){
    var self = this;
    MyMap.create(function(map){
      this.setState({ mapPrepared: true });
      /*this.disposeAutocomplete = MyMap.createAutocomplete('searchInput');*/
    }.bind(this));

    var data = {
        "header": {
            "tokenOperator": "",
            "tokenDevice": ""
        },
        "data": {
            "event_id": "get_product_usage_stat_by_xy",
            "param": {
                "prodId": "1001",
                "userId": "104"
            }
        }
    };
    $.ajax({
        url: "http://119.23.132.97/api/trace_product",
        type: "POST",
        cache: false,
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(data),
        success: function (data) {
            self._mapInitTimer = setInterval( () => {
              if(self.state.mapPrepared){
                MyMap.list = data.data;
                MyMap.initialScope();
                clearInterval(self._mapInitTimer);
                self.state.callback && self.state.callback();
              }
            }, 100)
        }
    });
  }
  fullScreen(){
    this.setState({ fullScreen: !this.state.fullScreen });
  }
  componentWillReceiveProps(nextProps) {
      this._mapInitTimer = setInterval( () => {
        if(this.state.mapPrepared){
          MyMap.reset();
          //服务器传来的数据coords是字符串形式的，需要转换
/*          MyMap.list = nextProps.list.map( n => {
            return {...n, coords: MyMap.changeToPonits(n.coords)};
          });*/

          MyMap.initialScope();
          clearInterval(this._mapInitTimer);
          this.state.callback && this.state.callback();
        }
      }, 100);
  }
}