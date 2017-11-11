/**
 * Created by Administrator on 2016/11/4.
 */
/**
 * Created by Administrator on 2016/10/23.
 */

/**
 * Created by Administrator on 2016/10/20.
 */

import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll';
import React ,{map}from 'react';
import $ from 'jquery';
import { NavBar,Flex,WingBlank, WhiteSpace,Popup, List,Menu } from 'antd-mobile';
import { browserHistory } from 'dva/router';
import styles from './Hours24.less';
import echarts from 'echarts';



var Hours = React.createClass({

  getInitialState() {
    return {
         HoursDate:[],
         HoursData:[],
         HoursTotal:[],
         HoursKdan:[],
         HoursKjia:[],


    };
  },





  componentDidMount() {

    this.showChart();
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




  goback: function () {
    browserHistory.goBack();
  },


  showChart:function (e) {
    var myChart = echarts.init(document.getElementById('main'));
// 绘制图表
    var option = ({

      tooltip: {
        trigger: 'axis',
        backgroundColor:'#9E9E9E',
        axisPointer:{
        }
      },
      grid:{
        left:'5%',
        right:'5%',
        top:'40px',
        bottom:'40px'
      },
      title: {
        text: '趋势图|销售额',
        textStyle: {
          fontFamily: 'Arial, Verdana, sans...',
          fontSize: 12,
          fontStyle: 'normal',
          fontWeight: 'normal',

        },
        left:10
      },


      xAxis: {
        type: 'category',
        boundaryGap: true,
        splitNumber:31,
        data: [],

        nameTextStyle:{
          fontSize: 6,
        },
        axisLine:{
          lineStyle:{
            color:'#9E9E9E'
          }
        },
        axisTick:{
          show:false
        },
      },

      yAxis: {
        type: 'value',
        min: 0,
        boundaryGap: [0, '10%'],
        axisLabel: {
          formatter: '{value}'
        },
        nameTextStyle:{
          fontSize: 6,
        },
        axisLine:{
          show:false,
          lineStyle:{
            color:'#9E9E9E'
          }
        },
        axisTick:{
          show:false
        },
      },


      series: [
        {

          name:'销售额',
          type:'line',
          stack: '总量',
          data:[],
          lineStyle:{
            normal:{
              color:'#00BCD4'
            }
          },


          symbol:'circle',
          symbolSize:8
        }
      ],

    });


    var str = window.location.hash
    str = str.split('name=');
    str = str[1].split('\'')
    var a = str[0].split('&')

    var userIf =localStorage.getItem("userinfo");
    userIf = JSON.parse(userIf);
    var url = localStorage.getItem("url");
    url = url+'qs24';

    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        /* "bDate":SDate,
         "eDate":EDate,*/
        "bDate":a[0],
        "EN":userIf.en,
        "UserId":userIf.userid,



      })

    },this).then(function (res) {
      console.log("fetch request ", JSON.stringify(res.ok));
      if (res.ok) {
        res.json().then(function (json) {

          var xiaoshou  = [];
          var date = [];
          var Topdate = []
          console.info(json);
          for(var i = 0;i<json.data.saleHHListAll.length;i++){
            xiaoshou.push(json.data.saleHHListAll[i].total)
            date.push(json.data.saleHHListAll[i].hh)

          }
          for(var i = 0;i<json.data.saleHHListTop5.length;i++){
            Topdate.push(json.data.saleHHListTop5[i].hh)
          }

          console.log(Topdate)


          this.setState({HoursData: json.data.saleHHListAll});
          this.setState({HoursTotal: json.data.totalAll});
          this.setState({HoursKdan: json.data.customerNumber});
          this.setState({HoursKjia: json.data.customerPrice});






          myChart.setOption({

            title: {
              text: '趋势图|销售额|'+a[0].replace(/([-])/g, "."),

            },
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: date,
              axisLabel:{
                interval:0,

                textStyle:{
                  color: function (val) {
                    return val == Topdate[0] || val == Topdate[1] || val == Topdate[2] || val == Topdate[3] || val == Topdate[4] ? '#f47272' : '#9E9E9E' ;
                  }
                }
              },
            },
            series: [{
              name:'邮件营销',
              type:'line',
              stack: '总量',
              data:xiaoshou,
              itemStyle:{
                normal:{
                  color:function (params) {

                    return params.name == Topdate[0] || params.name == Topdate[1] || params.name == Topdate[2] || params.name == Topdate[3] || params.name == Topdate[4]? '#f47272' : '#00BCD4' ;
                  }
                }
              },
            }]
          });

        }.bind(this));
      } else {
      }

    }.bind(this)).catch(function (e) {
      console.log("fetch fail");
    });




    myChart.setOption(option);
    window.onresize = myChart.resize
  },



  render: function(newdata) {

    return (
      <div className={styles.headone}>
        <div >
          <NavBar leftContent="返回" mode="light" onLeftClick={this.goback}>
            <span className={styles.holidayhead}>
              24小时趋势
            </span>
          </NavBar>
        </div>



        <ReactIScroll iScroll={iScroll}
                      options={{mouseWheel: true, scrollbars: false, scrollX: true, click:true}}>
          <div style={{width:'24rem'}}>
            <div className={styles.pkEcharts}>
              <div id="main" style={{width: 24+'rem', height:6+'rem'}}></div>
            </div>
          </div>
        </ReactIScroll>

        <div className={styles.ontainer} >

          <WingBlank size="lg">
            <Flex>
              <Flex.Item>
                <div className={styles.holidayheadTwoTop} >时间</div>
              </Flex.Item>
              <Flex.Item>
                <div className={styles.holidayheadTwo}><span className={styles.goodsHead}>销售额</span><span className={styles.goodsHeadNew}>(元)</span></div>
              </Flex.Item>

              <Flex.Item>
                <div className={styles.holidayheadTwo} style={{float: 'right'}}>客单量</div>
              </Flex.Item>
              <Flex.Item>
                <div className={styles.holidayheadTwo} style={{float: 'right'}}><span className={styles.goodsHead2}>客单价</span><span className={styles.goodsHeadNew2}>(元)</span></div>
              </Flex.Item>
            </Flex>
          </WingBlank>

        </div>


        <div>
          <div  className={styles.holidaytopnew} >
            <div className="flex-container">
              <WingBlank size="lg">
                <Flex>
                  <Flex.Item>
                    <div className={styles.holidaybodyTop} ><span>总计</span></div>
                  </Flex.Item>
                  <Flex.Item>
                    <div className={styles.Runsellbody}>{this.state.HoursTotal}</div>
                  </Flex.Item>

                  <Flex.Item>
                    <div className={styles.Runsellbody} style={{float: 'right'}}>{this.state.HoursKdan}</div>
                  </Flex.Item>
                  <Flex.Item>
                    <div className={styles.Runsellbody} style={{float: 'right'}}>{this.state.HoursKjia}</div>
                  </Flex.Item>
                </Flex>
              </WingBlank>
            </div>
          </div>

        </div>



        <div >
          {
            this.state.HoursData.map(function (newdata) {
              return(
                <ol  className={styles.holidaytop2} key={newdata.hh}>
                  <div className="flex-container">
                    <WingBlank size="lg">
                      <Flex>

                        <Flex.Item>
                          <div ><span className={newdata.color==1?styles.hoursDate:styles.newhoursDate}>{newdata.hh}</span></div>
                        </Flex.Item>
                        <Flex.Item>
                          <div className={styles.sellbody}>{newdata.total}</div>
                        </Flex.Item>

                        <Flex.Item>
                          <div className={styles.holidaybody} style={{float: 'right'}}>{newdata.counts}</div>
                        </Flex.Item>
                        <Flex.Item>
                          <div className={styles.holidaybody} style={{float: 'right'}}>{newdata.cprice}</div>
                        </Flex.Item>
                      </Flex>
                    </WingBlank>

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


export default Hours;
