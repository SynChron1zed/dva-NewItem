/**
 * Created by Administrator on 2016/10/19.
 */

import React ,{map}from 'react';
import $ from 'jquery';
import { NavBar,Flex,WingBlank, WhiteSpace,Toast} from 'antd-mobile';
import { browserHistory } from 'dva/router';
import styles from './Holiday.less';
import fetch from 'dva/fetch';


var Holiday = React.createClass({

  getInitialState: function () {
    return {
      newdata: [],
      classdata:[2016],
      holidaytop:[],
      holidayTotal:[]

    }
  },

  componentDidMount() {
    window.onpopstate = function(event) {

    };
    this.newback();



      var oTop = document.getElementById("to_top");
      oTop.onclick = function(){
        document.documentElement.scrollTop = document.body.scrollTop =0;
      }

    oTop.style.visibility="hidden";
    window.onscroll = function () {
      oTop.style.visibility="visible";
      window.setTimeout(function () {
        oTop.style.visibility="hidden";
      },10000)
    }

  },



  getdata:function (a) {//获取数据
    var userIf =localStorage.getItem("userinfo");
    userIf = JSON.parse(userIf);
    const year = a
    var url = localStorage.getItem("url");
    url = url+'jjrfx/hoil';

    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        "years":year,

        "EN":userIf.en,

        "UserId":userIf.userid

      })

    },this).then(function (res) {
      console.log("fetch request ", JSON.stringify(res.ok));


      if (res.ok) {

        res.json().then(function (json) {
          console.info(json);
          for(var i = 0;i<json.data.holidayses.length;i++){
            json.data.holidayses[i].rdate=json.data.holidayses[i].rdate.substring(5)
            json.data.holidayses[i].rdate = json.data.holidayses[i].rdate.replace(/([-])/g, ".")
          }
          this.setState({holidayTotal: json.data.holidayses});

        }.bind(this));
      } else {
      }

    }.bind(this)).catch(function (e) {
      console.log("fetch fail");
    });

  },


  goback: function () {
    browserHistory.goBack();
  },

  newback:function(){
    const myDate = new Date();
    const nowdate = myDate.toLocaleDateString();
    const Nowdate = nowdate.replace(/([/])/g, ".")
    this.setState({classdata: 2016});
    this.setState({holidaytop: '2016年历史节日销售额排行 (截止至'+Nowdate+')'});
    this.getdata("2016")

  },
  newback5:function(){
    this.setState({classdata: 2015});
    this.setState({holidaytop: '2015年历史节日销售额排行'});
    this.getdata("2015")
  },

  render: function(newdata) {

    return (
      <div className={styles.headone}>
        <div >
          <NavBar leftContent="返回" mode="light" onLeftClick={this.goback}>
            <span className={styles.holidayhead}>
              历史节日
            </span>
          </NavBar>
        </div>

        <div>
          <div className={styles.holidaySelect} >
               <div className={this.state.classdata==2016? styles.holiday2016:styles.newholiday2016} onClick ={this.newback} >
                 <span>2016年</span>
               </div>
              <div className={this.state.classdata==2015? styles.holiday2015:styles.newholiday2015}  onClick ={this.newback5} >
              <span >2015年</span>
              </div>
          </div>
        </div>

        <div className={styles.holidaySelect1}>
          <span>
            {this.state.holidaytop}
          </span>
        </div>

        <div className={styles.ontainer} >

          <WingBlank size="lg">
            <Flex>
              <Flex style={{width:10+'%'}}>
                <div className={styles.holidayheadTwoTop} >排名</div>
              </Flex>
              <Flex style={{width:40+'%'}}>
                <div className={styles.holidayheadTwo2}>节日类型</div>
              </Flex>
              <Flex style={{width:25+'%'}}>
                <div className={styles.holidayheadTwo}>日期</div>
              </Flex>
              <Flex style={{width:25+'%'}}>
                <div className={styles.holidayheadTwoNumber} style={{float: 'right'}}>销售额(元)</div>
              </Flex>
            </Flex>
          </WingBlank>

        </div>
        <div >
          {
            this.state.holidayTotal.map(function (newdata) {
              return(
                <ol  className={styles.holidaytop2} key={newdata.no}>
                  <div className="flex-container">
                    <div className={styles.newontainer} >
                  <WingBlank size="lg">
                    <Flex>
                      <Flex style={{width:10+'%'}}>
                        <div className={newdata.no==1||newdata.no==2||newdata.no==3?styles.newholidayheadTwoTop1:styles.holidayheadTwoTop1} >{newdata.no}</div>
                      </Flex>
                      <Flex style={{width:40+'%'}}>
                        <div className={styles.holidayheadTwonew}>{newdata.txt}</div>
                      </Flex>
                      <Flex style={{width:25+'%'}}>
                        <div className={styles.holidayheadTwo33}>{newdata.rdate}</div>
                      </Flex>
                      <Flex style={{width:25+'%'}}>
                        <div className={styles.holidayheadTwo1} style={{float: 'right'}}>{newdata.total}</div>
                      </Flex>
                    </Flex>
                  </WingBlank>
                    </div>
                  </div>
                </ol>
              )
            })
          }
        </div>

        <div className={styles.goTop} id="to_top">
          <img src="./lib/image/top.jpg" className={styles.TopImage}/>
        </div>

      </div>
    )
  },


});


export default Holiday;
