/**
 * Created by Administrator on 2016/10/18.
 */
import React from 'react';
import { NavBar, Icon,Button,Grid,Flex,WingBlank, WhiteSpace} from 'antd-mobile';
import {Link} from 'dva/router';
import styles from './Home.less';
import fetch from 'dva/fetch';
import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll';

var Home = React.createClass({

  getInitialState: function () {
    return {
      NowDate: ["2016.08.08"],
      Ysale: [ ],//昨日总销售额
      Yrate: [],//较上周同期
      Msale: [],//本月销售总额
      Mrate: [],//较上月同期
      addNum: [],//高于同期门店数
      DNum:[],//低于同期门店数
      shopName:[]
    }

  },




  componentDidMount() {

    window.onpopstate = function(event) {

    };

    var   today=new   Date();
    var   yesterday_milliseconds=today.getTime()-1000*60*60*24;

    var   yesterday=new   Date();
    yesterday.setTime(yesterday_milliseconds);

    var strYear=yesterday.getFullYear();

    var strDay=yesterday.getDate();
    var strMonth=yesterday.getMonth()+1;

    if(strMonth<10)
    {
      strMonth="0"+strMonth;
    }
    var strYesterday=strYear+"-"+strMonth+"-"+strDay;

    const myDate = new Date();
    const nowdate = myDate.toLocaleDateString();
    const Nowdate = nowdate.replace(/([/])/g, ".")
    this.setState({NowDate: Nowdate});

    var userIf =localStorage.getItem("userinfo");
    userIf = JSON.parse(userIf);

    var url = localStorage.getItem("url");
    url = url+'iyy';

      fetch(url, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify({
          "bDate":strYesterday,
          "EN":userIf.en,
          "UserId":userIf.userid,

        })

      },this).then(function (res) {
        console.log("fetch request ", JSON.stringify(res.ok));
        if (res.ok) {
          res.json().then(function (json) {
            console.info(json);
            this.setState({Ysale: json.data.yesterdaySale});
            this.setState({Yrate: json.data.yesterdayRate});
            this.setState({Msale: json.data.monSale});
            this.setState({Mrate: json.data.monRate});
            this.setState({addNum: json.data.addNum});
            this.setState({DNum: json.data.decreaseNum});
            this.setState({shopName: json.data.enterprise_NAME});

            console.info(this.state.Ysale)
          }.bind(this));
        } else {
        }

      }.bind(this)).catch(function (e) {
        console.log("fetch fail");
      });

  },

  shouldComponentUpdate: function(nextProps, nextState) {
   return true
  },



  render: function() {
    return (

      <div className={styles.headone}>
        <header className={styles.head}>
          <div className={styles.headtext}>i 运营</div>
        </header>
        <div className={styles.shopone}>
          <div className={styles.shoptwo}><span>{this.state.shopName}</span></div>
          <div className={styles.shoptree}><span>{this.state.NowDate}</span></div>
        </div>
        <div className={styles.shop}>
          <Link to="/monitor">
          <div className={styles.semantic}>

            <div className={styles.shoping}>
              <span>昨日总销售额 (元)</span>
            </div>
            <div className={styles.shopingnumber}>
              <span>{this.state.Ysale}</span>
            </div>
            <div className={styles.shopingadd}>
              <span>较上周同期 ：<span>{this.state.Yrate}%</span></span>
            </div>
            <div className={styles.shopingtotal}>
              <span>本月总销售额 (元) ：<span>{this.state.Msale}</span>&nbsp;较上月同期：<span>  {this.state.Mrate}%</span></span>
            </div>
            <div className={styles.semanticone}>
              <Icon type="right" className={styles.semantictwo}/>
            </div>
          </div>
        </Link>
        </div>
        <div className={styles.kongbai}></div>
        <div className={styles.monitorOne}>
          <ReactIScroll iScroll={iScroll}
                        options={{mouseWheel: true, scrollbars: false, scrollX: true, click:true}}>
            <div style={{width:'7rem'}}>
          <div><img src="./lib/image/1_03.png" className={styles.monitorImage}/></div>

          <div className={styles.shopstore}>
              <span className={styles.shoptishi}>
                店家，i运营动态监测提示：
              </span>
            <br/>
              <span className={styles.shopyingshou}>
                您的本周营收：<span>{this.state.DNum}家</span>低于、<span>{this.state.addNum}家</span>高于上周同期
              </span>
          </div>



            </div>
          </ReactIScroll>
        </div>
        <div className={styles.kongbai}></div>

        <div className={styles.homeGrid}>
          <div className="flex-container">
            <WhiteSpace size="lg" />
            <WingBlank size="lg" >
              <Flex>
                <Flex.Item>
                  <div  className={styles.homeImgOne}>
                    <Link to="/holiday">
                      <img src="./lib/image/day_04.png" className={styles.histdayImg}/>
                      <p>历史节日</p>
                    </Link>
                  </div>
                </Flex.Item>
                <Flex.Item>
                  <div  className={styles.homeImgOne}>
                    <Link to="/run" >
                      <img src="./lib/image/dongtai_10.png" className={styles.histdayImg}/>
                      <p>经营历程</p>
                    </Link>
                  </div>
                </Flex.Item>
                <Flex.Item>
                  <div className={styles.homeImgOne} >
                    <Link to="/sell">
                      <img src="./lib/image/xiaoshou.png" className={styles.histdayImg}/>
                      <p>最佳销售</p>
                    </Link>
                  </div>
                </Flex.Item>
              </Flex>
            </WingBlank>
          </div>
        </div>

        <div className={styles.homeGridOne}>
          <div className="flex-container">

            <WhiteSpace size="lg" />
            <WingBlank size="lg" >
              <Flex>
                <Flex.Item>
                  <div  className={styles.homeImgOne}>
                    <Link to="/flow">
                      <img src="./lib/image/keliu.png" className={styles.histdayImg}/>
                      <p>客流分布</p>
                    </Link>
                  </div>
                </Flex.Item>
                <Flex.Item>
                  <div  className={styles.homeImgOne}>
                    <Link to="/daypk">
                      <img src="./lib/image/pk.png" className={styles.histdayImg}/>
                      <p>天天PK</p>
                    </Link>
                  </div>
                </Flex.Item>
                <Flex.Item>
                  <div className={styles.homeImgOne} >
                    <Link to="/goods">
                      <img src="./lib/image/fenxi.png" className={styles.histdayImg}/>
                      <p>产品分析</p>
                    </Link>
                  </div>
                </Flex.Item>
              </Flex>
            </WingBlank>

          </div>
        </div>
      </div>

    );
  }

});

export default Home;
