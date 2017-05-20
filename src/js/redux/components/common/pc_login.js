import React from 'react';
import {Form, Icon,  Button, Input} from 'antd';
const FormItem = Form.Item;
import { createHistory } from 'history';
import { post } from 'utils/request';
var md5 = require('md5')

const history = createHistory();

class NormalLoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      err_msg: '登录失败！用户名或密码错误',
    }
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入用户名!' }],
          })(
            <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-btn">
            登 录
          </Button>
          <p style={{color: '#f50'}}>{this.state.err_msg}</p>
        </FormItem>
      </Form>
    );
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let { username, password } = values;
        password = md5(password);
        post("http://119.23.132.97/api", "user_login_with_mobile", {mobile: username, pwhsh: password})
          .done(() => {
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("login", "Y")
            /*sessionStorage.setItem("token", data.token);
            sessionStorage.setItem("role", data.role)*/
            location.reload();
          })
          .fail(() => {
            this.setState({err_msg: '登录失败！用户名或密码错误'})
            sessionStorage.setItem("login", "N")
          })
      }
    });
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm);

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
              <WrappedNormalLoginForm />
             {/* <div class="input-box">
                <Input
                  class="input"
                  ref="username"
                  prefix={<Icon type="user" />}
                 placeholder="用户名"
                 size = "large" />
              </div>
              <div className="input-box">
                <Input
                  ref="password"
                  class="input"
                  type="password"
                  prefix={<Icon type="lock" />}
                 placeholder="密码"
                 size = "large" />
              </div>
              <Button type="primary" class="login-btn" onClick={this.login.bind(this)}>登录</Button>*/}
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
    /*localStorage.login = true;*/
    /*sessionStorage.setItem('username', )*/
    /*localStorage.setItem('user', JSON.stringify(user));*/
    location.reload()
  }
}
