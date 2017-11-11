/**
 * Created by Administrator on 2016/10/23.
 */

/**
 * Created by Administrator on 2016/10/20.
 */

import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll';
import React ,{map}from 'react';
import { NavBar,Flex,WingBlank, WhiteSpace,Popup, List,Menu,Toast } from 'antd-mobile';
import { browserHistory } from 'dva/router';
import styles from './Run.less';
import echarts from 'echarts';
import {Link} from 'dva/router';
import fetch from 'dva/fetch';


var Monitor = React.createClass({

  getInitialState() {
    localStorage.setItem("listen",2);
    return {
      sel: '',
      newdata4:[],
      dateRight:['本月'],
      dateLeft:[],
      MonitorData:[],
      Lmonth:[],
      month:[],
      RunWeek:[],
      LRunWeek:[],
      Lweek:[],
      week:[],
      runTotal:[],

    };
  },
  onClick() {
    document.documentElement.style.overflow='hidden';
    localStorage.setItem("listen",1);
    Popup.show(
      <div>
        <List
        >
          <List.Item

            onClick={() => { this.onClose('upM'); }}
          >上月</List.Item>
          <List.Item

            onClick={() => { this.onClose('M'); }}
          >本月</List.Item>
          <List.Item

            onClick={() => { this.onClose('upW'); }}
          >上周</List.Item>
          <List.Item

            onClick={() => { this.onClose('W'); }}
          >本周</List.Item>
        </List>
      </div>,{ transitionName: 'false' }
    );


    document.documentElement.style.overflow='visible';
  },

  onClose(sel) {
    if (sel === 'upM') {
      this.setState({dateRight: '上月'});

      this.haddate("lm");


    }else if(sel === 'M'){
      this.setState({dateRight: '本月'});

      this.haddate("m");



    }else if(sel === 'upW'){
      this.setState({dateRight: '上周'});

      this.haddate("lw");



    }else if(sel === 'W'){
      this.setState({dateRight: '本周'});

      this.haddate("w");



    }
    Popup.hide();

  },


  componentDidMount() {
    window.onpopstate = function(event) {

      if(localStorage.getItem("listen")==1){
        Popup.hide();
      }
      localStorage.setItem("listen",2);
    };
    this.haddate("m");


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

  haddate:function (opt) {



    function getDays(a){//
      var date = new Date();
      var y = date.getFullYear();
      var m = date.getMonth() + a;
      if(m == 2){
        return y % 4 == 0 ? 29 : 28;
      }else if(m == 1 || m == 3 || m == 5 || m == 7 || m == 8 || m == 10 || m == 12){
        return 31;
      }else{
        return 30;
      }
    }

    function  getMonths() {//本月


      var date = new Date();
      var y = date.getFullYear();
      var m = date.getMonth()+1


      var d = date.getDate();

          var lm = y+"."+m+"."+"1"+"-"+y+"."+m+"."+d;
          var m1=y+"-"+m+"-"+"1"
          var m2=y+"-"+m+"-"+d
          return {lm:lm,m1:m1,m2:m2};


    }

    function getLMonths() {//上月


      var date = new Date();
      var y = date.getFullYear();
      var m = date.getMonth()+1

      if(m==1){
        y=y-1
        m=12
        var b  = getDays(12);
      }else{
        m=m-1
        var b  = getDays(0);

      }

      var d = date.getDate();
      var c =  y+"-"+m+"-"+b


        var lm = y+"."+m+"."+"1"+"-"+y+"."+m+"."+b;
        var m1=y+"-"+m+"-"+"1"
        var m2=y+"-"+m+"-"+b
        return {lm:lm,m1:m1,m2:m2};

    }


    function getWeeks() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var xq = date.getDay();
      if(xq==0){
        xq=7
      }
      var d = date.getDate();
      var newDate = new Date(date.getTime() - (xq-1) * 24 * 3600 * 1000);
      var newyear = newDate.getFullYear();
      var newmonth = newDate.getMonth() + 1;
      var newday = newDate.getDate();

      var Sweek = newyear+"."+newmonth+"."+newday+"-"+year+"."+month+"."+day
      var Sweek1 = newyear+"-"+newmonth+"-"+newday;
      var Sweek2 = year+"-"+month+"-"+day;
      return {Sweek:Sweek,Sweek1:Sweek1,Sweek2:Sweek2}
    }

    function getLWeeks() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var xq = date.getDay();
      if(xq==0){
        xq=7
      }
      var d = date.getDate();
      var newDate = new Date(date.getTime() - (xq) * 24 * 3600 * 1000);
      var newyear = newDate.getFullYear();
      var newmonth = newDate.getMonth() + 1;
      var newday = newDate.getDate();

      var newDate = new Date(date.getTime() - (xq+6) * 24 * 3600 * 1000);
      var Syear = newDate.getFullYear();
      var Smonth = newDate.getMonth() + 1;
      var Sday = newDate.getDate();

      var Sweek = Syear+"."+Smonth+"."+Sday+"-"+newyear+"."+newmonth+"."+newday
      var Sweek2 = newyear+"-"+newmonth+"-"+newday;
      var Sweek1 = Syear+"-"+Smonth+"-"+Sday;
      return {Sweek:Sweek,Sweek1:Sweek1,Sweek2:Sweek2}
    }




    var g  =  getMonths();//本月
     console.log(g)


    var h  =  getLMonths();//上月
    console.log(h)


    var w = getWeeks() //本周
    console.log(w)


    var sw = getLWeeks() //本周
    console.log(sw)




    var  SDate =[];
    var  EDate =[];

    if(opt=="m"){
      SDate=g.m1
      EDate=g.m2
      this.setState({dateLeft:g.lm});
    }else if(opt=="lm"){
      SDate=h.m1
      EDate=h.m2
      this.setState({dateLeft:h.lm});
    }else if(opt=="w"){
      SDate=w.Sweek1
      EDate=w.Sweek2
      this.setState({dateLeft:w.Sweek});
    }else if(opt=="lw"){
      SDate=sw.Sweek1
      EDate=sw.Sweek2
      this.setState({dateLeft:sw.Sweek});
    }


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
        axisLabel:{
          interval:0,

          textStyle:{
            color: function (val) {
              return val == "周六" || val == "周日"? '#f47272' : '#9E9E9E' ;
            }
          }
        },
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
          itemStyle:{
            normal:{
              color:function (params) {
                return params.name == "周六" || params.name == "周日" ? '#f47272' : '#00BCD4' ;
              }
            }
          },

          symbol:'circle',
          symbolSize:8
        }
      ],

    });
    var userIf =localStorage.getItem("userinfo");
    userIf = JSON.parse(userIf);
    var url = localStorage.getItem("url");
    url = url+'yylj';

    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        "bDate":SDate,
        "eDate":EDate,
        /*"bDate":"2016-12-01",
        "eDate":"2016-12-02",*/
        "EN":userIf.en,
        "UserId":userIf.userid,


      })

    },this).then(function (res) {
      console.log("fetch request ", JSON.stringify(res.ok));
      if (res.ok) {
        res.json().then(function (json) {
          if(json.data.saleAllDay.length==0){
            Toast.offline('数据未更新!',1);
            this.setState({MonitorData: []});
            this.setState({runTotal: []});
            return false
          }


          var xiaoshou = [];
          var day = [];
          console.info(json);
          this.setState({runTotal: json.data.total});

          for(var i = 0;i<json.data.saleAllDay.length;i++){
            xiaoshou.push(json.data.saleAllDay[i].sale)
            day.push(json.data.saleAllDay[i].txt)
          /*  json.data.saleAllDay[i].rDate=json.data.saleAllDay[i].rDate.substring(5);*/
            if(json.data.saleAllDay[i].lrate<=0){
              json.data.saleAllDay[i].lrate=json.data.saleAllDay[i].lrate+"%"
            }else{
              json.data.saleAllDay[i].lrate="+"+json.data.saleAllDay[i].lrate+"%"
            }
          }

          if(json.data.saleAllDay.length<31){
            for(var i = 0;i<(31-json.data.saleAllDay.length);i++){
              xiaoshou.push("undefined");
            }
          }




          this.setState({MonitorData: json.data.saleAllDay});

          console.log(xiaoshou)
          console.log(day)
          console.log(json.data.saleAllDay)

          myChart.setOption({
            xAxis: {
              type: 'category',
              boundaryGap: false,
              data: day
            },
            series: [{
              name:'邮件营销',
              type:'line',
              stack: '总量',
              data:xiaoshou
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




  goback: function () {
    localStorage.setItem("listen",2);
    browserHistory.goBack();
  },

  goHourss(event){
    debugger;
    var e = event.target
    var items = document.getElementsByName("hours");
  },



  render: function(newdata) {

    return (
      <div className={styles.headone}>
        <div >
          <NavBar leftContent="返回" mode="light" onLeftClick={this.goback}>
            <span className={styles.holidayhead}>
              经营历程
            </span>
          </NavBar>
        </div>
        <div>
          <div className={styles.shopone}>
            <a href="javascript:scrollTo(0,0);" style={{color:'black'}}>
            <div  className={styles.shoptwo} type="ghost" onClick={this.onClick}><span>{this.state.dateRight}</span>
              <img src="./lib/image/sanjiao_03.png" className={styles.sanjiaoImg}/></div>
            </a>
            <div className={styles.shoptree}><span>{this.state.dateLeft}</span></div>
          </div>
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
                <div className={styles.holidayheadTwoTop} >日期</div>
              </Flex.Item>
              <Flex.Item>
                <div className={styles.holidayheadTwo}><span className={styles.goodsHead}>销售额</span><span className={styles.goodsHeadNew}>(元)</span></div>
              </Flex.Item>
              <Flex.Item>
                <div className={styles.holidayheadTwo}><span className={styles.goodsHead1}>较上周</span><span className={styles.goodsHeadNew1}>同期</span></div>
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
                    <div className={styles.Runsellbody}>{this.state.runTotal}</div>
                  </Flex.Item>
                  <Flex.Item>
                    <div className={styles.holidaybody}></div>
                  </Flex.Item>
                  <Flex.Item>
                    <div className={styles.holidaybody} style={{float: 'right'}}></div>
                  </Flex.Item>
                  <Flex.Item>
                    <div className={styles.holidaybody} style={{float: 'right'}} ></div>
                  </Flex.Item>
                </Flex>
              </WingBlank>

            </div>
          </div>

          </div>


        <div >
          {
            this.state.MonitorData.map(function (newdata) {
              return(
                <ol  className={styles.holidaytop2} key={newdata.rDate}>
                  <div className="flex-container">
                    <Link  to = {{pathname:"hours/",query:{name:newdata.rDate}}}>
                    <WingBlank size="lg" >
                      <Flex>
                        <Flex.Item>
                          <div className={newdata.weeks.indexOf("周日")==0 || newdata.weeks.indexOf("周六")==0?styles.runNewbodyTop1:styles.runNewbodyTop }><span className={styles.runDate}>{newdata.rDate.substring(5)}</span><span className={styles.runDate1}>{newdata.weeks}</span></div>
                        </Flex.Item>
                        <Flex.Item>
                          <div className={styles.sellbody}>{newdata.sale}</div>
                        </Flex.Item>
                        <Flex.Item>
                          <div className={newdata.lrate.indexOf("+")==0?styles.holidaybody1:styles.holidaybody2}>{newdata.lrate}</div>
                        </Flex.Item>
                        <Flex.Item>
                        <div className={styles.holidaybody} style={{float: 'right'}}>{newdata.counts}</div>
                      </Flex.Item>
                        <Flex.Item>
                          <div className={styles.holidaybody} style={{float: 'right'}}>{newdata.price}</div>
                        </Flex.Item>
                      </Flex>
                    </WingBlank>
                      </Link>


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


export default Monitor;
