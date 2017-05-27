import React from 'react';
import {Link} from 'react-router';
import { Input , Select, Button, Table, Icon, Layout, Breadcrumb, Modal,
         Transfer, Checkbox, Row, Col, Tag, Badge, message} from 'antd';
import { post } from 'utils/request';
const { Content } = Layout;
const {Option } = Select;
var QRCode = require('qrcode.react');

const columns = [{
  title: '名称',
  dataIndex: 'name',
  key: 'name',
},{
  title: '分配部门',
  dataIndex: 'org_name',
  key: 'org',
},{
  title: '操作',
  dataIndex: 'action',
  key: 'action',
  render: () => (
    <span>
      <a href="#">编辑</a>
      <span className="ant-divider" />
      <a href="#">删除</a>
    </span>
    )
}]
export default class ProductForm extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      procedure_visible: false,
      procedure_list: [],
      new_procedure_name: '',
      new_procedure_org: '',
      targetKeys: [],
      product_count: 0,
      package_count: 0,
      select_productids: [],
      submit_ing: false,
      source_list: [],
      pid: '',
    }
  }
  render(){
    var { product_count, package_count, submit_ing, source_list, pid } = this.state;
    return (
      <div style={{marginLeft: '26px',}}>
        <Breadcrumb style={{ margin: '12px 0' }}>
          <Breadcrumb.Item><Link to="/test/qrcode">测试</Link></Breadcrumb.Item>
          <Breadcrumb.Item>生产线</Breadcrumb.Item>
        </Breadcrumb>
        <Layout style={{padding:'24px 0', background: '#fff' }}>
          <Content style={{padding:'0 0px', minHeight: 280 }}>
            <div class="form-panel">
              <div class="panel-form">
                <header class="panel-heading"><Icon type="bars" />
                  <span> 梅菜扣肉生产线</span>
                  <div
                    class="fly-img">
                    <img src="/src/images/logo.png" /></div>
                  {/*<div style={{float: 'right'}}>
                    <Badge count={package_count} style={{ backgroundColor: '#87d068'}}>
                        <Tag color="cyan" id="package-tag">包裹</Tag>
                    </Badge>
                  </div>*/}
                  <div style={{float: 'right'}}>
                    <Badge count={product_count} style={{ backgroundColor: '#87d068'}}>
                        <Tag color="cyan" id="product-tag">产品</Tag>
                    </Badge>
                  </div>
                </header>
                <div class="panel-body">
                  {/*<div>
                    <p>梅菜扣肉罐头</p>
                    <div>
                      <Row gutter={16}>
                        <Col span={9}>
                          <div class="product-box">
                            <Tag color="cyan">梅菜扣肉罐头1</Tag>
                            <Tag color="cyan">梅菜扣肉罐头2</Tag>
                            <Tag color="cyan">梅菜扣肉罐头3</Tag>
                            <Tag color="cyan">梅菜扣肉罐头4</Tag>
                            <Tag color="cyan">梅菜扣肉罐头5</Tag>
                            <Tag color="cyan">梅菜扣肉罐头6</Tag>
                            <Tag color="cyan">梅菜扣肉罐头7</Tag>
                          </div>
                        </Col>
                        <Col span={2}>
                          <Select placeholder="包裹内单品个数"
                          style={{ width: 105 }}
                          >
                            <Option value="4">4/组</Option>
                            <Option value="8">8/组</Option>
                          </Select>
                          <Button style={{marginTop: '20px'}} type="primary">打包package</Button>
                        </Col>
                        <Col span={5}></Col>
                      </Row>
                    </div>
                    <div>打包package</div>
                  </div>*/}
                  <div style={{padding: '8px'}}>
                    <Row gutter={24}>
                      <Col span={14}>
                        <Transfer
                          dataSource={source_list}
                          showSearch
                          listStyle={{
                            width: 250,
                            height: 300,
                          }}
                          titles={['现有原材料', '已选原材料']}
                          operations={['选 择', '撤 销']}
                          targetKeys={this.state.targetKeys}
                          render={item => `${item.title}-${item.description}`}
                          style={{display: 'inline-block'}}
                          onChange={this.handleChange.bind(this)}
                          searchPlaceholder="请输入搜索内容"
                          notFoundContent = "列表为空"
                        />
                      </Col>
                      <Col span={4}>
                        <Button loading={submit_ing} type="primary" onClick={this.onProduce.bind(this, 'product')} style={{marginTop: '100px', display: 'block'}}>生产</Button>
                        <br />{/*<Select placeholder="包裹内单品个数"
                        style={{ width: 105 }}
                        >
                          <Option value="4">4/组</Option>
                          <Option value="8">8/组</Option>
                        </Select>*/}
                        {/*<Button type="primary"
                          onClick={this.onProduce.bind(this, 'package')}
                        >选择</Button>*/}
                      </Col>
                      <Col span={6}>
                      <div  style={{marginTop: '20px'}}>
                      { 
                        pid != ''
                        ?
                        <QRCode  value={"https://www.wulian2025.net?productid=" + pid}/>
                        :null
                      }
                      </div>
                      </Col>
                    </Row>
                  </div>

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
    post('http://119.23.132.97/api', 'get_product_ingredients', {pid: '109'})
    .done((data) => {
       var ingre = [];
       ingre = data.map( m => ({key: m.id, type: m.type, description: m.briefing, title: m.name}))
       self.setState({source_list: ingre})
    })
    .fail( msg => {
      message.error(msg || '网络异常，请稍后再试')
    })
  }
  showProcedureModal(){
    this.setState({procedure_visible: true});
  }
  handleProcedureModalCancel(e){
      this.setState({
        procedure_visible: false,
      });
  }
  handleProcedureModalOK(){
    var { procedure_list } = this.state;
    procedure_list.push({
      key: procedure_list.length,
      name: $('#procedure_name').val(),
      org_name: this.state.new_procedure_org,
    })
    this.setState({
          procedure_list,
          procedure_visible: false,
        });
  }
  handleChange(nextTargetKeys, direction, moveKeys){
      this.setState({ targetKeys: nextTargetKeys });
  }
  onSelectOrgChange(value){
    this.setState({new_procedure_org: value});
  }
  onProduce(moda, event){
    var self = this;
    this.setState({pid: '', submit_ing: true})
    var event_data = [];
    var { targetKeys, source_list } = this.state;
/*    source_list.forEach( m => {
      if(targetKeys.some( h => h == m.key)){
        event_data.push({pid: m.key.toString(), instance_type: m.type.toString()})
      }
    })*/
    targetKeys.forEach( m => {
      event_data.push({pid: m.toString(), instance_type: "66"})
    })
    post("http://119.23.132.97/api", "handle_product_event", {event_data, event_type: "5" })
      .done((data) => {
        self.setState({pid: data.pid, submit_ing: false})
        var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft || 0,
          scrollTop = document.documentElement.scrollTop || document.body.scrollTop || 0;

        var flyImg = $('.fly-img').get(0);
        var target = moda == 'product' ? $('#product-tag').get(0) : $('#package-tag').get(0);
        flyImg.style.visibility = 'hidden';
        flyImg.style.display = 'block';
        flyImg.style.left = event.clientX + scrollLeft + "px";
        flyImg.style.top = event.clientY + scrollTop - 30 + "px";
        flyImg.style.visibility = "visible";
        var myParabola = funParabola(flyImg, target, {
          speed: 800,
          curvature: 0.01,
          complete: function() {
            flyImg.style.visibility = "hidden";
            let { product_count, package_count } = self.state;
            product_count += 1;
            package_count += 1;
            if(moda == "product")
              self.setState({product_count: product_count})
            else
              self.setState({package_count: package_count})
          }
        });
        // 需要重定位
        myParabola.position().move();
      })
      .fail( msg => {
         message.error(msg || '网络异常，请稍后再试')
         self.setState({submit_ing: false})
      })

  }
}