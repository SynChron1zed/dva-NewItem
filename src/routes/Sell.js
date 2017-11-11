
/**
 * Created by Administrator on 2016/10/20.
 */


import React ,{map}from 'react';
import $ from 'jquery';
import { NavBar,Flex,WingBlank, WhiteSpace} from 'antd-mobile';
import { browserHistory } from 'dva/router';
import styles from './Sell.less';
import fetch from 'dva/fetch';


var Sell = React.createClass({

  getInitialState: function () {
    return {
      newdata: [],
      newdata5: [],
      newdate:[],
      HolidayData:[],
      classdata:[2016],
      holidaytop:['所有门店最高销售额记录2015年10月：'],
      Selldata:[],
      Selldate:['月'],
      holidayTotal:[]

    }
  },

  componentDidMount() {
    this.getdata("1")

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
    url = url+'jjxs';

    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        "title":year,
        "EN":userIf.en,
        "UserId":userIf.userid
      })

    },this).then(function (res) {
      console.log("fetch request ", JSON.stringify(res.ok));
      if (res.ok) {
        res.json().then(function (json) {
          console.info(json);

            var month = json.data.mon
            var month1 = month.substring(0,4);
            var month2 = month.substring(5,7);
            var month3 = month.substring(8);

          for(var i = 0;i<json.data.bestSales.length;i++){
            if(year==2){
              json.data.bestSales[i].mon = json.data.bestSales[i].mon.replace(/([-])/g, ".")
            }else{
              json.data.bestSales[i].mon = json.data.bestSales[i].mon.replace(/([-])/g, ".")

            }

          }
          if(year==1){
            this.setState({holidaytop: '所有门店最高销售额记录'+month1+'年'+month2+'月：'});
            this.setState({Selldata: json.data.total});
          }else{
            this.setState({holidaytop: '所有门店最高销售额记录'+month1+'年'+month2+'月'+month3+'日：'});
            this.setState({Selldata: json.data.total});
          }
          this.setState({holidayTotal: json.data.bestSales});

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
    this.setState({HolidayData: this.state.newdata});
    this.setState({classdata: 2016});
    this.setState({Selldate: '月'});

    this.getdata("1")
  },
  newback5:function(){
    this.setState({HolidayData: this.state.newdata5});
    this.setState({classdata: 2015});
    this.setState({Selldate: '日'});

    this.getdata("2")
  },

  render: function(newdata) {

    return (
      <div className={styles.headone}>
        <div >
          <NavBar leftContent="返回" mode="light" onLeftClick={this.goback}>
            <span className={styles.holidayhead}>
              最佳销售
            </span>
          </NavBar>
        </div>

        <div>
          <div className={styles.holidaySelect} >
            <div className={this.state.classdata==2016? styles.holiday2016:styles.newholiday2016} onClick ={this.newback} >
              <span>月新高</span>
            </div>
            <div className={this.state.classdata==2015? styles.holiday2015:styles.newholiday2015}  onClick ={this.newback5} >
              <span >日新高</span>
            </div>
          </div>
        </div>

        <div className={styles.holidaySelect1}>
          <span>
            {this.state.holidaytop}
          </span>
          <span style={{color:'red'}}>
           {this.state.Selldata}
          </span>
        </div>


        <div className={styles.ontainer} >

          <WingBlank size="lg">
            <Flex>
              <Flex style={{width:10+'%'}}>
                <div className={styles.holidayheadTwoTop} >排名</div>
              </Flex>
              <Flex style={{width:40+'%'}}>
                <div className={styles.holidayheadTwo}>门店</div>
              </Flex>
              <Flex style={{width:30+'%'}}>
                <div className={styles.holidayheadTwo}>时间({this.state.Selldate})</div>
              </Flex>
              <Flex style={{width:35+'%'}}>
                <div className={styles.holidayheadTwo} style={{float: 'right'}}>销售额(元)</div>
              </Flex>
            </Flex>
          </WingBlank>

        </div>


        <div >
          {
            this.state.holidayTotal.map(function (newdata) {
              return(
                <ol  className={styles.holidaytop2} key={newdata.id}>
                  <div className="flex-container">
                    <div className={styles.newontainer} >
                    <WingBlank size="lg">
                      <Flex>
                        <Flex style={{width:10+'%'}}>
                          <div className={newdata.id==1||newdata.id==2||newdata.id==3?styles.holidaybodyTop1:styles.holidaybodyTop} >{newdata.id}</div>
                        </Flex>
                        <Flex style={{width:40+'%'}}>
                          <div className={styles.sellbody}>{newdata.storesroom}</div>
                        </Flex>
                        <Flex style={{width:30+'%'}}>
                          <div className={styles.holidaybody}>{newdata.mon}</div>
                        </Flex>
                        <Flex style={{width:35+'%'}}>
                          <div className={styles.holidaybody} style={{float: 'right'}}>{newdata.total}</div>
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


export default Sell;
