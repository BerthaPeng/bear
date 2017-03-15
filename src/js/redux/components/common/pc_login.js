import React from 'react';
import {  Icon,  Button, Input} from 'antd';
import { createHistory } from 'history';

const history = createHistory();

export default class Login extends React.Component{
  render(){
    return (
      <div ref="me" className="login-container">
        <div className="container">
          <div className="form-signin">
            <div className="form-signin-heading text-center">
              {/*<img src="./src/images/logo.png" alt="" />*/}
              <span>Bear</span>
            </div>
            <div className="login-wrapper">
              <div class="input-box">
                <Input 
                  class="input"
                  prefix={<Icon type="user" />}
                 placeholder="用户名"
                 size = "large" />
              </div>
              <div className="input-box">
                <Input 
                 class="input"
                  type="password"
                  prefix={<Icon type="lock" />}
                 placeholder="密码"
                 size = "large" />
              </div>
              <Button type="primary" class="login-btn" onClick={this.login.bind(this)}>登录</Button>
            </div>
          </div>
        </div>
      </div>
      )
  }
  login(){
    var user = {
      username : 'admin',
      userNickname: '超级大BOSS',
    }
    localStorage.login = true;
    localStorage.setItem('user', JSON.stringify(user));
    location.reload()
  }
}
