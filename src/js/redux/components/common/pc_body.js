import React, {Component} from 'react';
import Nav from './pc_nav';
import PCHeader from './pc_header';
/*import PCFooter from './pc_footer';*/
import Login from './pc_login';
import { Layout, Breadcrumb } from 'antd';


const { Header, Content, Sider } = Layout;

export const Entry = props => {
 return (localStorage.hasLogin ? (<Main>{props.children}</Main>) : <Login />  )
} 


class Main extends React.Component{
/*  const c = cookie.get(NAV_COLLAPSED_COOKIE) == NAV_COLLAPSED_COOKIE_YES ? NAV_COLLAPSED_CLASS : '';*/
  /*return (
    <div>
    <PCHeader />
      <div id="app-container">
        <div className="left-side">
          <Nav />
        </div>
        <div className="right-side">
          <div className="main-content">
            {props.children}
          </div>
        </div>
      </div>
    </div>
  )*/
  constructor(props){
    super(props);
    this.state = {
      collapsed: false,
    };

  }
   render(){
    return (
      <Layout>
        {/*<Header style={{ background: '#fff', padding: 0 }} >
          <a href="/" class="logo">
              <img src="./src/images/logo.png" alt="logo"/>
              <span>Bear</span>
            </a>
        </Header>*/}
        <PCHeader collapsed={this.state.collapsed}
          onCollapse={this.toggle.bind(this)}
         />
      <Layout>
        <Sider
          width={200}
          collapsible
          collapsed={this.state.collapsed}
          style={{background: '#fff'}}
          trigger={null}
        >  
          <Nav />

        </Sider>
        <Layout  style={{ padding: '0 24px 24px' }}>
          {
            this.props.children ?
            this.props.children
            :
            <div>
              <Breadcrumb style={{ margin: '12px 0' }}>
                <Breadcrumb.Item>首页</Breadcrumb.Item>
              </Breadcrumb>
              <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              </Content>
            </div>
          }
        </Layout>
      </Layout>
        
        
      </Layout>
      )
   }
   toggle(){
     this.setState({
       collapsed: !this.state.collapsed,
     });
   }

}



/*export const NoPermission = () => (<h1><center>没有权限</center></h1>);

export const NoPage = () => (<h1><center>404</center></h1>);

export const ComingSoon = () => (<h1><center><i>Coming Soon !</i></center></h1>);*/