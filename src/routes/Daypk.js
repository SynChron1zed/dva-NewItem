/**
 * Created by Administrator on 2016/10/22.
 */
/**
 * Created by Administrator on 2016/10/20.
 */

import React ,{map,}from 'react';
import $ from 'jquery';
import { NavBar,Flex,WingBlank,WhiteSpace,Popup,List} from 'antd-mobile';
import { browserHistory } from 'dva/router'
import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll';
import styles from './Daypk.less';
import echarts from 'echarts';
import fetch from 'dva/fetch';

var Daypk = React.createClass({

  getInitialState: function () {
    localStorage.setItem("listen",2);
    return {
      classdata:[2016],
      dateRight:['销售额-客单量'],
      dayRight:['客单量'],
      dateLeft:['周一'],
      AddNumber:[],
      decNumber:[],
      newdata5:[],
      newdata55:[],
      daypkdata:[],
      daypkdate:[],
      daypkxiaoshou:[],
      daypkkedan:[],
      daypklweek:[],
      daypkKweek:[],
      MonitorData:[],
      TotalAddNumber:[],
      TotaldecNumber:[]


    }
  },

  getDefaultProps: function() {
    return ({
      options: {
        mouseWheel: true,
        scrollbars: true
      }
    })
  },

  getdata:function (ke,week) {
      var kedan = ke;
      var weekd = week;
    var userIf =localStorage.getItem("userinfo");
    userIf = JSON.parse(userIf);


    var url = localStorage.getItem("url");
    url = url+'ttpk';

    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        /* "bDate":SDate,
         "eDate":EDate,*/
        "weekd":weekd,

        "EN":userIf.en,

        "UserId":userIf.userid,

        "id":kedan//1客单量 2客单价

      })

    },this).then(function (res) {
      console.log("fetch request ", JSON.stringify(res.ok));
      if (res.ok) {
        res.json().then(function (json) {


          var myChart = echarts.init(document.getElementById('main'));
// 绘制图表
          myChart.setOption({
            title:{
              text: '近3个月所有'+this.state.dateLeft+'变化趋势',
              textStyle:{
                fontSize: 12,
                fontWeight:200
              },
              textAlign: 'left'
            },
            tooltip: {
              trigger: 'axis'
            },

            xAxis: {

              type: 'category',
              data: [],
              axisTick:{
                show:false
              },
              axisLabel:{
                interval:0
              },
              axisLine:{
                lineStyle:{
                  color:'#9E9E9E'
                }
              }
            },

            yAxis: [
              {
                type: 'value',
                name: '销售额',
                min: 0,
                axisTick:{
                  show:false
                },
                splitLine:{
                  show:false
                },
                axisLine:{
                  lineStyle:{
                    color:'#9E9E9E'
                  }
                },
                axisLabel: {
                  formatter: '{value}'
                }
              },
              {
                type: 'value',
                name: this.state.dayRight,
                min: 0,
                splitLine:{
                  show:false
                },
                axisLine:{
                  lineStyle:{
                    color:'#9E9E9E'
                  }
                },
                axisTick:{
                  show:false
                },
                axisLabel: {
                  formatter: '{value}'
                }
              }
            ],
            series: [
              {
                name:'销售额',
                type:'bar',
                data:[],
                itemStyle:{
                  normal:{
                    color:'rgba(244, 67, 54, 0.78)'

                  }
                },
                barGap:'15px',
                barCategoryGap:'50%',
              },
              {
                name:this.state.dayRight,
                type:'line',
                symbol:'circle',
                symbolSize:10,
                yAxisIndex: 1,
                data:[],
                lineStyle:{
                  normal:{
                    color:'#00BCD4'
                  }
                },
                itemStyle:{
                  normal:{
                    color:'#00BCD4'
                  }
                },

                symbol:'circle',
                symbolSize:8
              }
            ]

          });

          var xiaoshou = [];
          var day = [];
          var kedan = [];
          console.info(json);

          for(var i = 0;i<json.data.dayPkTable.length;i++){

            if(json.data.dayPkTable[i].kRate<=0){
              json.data.dayPkTable[i].kRate=json.data.dayPkTable[i].kRate+"%"
            }else{
              json.data.dayPkTable[i].kRate="+"+json.data.dayPkTable[i].kRate+"%"
            }
            if(json.data.dayPkTable[i].totalRate<=0){
              json.data.dayPkTable[i].totalRate=json.data.dayPkTable[i].totalRate+"%"
            }else{
              json.data.dayPkTable[i].totalRate="+"+json.data.dayPkTable[i].totalRate+"%"
            }

            xiaoshou.push(json.data.dayPkTable[i].total)
            day.push(json.data.dayPkTable[i].rdate)
            kedan.push(json.data.dayPkTable[i].kedan)

          }

          myChart.setOption({
            title:{

              text: '近3个月所有'+this.state.dateLeft+'变化趋势',
              textStyle:{
                fontSize: 12,
                fontWeight:200
              },
              textAlign: 'left'
            },
            xAxis: {
              data: day
            },
            yAxis: [
              {
                type: 'value',
                name: '销售额',
              },
              {
                name: this.state.dayRight,
              }
            ],
            series: [
              {
                name:'销售额',
                type:'bar',
                data:xiaoshou
              },
              {
                name:this.state.dayRight,
                type:'line',
                data:kedan
              }
            ]
          });
          window.onresize = myChart.resize;

          this.setState({MonitorData: json.data.dayPkTable});
          console.log(this.state.MonitorData)

          this.setState({AddNumber: json.data.dayPkV.priceAddNumaddRate});//客单增
          this.setState({decNumber: json.data.dayPkV.priceDecreaseRate});//减
          this.setState({TotalAddNumber: json.data.dayPkV.totalAddrate});//销售增
          this.setState({TotaldecNumber: json.data.dayPkV.totalDecreaseRate});


        }.bind(this));
      } else {
      }

    }.bind(this)).catch(function (e) {
      console.log("fetch fail");
    });


  },



  onScrollStart: function() {
    console.log("iScroll starts scrolling")
  },

  componentDidMount() {

    window.onpopstate = function(event) {

      if(localStorage.getItem("listen")==1){
        Popup.hide();
      }
      localStorage.setItem("listen",2);
    };

    this.getdata("1","1")

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
    localStorage.setItem("listen",2);
    browserHistory.goBack();
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
          >销售额-客单量</List.Item>
          <List.Item

            onClick={() => { this.onClose('M'); }}
          >销售额-客单价</List.Item>

        </List>
      </div>,{ transitionName: 'false' }
    );
    document.documentElement.style.overflow='visible';

  },

  onClose(sel) {
    if (sel === 'upM') {
      this.setState({dateRight: '销售额-客单量'});

      this.setState({dayRight: '客单量'});


      if(this.state.dateLeft=="周一"){
        this.getdata("1","1");

        this.setState({newdata55: this.state.newdata5.L1})
      }else if(this.state.dateLeft=="周二"){
        this.getdata("1","2");

        this.setState({newdata55: this.state.newdata5.L2})
      }else if(this.state.dateLeft=="周三"){
        this.getdata("1","3");

        this.setState({newdata55: this.state.newdata5.L3})
      }else if(this.state.dateLeft=="周四"){
        this.getdata("1","4");

        this.setState({newdata55: this.state.newdata5.L4})
      }else if(this.state.dateLeft=="周五"){
        this.getdata("1","5");

        this.setState({newdata55: this.state.newdata5.L5})
      }else if(this.state.dateLeft=="周六"){
        this.getdata("1","6");

        this.setState({newdata55: this.state.newdata5.L6})
      }else if(this.state.dateLeft=="周日"){
        this.getdata("1","7");

        this.setState({newdata55: this.state.newdata5.L7})
      }
    }else if(sel === 'M'){

      this.setState({dateRight: '销售额-客单价'});
      this.setState({dayRight: '客单价'});


      if(this.state.dateLeft=="周一"){
        this.getdata("2","1");

        this.setState({newdata55: this.state.newdata5.J1})
      }else if(this.state.dateLeft=="周二"){
        this.getdata("2","2");

        this.setState({newdata55: this.state.newdata5.J2})
      }else if(this.state.dateLeft=="周三"){
        this.getdata("2","3");

        this.setState({newdata55: this.state.newdata5.J3})
      }else if(this.state.dateLeft=="周四"){
        this.getdata("2","4");

        this.setState({newdata55: this.state.newdata5.J4})
      }else if(this.state.dateLeft=="周五"){
        this.getdata("2","5");

        this.setState({newdata55: this.state.newdata5.J5})
      }else if(this.state.dateLeft=="周六"){
        this.getdata("2","6");

        this.setState({newdata55: this.state.newdata5.J6})
      }else if(this.state.dateLeft=="周日"){
        this.getdata("2","7");

        this.setState({newdata55: this.state.newdata5.J7})
      }
    }
    Popup.hide();

  },

  onClickDay() {
    document.documentElement.style.overflow='hidden';
    localStorage.setItem("listen",1);
    Popup.show(
      <div>
        <List
        >
          <List.Item

            onClick={() => { this.onCloseDay('D1'); }}
          >周一</List.Item>
          <List.Item

            onClick={() => { this.onCloseDay('D2'); }}
          >周二</List.Item>
          <List.Item

            onClick={() => { this.onCloseDay('D3'); }}
          >周三</List.Item>
          <List.Item

            onClick={() => { this.onCloseDay('D4'); }}
          >周四</List.Item>
          <List.Item

            onClick={() => { this.onCloseDay('D5'); }}
          >周五</List.Item>
          <List.Item

            onClick={() => { this.onCloseDay('D6'); }}
          >周六</List.Item>
          <List.Item

            onClick={() => { this.onCloseDay('D7'); }}
          >周日</List.Item>

        </List>
      </div>,{ transitionName: 'false' }
    );
    document.documentElement.style.overflow='visible';

  },

  onCloseDay(sel) {
    if (sel === 'D1') {

      this.setState({dateLeft: '周一'});


      if(this.state.dateRight=="销售额-客单量"){
        this.getdata("1","1");

        this.setState({newdata55: this.state.newdata5.L1})
      }else if(this.state.dateRight=="销售额-客单价"){
        this.getdata("2","1");

        this.setState({newdata55: this.state.newdata5.J1})

      }
    }else if(sel === 'D2'){
      this.setState({dateLeft: '周二'});


      if(this.state.dateRight=="销售额-客单量"){
        this.getdata("1","2");

        this.setState({newdata55: this.state.newdata5.L2})
      }else if(this.state.dateRight=="销售额-客单价"){
        this.getdata("2","2");

        this.setState({newdata55: this.state.newdata5.J2})
      }
    }else if(sel === 'D3'){

      this.setState({dateLeft: '周三'});


      if(this.state.dateRight=="销售额-客单量"){
        this.getdata("1","3");

        this.setState({newdata55: this.state.newdata5.L3})
      }else if(this.state.dateRight=="销售额-客单价"){
        this.getdata("2","3");

        this.setState({newdata55: this.state.newdata5.J3})
      }
    }else if(sel === 'D4'){

      this.setState({dateLeft: '周四'});


      if(this.state.dateRight=="销售额-客单量"){
        this.getdata("1","4");

        this.setState({newdata55: this.state.newdata5.L4})
      }else if(this.state.dateRight=="销售额-客单价"){
        this.getdata("2","4");

        this.setState({newdata55: this.state.newdata5.J4})
      }
    }else if(sel === 'D5'){

      this.setState({dateLeft: '周五'});


      if(this.state.dateRight=="销售额-客单量"){
        this.getdata("1","5");

        this.setState({newdata55: this.state.newdata5.L5})
      }else if(this.state.dateRight=="销售额-客单价"){
        this.getdata("2","5");

        this.setState({newdata55: this.state.newdata5.J5})
      }
    }else if(sel === 'D6'){

      this.setState({dateLeft: '周六'});


      if(this.state.dateRight=="销售额-客单量"){
        this.getdata("1","6");

        this.setState({newdata55: this.state.newdata5.L6})
      }else if(this.state.dateRight=="销售额-客单价"){
        this.getdata("2","6");

        this.setState({newdata55: this.state.newdata5.J6})
      }
    }else if(sel === 'D7'){

      this.setState({dateLeft: '周日'});


      if(this.state.dateRight=="销售额-客单量"){
        this.getdata("1","7");

        this.setState({newdata55: this.state.newdata5.L7})
      }else if(this.state.dateRight=="销售额-客单价"){
        this.getdata("2","7");

        this.setState({newdata55: this.state.newdata5.J7})
      }
    }


    Popup.hide();
    document.documentElement.style.overflow='visible';
  },


  render: function(newdata) {

    return (
      <div className={styles.headone}>
        <div >
          <NavBar leftContent="返回" mode="light" onLeftClick={this.goback}>
            <span className={styles.holidayhead}>
             天天PK
            </span>
          </NavBar>
        </div>

        <div>
          <div className={styles.shopone}>
            <a href="javascript:scrollTo(0,0);" style={{color:'black'}}>
            <div className={styles.shoptwo} type="ghost" onClick={this.onClick}><span>{this.state.dateRight}</span>
              <img src="./lib/image/sanjiao_03.png" className={styles.sanjiaoImg}/></div>
              </a>
            <a href="javascript:scrollTo(0,0);" style={{color:'black'}}>
            <div className={styles.shoptree} type="ghost" onClick={this.onClickDay}><span>{this.state.dateLeft}</span>
              <img src="./lib/image/sanjiao_03.png" className={styles.sanjiaoImg}/></div>
              </a>
          </div>
        </div>

        <div className={styles.goodsSelect1}>
          <div className ={styles.monitorMonth}>
                   <span className={styles.goodshot1}>
                   近3月所有{this.state.dateLeft}增降幅分布
                   </span>
          </div>
        </div>

        <div className={styles.PkSelect2}>
          <span className={styles.pkxiaoshou}>销售额：</span>
          <div className={styles.pkSelectAdd}>
            <div className={styles.goodsAddOne} style={{width:this.state.TotalAddNumber+'%'}}></div>
            <div className={styles.goodsAddTwo} style={{width:this.state.TotaldecNumber+'%'}}></div>
            <div className={styles.goodsAddOne1}>
              <span className={styles.goodsAddOne2}>增  +{this.state.TotalAddNumber}%</span>
              <span className={styles.goodsAddOne3}>降  -{this.state.TotaldecNumber}%</span>
            </div>
          </div>
        </div>
        <div className={styles.PkSelect2}>
          <span className={styles.pkxiaoshou}>{this.state.dayRight}：</span>
          <div className={styles.pkSelectAdd}>
            <div className={styles.goodsAddOne} style={{width:this.state.AddNumber+'%'}}></div>
            <div className={styles.goodsAddTwo} style={{width:this.state.decNumber+'%'}}></div>
            <div className={styles.goodsAddOne1}>
              <span className={styles.goodsAddOne2}>增  +{this.state.AddNumber}%</span>
              <span className={styles.goodsAddOne3}>降  -{this.state.decNumber}%</span>
            </div>
          </div>
        </div>
        <div className={styles.pkgird}></div>
        <ReactIScroll iScroll={iScroll}
                      options={{mouseWheel: true, scrollbars: false, scrollX: true, click:true}}>
          <div style={{width:'13rem'}}>
        <div className={styles.pkEcharts}>
          <div id="main" style={{width: 13+'rem', height:6+'rem'}}></div>
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
                <div className={styles.holidayheadTwo}>销售额(元)</div>
              </Flex.Item>
              <Flex.Item>
                <div className={styles.holidayheadTwo}><span className={styles.daypkhead}>较上周</span><span className={styles.daypkheadnew}>同期</span></div>
              </Flex.Item>
              <Flex.Item>
                <div className={styles.holidayheadTwo} style={{float: 'right'}}>{this.state.dayRight}</div>
              </Flex.Item>
              <Flex.Item>
                <div className={styles.holidayheadTwo} style={{float: 'right'}}><span className={styles.daypkhead}>较上周</span><span className={styles.daypkheadnew}>同期</span></div>
              </Flex.Item>
            </Flex>
          </WingBlank>

        </div>


        <div >
          {
            this.state.MonitorData.map(function (newdata) {
              return(
                <ol  className={styles.holidaytop2} key={newdata.id}>
                  <div className="flex-container">
                    <div className={styles.newontainer} >
                    <WingBlank size="lg">
                      <Flex>
                        <Flex.Item>
                          <div className={styles.holidaybodyTop}>{newdata.rdate}</div>
                        </Flex.Item>
                        <Flex.Item>
                          <div className={styles.sellbody}>{newdata.total}</div>
                        </Flex.Item>
                        <Flex.Item>
                          <div className={newdata.totalRate.indexOf("+")==0?styles.daypkadd:styles.daypkaddnew}>{newdata.totalRate}</div>
                        </Flex.Item>
                        <Flex.Item>
                          <div className={styles.holidaybody}>{newdata.kedan}</div>
                        </Flex.Item>
                        <Flex.Item>
                          <div className={newdata.kRate.indexOf("+")==0?styles.daypkadd:styles.daypkaddnew} >{newdata.kRate}</div>
                        </Flex.Item>
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


export default Daypk;
