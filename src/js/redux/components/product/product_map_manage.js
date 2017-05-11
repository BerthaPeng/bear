import React from 'react';
import { Input , Select, Button, Table, Icon, Layout, Breadcrumb, Row, Col} from 'antd';
import MyMap from 'utils/product_group_scope';
import Nav from '../common/pc_nav';
const { Content, Sider } = Layout;
const Search = Input.Search
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

class FilterHeader extends React.Component{
  render(){
    return (
      <div className="panel search">
        <div className="panel-body form-inline">
          <Search placeholder="关键字搜索"  style={{maxWidth: 150, marginRight: 5}}/>
          分类：
          <Select style={{width: 100}} class="space-right" />
          区域：
          <Select style={{width: 100}} class="space-right" />
          <Button type="primary" icon="search">Search</Button>
        </div>
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
      list: []
    }
  }
  render(){
    let { fullScreen, share, list } = this.state;
    const columns = [{
      title: '编号',
      dataIndex: 'id',
      key: 'id',
      render: id => <a href="#">{id}</a>,
    }, {
      title: '产品名',
      dataIndex: 'name',
      key: 'name',
    },{
      title: '生产日期',
      dataIndex: 'created',
      key: 'standard'
    },{
      title: '操作',
      key: 'action' + 'id',
      render: (text, record) => (
        <span>
          <a href="javascript:;" onClick={this.getProductLat.bind(this, record.id)}>查看分布</a>
          <span className="ant-divider" />
          {/*<a href="#" className="ant-dropdown-link">
            上架 <Icon type="down" />
          </a>*/}
        </span>
      ),
    }];
    return (
      <div>
        <TopHeader />
        <Layout style={{padding:'24px 0', background: '#fff' }}>
          <Sider width={200} style={{ background: '#fff' }}>
            <Nav />
          </Sider>
          <Content style={{padding:'0 24px', minHeight: 280 }}>
          <FilterHeader />
          <Row>
            <Col span={10}>
              <div className="panel">
                <div className="panel-body">
                  <Table columns={columns} dataSource={list} />
                </div>
              </div>
            </Col>
            <Col span={14}>
              <div className="panel" style={{marginLeft: '10px'}}>
                <div className="panel-body">
                  <div ref="map" className={`product-map ${fullScreen ? 'full-screen' : ''}`}>
                    <div className="map-toolbar">
                      <Search placeholder="地点搜索" id="searchInput"  style={{maxWidth: 150, marginRight: 5}}/>
                      <a onClick={this.fullScreen.bind(this)} className={`full-screen-btn ${share ? 'hidden' : ''} space-right`} href="javascript:;"></a>
                      {/*<SearchInput id="searchInput" type="text"  style={{width: 188}} />*/}
                    </div>
                    <div id="map_container" className="map-container"></div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          </Content>
        </Layout>
      </div>
      )
  }
  componentDidMount(){
    var self = this;
    MyMap.create(function(map){
      this.setState({ mapPrepared: true });
    }.bind(this));
    var data_list =  {
        "header": {
            "token": "",
            "client_key": ""
        },
        "data": {
            "event_id": "GetProductList",
            "param": {
              "companyId": "1005"
            }
        }
    };
    $.ajax({
        url: "http://119.23.132.97/api/product",
        type: "POST",
        cache: false,
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(data_list),
    })
    .done((data) => {
       self.setState({list: data.data})
    })
  }
  fullScreen(){
    this.setState({ fullScreen: !this.state.fullScreen });
  }
  getProductLat(userId){
    var data = {
        "header": {
            "tokenOperator": "",
            "tokenDevice": ""
        },
        "data": {
            "event_id": "get_product_usage_stat_by_xy",
            "param": {
                "prodId": "1001",
                userId
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