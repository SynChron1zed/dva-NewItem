/**
 * Created by Administrator on 2016/10/20.
 */

import React ,{map,}from 'react';
import $ from 'jquery';
import { NavBar,Flex,WingBlank, WhiteSpace,Toast} from 'antd-mobile';
import { browserHistory } from 'dva/router';
import styles from './Goods.less';
import fetch from 'dva/fetch';



var Goods = React.createClass({

  getInitialState: function () {
    return {
      newdata: [],
      newdata5: [],
      newdate:[],
      HolidayData:[],
      classdata:[2016],
      holidaytop:['所有门店最高销售额记录2015年10月：'],
      Goodsdata:['2016.09.01-2016.09.13'],
      Selldate:['月'],


    }
  },

  getdata:function (opt) {
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



    var g  =  getMonths();//本月
    console.log(g)
    this.setState({month:g.lm});//本月
    this.setState({dateLeft:g.lm});
    var month = g.lm



    var h  =  getLMonths();//上月
    console.log(h)
    this.setState({Lmonth:h.lm});//上月
    var lmonth = h.lm

    var  SDate =[];
    var  EDate =[];
    var select = []

    if(opt=="m"){
      SDate=g.m1
      EDate=g.m2
      select="0"
      this.setState({Goodsdata: month});
    }else if(opt=="lm"){
      SDate=h.m1
      EDate=h.m2
      select='1'
      this.setState({Goodsdata: lmonth});
    }

    var userIf =localStorage.getItem("userinfo");
    userIf = JSON.parse(userIf);
    var url = localStorage.getItem("url");
    url = url+'spfx';

    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
         "bDate":SDate,
         "eDate":EDate,
        "id":select,
        /*"bDate":"2016-01-01",
        "eDate":"2016-01-30",*/
        "EN":userIf.en,
        "UserId":userIf.userid,

      })

    },this).then(function (res) {
      console.log("fetch request ", JSON.stringify(res.ok));
      if (res.ok) {
        res.json().then(function (json) {

          console.info(json);

          if(json.data.saleProductsTOP10List.length==0){
            Toast.offline('数据未更新!',1);
            this.setState({HolidayData:[]});

            return false
          }

          for(var i = 0;i<json.data.saleProductsTOP10List.length;i++){
            if(json.data.saleProductsTOP10List[i].trate<=0){
              json.data.saleProductsTOP10List[i].trate=json.data.saleProductsTOP10List[i].trate+"%"
            }else{
              json.data.saleProductsTOP10List[i].trate="+"+json.data.saleProductsTOP10List[i].trate+"%"
            }
          }



          this.setState({HolidayData: json.data.saleProductsTOP10List});


        }.bind(this));
      } else {
      }

    }.bind(this)).catch(function (e) {
      console.log("fetch fail");
    });
  },

  componentDidMount() {

    this.getdata("m");

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

  newback:function(){


    this.setState({HolidayData: this.state.newdata});
    this.setState({classdata: 2016});

    this.setState({Selldate: '月'});
    console.log(this.state.HolidayData)
    this.getdata("m");
  },
  newback5:function(){

    this.setState({HolidayData: this.state.newdata5});
    this.setState({classdata: 2015});

    this.setState({Selldate: '日'});
    this.getdata("lm");
  },

  render: function(newdata) {


    return (
      <div className={styles.headone}>
        <div >
          <NavBar leftContent="返回" mode="light" onLeftClick={this.goback}>
            <span className={styles.holidayhead}>
              产品分析
            </span>
          </NavBar>
        </div>

        <div>
          <div className={styles.holidaySelect} >
            <div className={this.state.classdata==2016? styles.holiday2016:styles.newholiday2016} onClick ={this.newback} >
              <span>本月</span>
            </div>
            <div className={this.state.classdata==2015? styles.holiday2015:styles.newholiday2015}  onClick ={this.newback5} >
              <span >上月</span>
            </div>
            <div>
              <span className={styles.goodsdate}>{this.state.Goodsdata}</span>
            </div>
          </div>
        </div>

        <div className={styles.goodsSelect1}>
          <div>
            <img src="./lib/image/goods01.png" className={styles.goodshot}/>
                   <span className={styles.goodshot1}>
                  人气热销榜
                   </span>
          </div>
        </div>


        <div className={styles.ontainer} >

          <WingBlank size="lg">
            <Flex>
              <Flex style={{width:10+'%'}}>
                <div className={styles.holidayheadTwoTop} >排名</div>
              </Flex>
              <Flex style={{width:30+'%'}}>
                <div className={styles.holidayheadTwo}>我的产品</div>
              </Flex>
              <Flex style={{width:20+'%'}}>
                <div className={styles.holidayheadTwo22}><span className={styles.goodsHead}>销售额</span><span className={styles.goodsHeadNew}>(元)</span></div>
              </Flex>

              <Flex style={{width:20+'%'}}>
                <div className={styles.holidayheadTwo} ><span className={styles.goodsHead1}>销售额</span><span className={styles.goodsHeadNew1}>贡献率</span></div>
              </Flex>
              <Flex style={{width:20+'%'}}>
                <div className={styles.holidayheadTwo22} style={{float: 'right'}}><span className={styles.goodsHead2}>较上月</span><span className={styles.goodsHeadNew2}>同期</span></div>
              </Flex>
            </Flex>
          </WingBlank>

        </div>

        <div >
          {
            this.state.HolidayData.map(function (newdata) {
              return(
                <ul  className={styles.holidaytop2} key={newdata.id}>
                  <div className="flex-container">
                    <div className={styles.newontainer} >
                    <WingBlank size="lg">
                      <Flex>
                        <Flex style={{width:10+'%'}}>
                          <div className={newdata.id==1||newdata.id==2||newdata.id==3?styles.holidaybodyTop1:styles.holidaybodyTop} >{newdata.id}</div>
                        </Flex>
                        <Flex style={{width:30+'%'}}>
                          <div className={styles.sellbody}>{newdata.prodname}</div>
                        </Flex>
                        <Flex style={{width:20+'%'}}>
                          <div className={styles.holidaybody}>{newdata.total}</div>
                        </Flex>
                        <Flex style={{width:20+'%'}}>
                          <div className={styles.holidaybody}>{newdata.lrate}%</div>
                        </Flex>
                        <Flex style={{width:20+'%'}}>
                          <div className={newdata.trate.indexOf("+")==0?styles.goodsaddnew:styles.goodsadd} >{newdata.trate}</div>
                        </Flex>
                      </Flex>
                    </WingBlank>
                    </div>
                  </div>
                </ul>
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


export default Goods;
