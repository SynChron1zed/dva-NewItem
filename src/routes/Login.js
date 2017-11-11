/**
 * Created by Administrator on 2016/11/18.
 */
/**
 * Created by Administrator on 2016/10/18.
 */
import React from 'react';
import { Toast,NavBar,Icon,Button,Grid,Flex,WingBlank,WhiteSpace,List,InputItem} from 'antd-mobile';
import { browserHistory,History}from 'dva/router';
import styles from './Login.less';
import fetch from 'dva/fetch';
import { createForm } from 'rc-form';


var Login = React.createClass({

  getInitialState: function () {
    //localStorage.setItem("url",'http://211.152.55.242:8080/IOPERATE-Server/');
    //localStorage.setItem("url",'http://weipostest.weipos.com/IOPERATE-Server/');

    //localStorage.setItem("url",'http://192.168.88.113:8080/IOPERATE/');
    //localStorage.setItem("JZpassword",'0');
    //localStorage.setItem("url",'http://211.147.90.199:8081/IOPERATE-Server/');
    //localStorage.setItem("url",'http://211.147.90.199:8081/SSZGIOPERATE-Server/');
    localStorage.setItem("url",'http://211.152.55.242:8080/IOPERATE-Server/');



    return {
      Number:[],
      Name:[],
      Password:[]
    }

  },

  componentDidMount() {
    var userIf =localStorage.getItem("userinfo");
    if(localStorage.getItem("JZpassword")=="1" && userIf!=null){
      userIf = JSON.parse(userIf);
      this.setState({Number: userIf.en});
      this.setState({Name: userIf.username});
      this.setState({Password: localStorage.getItem("Password")});
      var items = document.getElementsByName("Password");
      items[0].checked=true;
    }


  },



  handleChangeNumber(event) {
    this.setState({Number: event.target.value});
  },

  handleChangeName(event) {
    this.setState({Name: event.target.value});
  },

  handleChangeNamePassword(event) {
    this.setState({Password: event.target.value});
  },
  JZpassword(event){

    var items = document.getElementsByName("Password");
    if (items[0].checked) {
      localStorage.setItem("JZpassword",'1');
    }else{
      localStorage.setItem("JZpassword",'0');
      this.setState({Number: ""});
      this.setState({Name: ""});
      this.setState({Password: ""});
    }
  },
  contextTypes: {
    router: React.PropTypes.object
  },



  handleSubmit(event) {
  /*  alert('A name was submitted: ' + this.state.Number + this.state.Name +this.state.Password);*/
    var userIf =localStorage.getItem("userinfo");
    if(this.state.Number=="") {
      Toast.info('请输入企业编号', 1);
      return false;
    }else
      if(this.state.Name==""){
      Toast.info('请输入用户名',1);
      return false;
    }else if(this.state.Password==""){
      Toast.info('请输入密码',1);
      return false;
    }else{

        var url = localStorage.getItem("url");
    url = url+'user/login';
    //http://192.168.88.113:8080/IOPERATE/
    fetch(url, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: JSON.stringify({
        /* "bDate":SDate,
         "eDate":EDate,*/

        "username":this.state.Name,

        "password":this.state.Password,

        "EN":this.state.Number


        /*"username":"0731005501",

        "password":"123456",

        "EN":"400"*/


      })

    },this).then(function (res) {
      console.log("fetch request ", JSON.stringify(res.ok));
      if (res.ok) {
        res.json().then(function (json) {


          if(json.code==200){
            Toast.success('登录成功!',1);
            var data = JSON.stringify(json.data)
            localStorage.setItem("userinfo",data);
            localStorage.setItem("Password",this.state.Password);

            this.context.router.push('/home')
          }else if(json.code==400){
            Toast.fail('用户名不存在!', 1);
            return false;
          }else if(json.code==49){
            Toast.fail('企业编码错误!', 1);
            return false;
          }else if(json.code==51){
            Toast.fail('密码错误请重新输入!', 1);
            return false;
          }else if(json.code==52){
            Toast.fail('企业不存在!', 1);
            return false;
          }

          console.info(json);


        }.bind(this));
      } else {
      }

    }.bind(this)).catch(function (e) {
      console.log("fetch fail");
    });
      }



  },



  render: function() {

    return (
     <div>
       <img className={styles.loginImg} src="./lib/image/login.png"/>

       <div className={styles.conpanyNum}>
         <span>企业编号</span>
         <form >

           <label>
             <input type="text"  value={this.state.Number} onChange={this.handleChangeNumber} />
           </label>
         </form>

       </div>

       <div className={styles.conpanyName}>
         <span>用户名</span>
         <form >

           <label>
             <input type="text" value={this.state.Name} onChange={this.handleChangeName} />
           </label>

         </form>


       </div>

       <div className={styles.conpanyPass}>
         <span>密码</span>
         <form >

           <label>
             <input type="password" value={this.state.Password} onChange={this.handleChangeNamePassword} />
           </label>

         </form>

       </div>

       <div >
       <form className={styles.JZpassword}>
         <p><input onClick={this.JZpassword} type="checkbox"  name="Password" />记住账号密码</p>
       </form>
       </div>
       <div style={{ margin: '60px 10%' }} >
         <Button type="primary" onClick={this.handleSubmit} className={styles.loginQuery}>登录</Button>
       </div>

     </div>




    )
  }

});
Login = createForm()(Login)
export default Login;
