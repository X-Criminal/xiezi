import React, { Component } from 'react';
import Login                 from "./jsx/login.js";
import Home                  from "./jsx/Home.js"
import cookie                from "react-cookies";

import "antd/dist/antd.css";
import "./App.css";
class App extends Component {
  constructor(props){
    super(props)
    this.state={
        islogin:false,
    }
  }
  componentWillMount(){
    sessionStorage.setItem("url","http://58.250.30.13:8086");    
    if(cookie.load("userData")){
        this.setState({
          islogin:true,
        })
    }
  }

  login=( )=>{
    this.setState({
        islogin:!this.state.islogin,
    })
  }

  render() {
    return (
      <div className="App">
          <Router login={this.login} islogin={this.state.islogin}/>
      </div>
    );
  }
}

export default App;


function Router(props){
  if(props.islogin){
     return <Home />
  }else{
    return <Login login={props.login}/>
  }
}