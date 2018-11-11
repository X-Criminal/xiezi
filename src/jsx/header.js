import React,{Component} from "react";
import logo1             from "../img/logo1.png";
import "../css/header.css"

export default class App extends Component{
        constructor(props){
            super(props)
            this.state={

            }
        }

        render(){
             return(
                 <div className={"header"}>
                    <img src={logo1} alt={"logo"}/>
                    <div className={"userName"}>
                        <i className={"iconfont icon-ai-user"}></i>
                        <span>13888888</span>
                        <span>退出</span>
                    </div>
                 </div>
             )
        }
}