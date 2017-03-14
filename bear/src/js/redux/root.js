import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
/*import PCIndex from './components/pc_index';
import ProductManage from './components/product/product_manage';
import MobileIndex from './components/mobile_index';*/
import MobileProduct from './components/product/mobile_product';

import {Entry} from './components/common/pc_body';
import {MobileEntry} from './components/common/mobile_body';
/*import 'antd/dist/antd.css';*/

import MediaQuery from 'react-responsive';

let components = {};

const getComponents = (routePath, accessControl) => (nexState, replace, callback) => {
  if(accessControl && !accessControl(nexState, replace)){
    debugger
    return;
  }

  switch(routePath){
    case 'pm':
      require.ensure([], require => {
        /*components = {...components,
          'ProductPannel' : require('./components/product/product_manage.js'),
        }*/
        components.ProductPannel = require('./components/product/product_manage.js').default;
        components.ProductDetailPannel = require('./components/product/mobile_product').default;
        callback();
      });
      break;
    default:
      break;
  }
}

const get = componentName => (location, callback) => {
  callback(undefined, components[componentName]);
}

/*export default class Root extends React.Component{
  render(){
    return (
      //这里替换了之前的Index,变成了程序的入口
      <div>
        <MediaQuery query='(min-device-width: 1224px)'>
          <Router history={hashHistory}>
            <Route path="/" component={Entry}>
              <Route path="pm" onEnter={getComponents('pm')}>
                <Route path="index" getComponent={get('ProductPannel')}>
                </Route>
              </Route>

            </Route>
          </Router>
        </MediaQuery>
        <MediaQuery query='(max-device-width: 1224px)'>
          <Router history={hashHistory}>
            <Route path="/" component={MobileIndex}></Route>
            <Route path="/product/:id" component={MobileProduct}></Route> 
          </Router>
        </MediaQuery>
      </div>
    )
  }
}*/

const Root = () =>(
      //这里替换了之前的Index,变成了程序的入口
      <div>
        <MediaQuery query='(min-device-width: 1224px)'>
          <Router history={hashHistory}>
            <Route path="/" component={Entry}>
              <Route path="pm" onEnter={getComponents('pm')}>
                <Route path="product">
                  <IndexRoute getComponent={get('ProductPannel')} />
                </Route>
                </Route>
              </Route>
          </Router>
        </MediaQuery>
        <MediaQuery query='(max-device-width: 1224px)'>
          <Router history={hashHistory}>
            <Route path="/" component={MobileEntry}>
              <Route path="pm" onEnter={getComponents('pm')}>
                <Route path="product">
                  <Route path=":id" getComponent={get('ProductDetailPannel')} />
                </Route>
              </Route>
            </Route>
              {/*<Route path="/pm/product/:id" getComponent={get('ProductDetailPannel')} />*/}
          </Router>
        </MediaQuery>
      </div>
)

ReactDOM.render(<Root/>, document.getElementById('mainContainer'));