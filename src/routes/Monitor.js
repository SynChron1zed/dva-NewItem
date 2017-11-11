
/**
 * Created by Administrator on 2016/10/20.
 */


import React ,{map}from 'react';
import $ from 'jquery';
import { NavBar,Flex,WingBlank, WhiteSpace,Popup, List,Menu,Toast } from 'antd-mobile';
import { browserHistory } from 'dva/router';
import styles from './Montior.less';
import fetch from 'dva/fetch';


var Monitor = React.createClass({

  getInitialState() {
    localStorage.setItem("listen",2);
    return {
      sel: '',
      dateRight:['昨日'],
      newdateRight:['上周'],
      dateLeft:[],
      AddNumber:[],
      decNumber:[],
      AddNumbernum:[],
      decNumbernum:[],
      MonitorData:[],
      Lmonth:[],
      month:[],
      Lweek:[],
      week:[],



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

          onClick={() => { this.onClose('Yday'); }}
        >昨日</List.Item>

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
    if (sel === 'Yday') {
      this.setState({dateRight: '昨日'});
      this.setState({newdateRight: '上周'});
      this.haddate('yday');
    }else

    if (sel === 'upM') {
      this.setState({dateRight: '上月'});
      this.setState({newdateRight: '上月'});
      this.haddate('lm');
    }else if(sel === 'M'){
      this.setState({dateRight: '本月'});
      this.setState({newdateRight: '上月'});
      this.haddate('m');
    }else if(sel === 'upW'){
      this.setState({dateRight: '上周'});
      this.setState({newdateRight: '上周'});
      this.haddate('lw')
    }else if(sel === 'W'){
      this.setState({dateRight: '本周'});
      this.setState({newdateRight: '上周'});
      this.haddate('w')
    }
    Popup.hide();
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

    function GetDateStr(AddDayCount) {
      var dd = new Date();
      dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
      var y = dd.getFullYear();
      var m = dd.getMonth() + 1;//获取当前月份的日期
      var d = dd.getDate();
      return y + "-" + m + "-" + d;
    }

    var yDay = GetDateStr(-1);
    console.log(yDay)


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
    var  newdate = [];

    if(opt=='yday'){
      newdate="0"
      SDate=yDay
      EDate=yDay
      this.setState({dateLeft:yDay});

    }else
    if(opt=="m"){
      SDate=g.m1
      EDate=g.m2
      newdate="3"
      this.setState({dateLeft:g.lm});

    }else if(opt=="lm"){
      SDate=h.m1
      EDate=h.m2
      newdate="4"
      this.setState({dateLeft:h.lm});
    }else if(opt=="w"){
      SDate=w.Sweek1
      EDate=w.Sweek2
      newdate="1"
      this.setState({dateLeft:w.Sweek});
    }else if(opt=="lw"){
      SDate=sw.Sweek1
      EDate=sw.Sweek2
      newdate="2"
      this.setState({dateLeft:sw.Sweek});
    }

    var userIf =localStorage.getItem("userinfo");
    userIf = JSON.parse(userIf);
    var url = localStorage.getItem("url");
    url = url+'dtjk';


    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
         "bDate":SDate,
         "eDate":EDate,
        "labelDate":newdate,

        /*"bDate":"2016-01-01",

        "eDate":"2016-01-30",*/

        "EN":userIf.en,

        "UserId":userIf.userid

      })

    },this).then(function (res) {
      console.log("fetch request ", JSON.stringify(res.ok));
      if (res.ok) {
        res.json().then(function (json) {


          console.info(json);
          if(json.code==1){
            Toast.offline('数据未更新!',1);
            this.setState({MonitorData: []});
            this.setState({AddNumber: []});
            this.setState({decNumber: []});
            this.setState({AddNumbernum: []});
            this.setState({decNumbernum: []});
            return false
          }


          for(var i = 0;i<json.data.dynamicMonitorTable.length;i++){
            if(json.data.dynamicMonitorTable[i].lRate<=0){
              json.data.dynamicMonitorTable[i].lRate=json.data.dynamicMonitorTable[i].lRate+"%"
            }else{
              json.data.dynamicMonitorTable[i].lRate="+"+json.data.dynamicMonitorTable[i].lRate+"%"
            }


          }

          this.setState({MonitorData: json.data.dynamicMonitorTable});
          this.setState({AddNumber: json.data.dynamicMonitorV.addrate});
          this.setState({decNumber: json.data.dynamicMonitorV.decreaserate});
          this.setState({AddNumbernum: json.data.dynamicMonitorV.addnum});
          this.setState({decNumbernum: json.data.dynamicMonitorV.decreasenum});

        }.bind(this));
      } else {
      }

    }.bind(this)).catch(function (e) {
      console.log("fetch fail");
    });


  },


  componentDidMount() {


    window.onpopstate = function(event) {

        if(localStorage.getItem("listen")==1){
          Popup.hide();
        }
      localStorage.setItem("listen",2);
    };
  this.haddate("yday");




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



  render: function(newdata) {

    return (
      <div className={styles.headone}>
        <div >
          <NavBar leftContent="返回" mode="light" onLeftClick={this.goback}>
            <span className={styles.holidayhead}>
              动态监测
            </span>
          </NavBar>
        </div>

        <div>
          <div className={styles.shopone}>
            <a href="javascript:scrollTo(0,0);" style={{color:'black'}}>
            <div className={styles.shoptwo} type="ghost" onClick={this.onClick}><span>{this.state.dateRight}</span>
              <img src="./lib/image/sanjiao_03.png" className={styles.sanjiaoImg}/>
            </div>
              </a>
            <div className={styles.shoptree}><span>{this.state.dateLeft}</span></div>
          </div>
        </div>

        <div className={styles.goodsSelect1}>
          <div className ={styles.monitorMonth}>
                   <span className={styles.goodshot1}>
                     {this.state.dateRight}门店增降幅分布
                   </span>
          </div>
        </div>

        <div className={styles.MonitorSelect2}>
          <div className={styles.goodsSelectAdd}>
              <div className={styles.goodsAddOne} style={{width:this.state.AddNumber+'%'}}></div>
              <div className={styles.goodsAddTwo} style={{width:this.state.decNumber+'%'}}></div>
              <div className={styles.goodsAddOne1}>
                <span className={styles.goodsAddOne2}>增 {this.state.AddNumbernum}家 +{this.state.AddNumber}%</span>
                <span className={styles.goodsAddOne3}>降 {this.state.decNumbernum}家 -{this.state.decNumber}%</span>
              </div>
          </div>
        </div>

        <div className={styles.MSelect}>
          <div className ={styles.monitorMonth}>
                   <span className={styles.goodshot1}>
                     门店{this.state.dateRight}增降幅度监测数据
                   </span>
          </div>
        </div>


        <div className={styles.ontainer} >

          <WingBlank size="lg">
            <Flex>
              <Flex style={{width:10+'%'}}>
                <div className={styles.holidayheadTwoTop} >排名</div>
              </Flex>
              <Flex style={{width:40+'%'}}>
                <div className={styles.holidayheadTwo}><span>门店</span></div>
              </Flex>

              <Flex style={{width:35+'%'}}>
                <div className={styles.holidayheadTwo}><span className={styles.Mone}>较{this.state.newdateRight}</span><span className={styles.Mtwo}>增降幅度</span></div>
              </Flex>
              <Flex style={{width:25+'%'}}>
                <div className={styles.holidayheadTwo} style={{float: 'right'}}>销售额(元)</div>
              </Flex>
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
                        <Flex style={{width:10+'%'}}>
                          <div className={newdata.id==1||newdata.id==2||newdata.id==3?styles.MbodyTop1:styles.MbodyTop} >{newdata.id}</div>
                        </Flex>
                        <Flex style={{width:40+'%'}}>
                          <div className={styles.sellbody}>{newdata.storesroom}</div>
                        </Flex>
                        <Flex style={{width:35+'%'}}>
                          <div className={newdata.lRate.indexOf("+")==0?styles.Mbody:styles.Mbody1}>{newdata.lRate}</div>
                        </Flex>
                        <Flex style={{width:25+'%'}}>
                          <div className={styles.Mbody2} >{newdata.total}</div>
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


export default Monitor;
