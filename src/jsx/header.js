import React,{Component} from "react";
import logo1             from "../img/logo1.png";
import cookie            from "react-cookies"
import "../css/header.css"

export default class App extends Component{
        constructor(props){
            super(props)
            this.state={

            }
        }

        sign=()=>{
            cookie.remove("userData")
            window.location.reload()
        }

        render(){
             return(
                 <div className={"header"}>
                    <img src={logo1} alt={"logo"}/>
                    <span>华凯威后台管理系统</span>
                    <div className={"userName"}>
                        <i className={"iconfont icon-ai-user"}></i>
                        <span>{cookie.load("userData").createtime}</span>
                        <span onClick={this.sign}>退出</span>
                    </div>
                 </div>
             )
        }
}