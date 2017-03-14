import React from 'react';
import MobileHeader from '../common/mobile_header';
import { Carousel, Steps, Icon} from 'antd';
const Step = Steps.Step;

export default class MobileProduct extends React.Component{
  render(){
    const settings = {
          dots: true,
          infinite: true,
          speed: 500,
          slidesToShow: 1,
          autoplay: true
        };
    return(
      <div>
        <MobileHeader />
          <div class="mobile-panel"  style={{marginTop: 0}} >
            <div class="carousel">
              <Carousel {...settings}>
                <div><img src="./src/images/sample_pic_1.jpg"/></div>
                <div><img src="./src/images/sample_pic_2.jpg"/></div>
                <div><img src="./src/images/sample_pic_3.jpg"/></div>
                <div><img src="./src/images/sample_pic_4.jpg"/></div>
              </Carousel>
            </div>
            <div class="title-info clearfix">
              <p class="title">鳗生活 鲜 鳗生活 烤鳗鱼 日式蒲烧鳗鱼 1000g送礼盒装加热即食鳗鱼活鳗加工顺丰包邮</p>
              <p class="price">￥499</p>
            </div>
            <div class="block">
              <span>服务</span>
              <span>&nbsp;&nbsp;&nbsp;<Icon type="qrcode" style={{color: '#2db7f5'}}/>&nbsp;正品保障</span>
              <span>&nbsp;&nbsp;<Icon type="pay-circle-o" style={{color: '#2db7f5'}}/>&nbsp;假一赔三</span>
            </div>
          </div>
          <div class="mobile-panel"  style={{marginTop: 10}}>
            <div class="properties">
              <p class="title">商品介绍</p>
              <div style={{height: 150}}></div>
            </div>
          </div>
          <div class="mobile-panel" style={{marginTop: 10}}>
            <div class="schedule">
              <span class="title">商品追溯</span><span style={{float: 'right'}}><em style={{color: '#2db7f5'}}>100%</em><span>正规渠道</span></span>
              <Steps direction="vertical" size="small" current={5} style={{marginTop: 15}}>
                <Step title="已出售" description="2017-01-02 17:20 售出" />
                <Step title="售卖" description="2017-01-01 09:00 在深圳市南山区欢乐颂超市开始售卖"/>
                <Step title="进仓" description="2017-01-01 09:00 在深圳市南山区欢乐颂超市开始售卖"/>
                <Step title="打包" description="2017-01-01 09:00 在深圳市南山区欢乐颂超市开始售卖"/>
                <Step title="生产" description="2017-01-01 09:00 在深圳市南山区欢乐颂超市开始售卖"/>
              </Steps>
            </div>
          </div>
        {/*<MobileFooter />*/}
      </div>
      )
  }
}