/**
 * Created by Administrator on 2016/10/20.
 */

import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll';
import React ,{map,}from 'react';
import echarts from 'echarts';
import $ from 'jquery';
import { NavBar,Flex,WingBlank, WhiteSpace} from 'antd-mobile';
import { browserHistory } from 'dva/router';
import styles from './Flow.less';
import fetch from 'dva/fetch';


var Flow = React.createClass({

  getInitialState: function () {
    return {
      classdata:[2016],
      options: {
        mouseWheel: true,
        scrollbars: true
      },
      flowday:[7],
      newdata5:[],
      godTop:[],
      newdata4:[],
      flowtop:[],
      flowDay:['周日']




    }
  },

  componentDidMount() {
    this.showChart(7)
  },


  getdata:function (a) {

  },


  showChart:function (e) {
    var myChart = echarts.init(document.getElementById('main'));
// 绘制图表
    var option = ({
      title: {
        text: '趋势图'+' '+'|平均客单量|近三月|'+this.state.flowDay,
        textStyle: {
          fontFamily: 'Arial, Verdana, sans...',
          fontSize: 12,
        },
        left:10
      },
      grid:{
        left:'5%',
        right:'5%',
        top:'40px',
        bottom:'40px'
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor:'#9E9E9E',
        triggerOn:'click',
        axisPointer:{
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        nameTextStyle:{
          fontSize: 8,
        },
        axisLabel:{
          interval:0
        },
        axisLine:{
          lineStyle: {
            color:'#9E9E9E'
          }
        },

        axisTick:{
          show:false
        },
        data: []
      },
      yAxis: {
        type: 'value',
        nameTextStyle:{
          fontSize: 8,
        },
        splitNumber:5,


        axisTick:{
          show:false
        },
        axisLine:{
          show:false,
          lineStyle: {
            color:'#9E9E9E'
          }
        },

      },

      series: [
        {
          name:'平均客单量',
          type:'line',
          stack: '总量',
          data:[],
          lineStyle:{
            normal:{
              color:'#00BCD4'
            }
          },
          markPoint:{
            symbol: 'arrow',
            label:{
              normal:{
                show:true
              }
            },

          },
          itemStyle:{
            normal:{
              color:'#00BCD4'
            }
          },
          symbol:'circle',
          symbolSize:8,

        }
      ]


    });

    var myChartTwo = echarts.init(document.getElementById('mainTwo'));
// 绘制图表
    var optionTwo = ({

      title: {
        text: '排行榜|黄金时段|近三月|'+this.state.flowDay,
        textStyle: {
          fontFamily: 'Arial, Verdana, sans...',
          fontSize: 12,
          fontStyle: 'normal',
          fontWeight: 'normal',
        },
        left:10
      },
      tooltip: {
        trigger: 'item',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {

      },
      grid: {
        left: '2%',
        right: '4%',
        bottom: '40px',
        top:'40px',
        containLabel: true
      },
      xAxis: {
        type: 'value',
        boundaryGap: [0, 0.01],
        axisLine:{
          show:false,
          lineStyle: {
            color:'#9E9E9E'
          }
        },
        splitLine:{
          show:false,
        },
        axisTick:{
          show:false
        },
        show:false,


      },
      yAxis: {
        type: 'category',
        axisTick:{
          show:false
        },
        splitLine:{
          show:false
        },
        data: []
      },
      series: [
        {
          name: '客单量',
          type: 'bar',
          data:[],
          itemStyle:{
            normal:{
              color:'rgba(244, 67, 54, 0.78)'

            }
          },
          barGap:'15px',
          barCategoryGap:'35%',
          label:{
            normal:{
              show: true,
              position:'right',
              textStyle:{
                color:"black"
              }
            }
          }
        }
      ]

    });
    var userIf =localStorage.getItem("userinfo");
    userIf = JSON.parse(userIf);


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

    const week = e

    var url = localStorage.getItem("url");
    url = url+'klfb';

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
        "weekd":week

      })
    },this).then(function (res) {
      console.log("fetch request ", JSON.stringify(res.ok));
      if (res.ok) {
        res.json().then(function (json) {

          console.info(json);
          var Cweek = [];
          var TCweek = [];
          var TCHweek = [];
          var dataXq=[];
          var Fdata=[];

          for(var i = 0 ;i<json.data.passengerFlowDistributionAll.length;i++){
            Cweek.push(json.data.passengerFlowDistributionAll[i].counts)
            Fdata.push(json.data.passengerFlowDistributionAll[i].hh)
          }

          for(var i = 0;i<json.data.passengerFlowDistributionTop5.length;i++){
            TCweek.push(json.data.passengerFlowDistributionTop5[i].counts);
            TCHweek.push(json.data.passengerFlowDistributionTop5[i].hh);
          }

          for(var i = 0;i<24-Cweek.length;i++){
            Cweek.push('undefined')
          }


          TCweek=TCweek.reverse();
          TCHweek=TCHweek.reverse();
          if(e==7){
            dataXq="周日"
          }else if (e==6){
            dataXq="周六"
          }else if (e==5){
            dataXq="周五"
          }else if (e==4){
            dataXq="周四"
          }else if (e==3){
            dataXq="周三"
          }else if (e==2){
            dataXq="周二"
          }else if (e==1){
            dataXq="周一"
          }


          myChart.setOption({
            title: {
              text: '趋势图|平均客单量|近三月|'+dataXq,
              textStyle: {
                fontFamily: 'Arial, Verdana, sans...',
                fontSize: 12,
                fontStyle: 'normal',
                fontWeight: 'normal',
              },
            },
            xAxis: {

              data:Fdata
            },
            series: [{
              name:'邮件营销',
              type:'line',
              stack: '总量',
              data:Cweek
            }]
          });
          myChartTwo.setOption({
            title: {
              text: '排行榜|黄金时段|近三月|'+this.state.flowDay,
              textStyle: {
                fontFamily: 'Arial, Verdana, sans...',
                fontSize: 12,
                fontStyle: 'normal',
                fontWeight: 'normal',
              },
            },
            yAxis: {
              data: TCHweek
            },
            series: [{
              name: '2011年',
              type: 'bar',
              data:TCweek
            }]
          });
          console.log(Cweek)

        }.bind(this));
      } else {
      }

    }.bind(this)).catch(function (e) {
      console.log("fetch fail");
    });


    myChart.setOption(option);
   window.onresize = myChart.resize


    myChartTwo.setOption(optionTwo);
    window.onresize = myChartTwo.resize
  },





  goback: function () {
    browserHistory.goBack();
  },




  onClose(sel) {
debugger;

      if(sel==="day7"){
        this.setState({flowday: 7});
        this.showChart(7)
        this.setState({flowDay: '周日'});

      }else if(sel==="day6"){
        this.setState({flowday: 6});
        this.showChart(6)
        this.setState({flowDay: '周六'});
      }
      else if(sel==="day5"){
        this.setState({flowday: 5});
        this.showChart(5)
        this.setState({flowDay: '周五'});
      }
      else if(sel==="day4"){
        this.setState({flowday: 4});
        this.showChart(4)
        this.setState({flowDay: '周四'});
      }
      else if(sel==="day3"){
        this.setState({flowday: 3});
        this.showChart(3)
        this.setState({flowDay: '周三'});
      }
      else if(sel==="day2"){
        this.setState({flowday: 2});
        this.showChart(2)
        this.setState({flowDay: '周二'});
      }
      else if(sel==="day1"){
        this.setState({flowday: 1});
        this.showChart(1)
        this.setState({flowDay: '周一'});
      }
    console.log(this.state.flowday)


  },



  render: function(newdata) {


    return (
      <div >
        <div >
          <NavBar leftContent="返回" mode="light" onLeftClick={this.goback}>
            <span className={styles.holidayhead}>
              客流分布
            </span>
          </NavBar>
        </div>
        <div className={styles.holidaySelect}>

        <ReactIScroll iScroll={iScroll}
                      options={{mouseWheel: true, scrollbars: false, scrollX: true, click:true}}>
          <div style={{width:'9rem'}}>
            <ul style={{margin:'0px',padding:'0px'}}>
              <div className={styles.flowGG}>
              <div onClick={() => { this.onClose('day7'); }}  style={{marginLeft:'.3rem'}}  className={this.state.flowday==7? styles.flow7:styles.flow6}  ><span>周日</span></div>
              <div onClick={() => { this.onClose('day6'); }} style={{marginLeft:'1.5rem'}}    className={this.state.flowday==6? styles.flow7:styles.flow6}  ><span>周六</span></div>
              <div  style={{marginLeft:'2.7rem'}}  className={this.state.flowday==5? styles.flow7:styles.flow6}  onClick={() => { this.onClose('day5'); }}><span>周五</span></div>
              <div  style={{marginLeft:'3.9rem'}} className={this.state.flowday==4? styles.flow7:styles.flow6}  onClick={() => { this.onClose('day4'); }}><span>周四</span></div>
              <div  style={{marginLeft:'5.2rem'}}  className={this.state.flowday==3? styles.flow7:styles.flow6}  onClick={() => { this.onClose('day3'); }}><span>周三</span></div>
              <div  style={{marginLeft:'6.5rem'}}  className={this.state.flowday==2? styles.flow7:styles.flow6}  onClick={() => { this.onClose('day2'); }}><span>周二</span></div>
              <div  style={{marginLeft:'7.8rem'}}  className={this.state.flowday==1? styles.flow7:styles.flow6}  onClick={() => { this.onClose('day1'); }}><span>周一</span></div>
              </div>
            </ul>
          </div>
        </ReactIScroll>
        </div>

        <ReactIScroll iScroll={iScroll}
                      options={{mouseWheel: true, scrollbars: true, scrollX: true, click:true}}>
          <div style={{width:'20rem'}}>
        <div className={styles.flowEcharts}>
          <div id="main" style={{width: 20+'rem', height:4+'rem'}}></div>
        </div>
          </div>
        </ReactIScroll>


        <div className={styles.flowgird}></div>

        <div>
          <div id="mainTwo" style={{width: 100+'%', height:6+'rem'}}></div>
        </div>


      </div>


    )
  },

});


export default Flow;
