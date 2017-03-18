import React, {Component} from 'react';

import {Link} from 'react-router';

import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;

export default class Sider extends Component {
  constructor(props){
    super(props);
    this.state = {
      current: '1',
      openKeys: [],
    };
  }
  render() {
    return (
      <Menu
        mode="inline"
        openKeys={this.state.openKeys}
        selectedKeys={[this.state.current]}
        onOpenChange={this.onOpenChange.bind(this)}
        onClick={this.handleClick.bind(this)}
        style={{height: '100%', paddingTop: 30}}
      >
        <SubMenu key="sub1" title={<span><Icon type="appstore" /><span className="nav-text">产品管理</span></span>}>
          <Menu.Item key="1"><Link to="/pm/product">产品管理</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" title={<span><Icon type="appstore" /><span className="nav-text">生产管理</span></span>}>
          <Menu.Item key="9"><Link to="/mm/process">生产环节管理</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>权限管理</span></span>}>
          <Menu.Item key="5"><Link to="/am/user">用户管理</Link></Menu.Item>
          <Menu.Item key="6"><Link to="/am/role">角色权限管理</Link></Menu.Item>
          <Menu.Item key="7"><Link to="/am/role">部门角色管理</Link></Menu.Item>
          <Menu.Item key="8"><Link to="/am/sysauth">系统权限管理</Link></Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
  handleClick(e){
    console.log('Clicked: ', e);
    this.setState({ current: e.key });
  }
  onOpenChange(openKeys){
    const state = this.state;
    const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
    const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
    }
    if (latestCloseKey) {
      nextOpenKeys = this.getAncestorKeys(latestCloseKey);
    }
    this.setState({ openKeys: nextOpenKeys });
  }
  getAncestorKeys(key){
    const map = {
      sub3: ['sub2'],
    };
    return map[key] || [];
  }
}