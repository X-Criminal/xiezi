import React,{Component}                                        from "react";
import {Layout,Menu}                                            from "antd";
import HEADER                                                   from "./header"
import Body                                                     from "./body"
import "../css/home.css";
import "../font-icn/iconfont.css"
/**路由组件 */  

const {Header,Sider,Content} = Layout;
// const SubMenu = Menu.SubMenu;
// const MenuItemGroup = Menu.ItemGroup;
class App extends Component{
        constructor(props){
            super(props)
            this.state={

            }
        }
        render(){
            return(
                    <Home />
                  )
        }
        
}



const Home = (props)=>{
    return(
        <div className={"Home"}>
        <Layout>
            <Header>
                <HEADER /> 
            </Header>
            <Layout>
                <Sider breakpoint={Enum}>
                    <Menu
                        defaultSelectedKeys={['/']}
                        defaultOpenKeys={['sub1']}
                        selectedKeys={["admin"]}
                        mode="inline"
                        theme="dark"
                    >
                        <Menu.Item key={"admin"}>
                                <i className={"iconfont icon-shezhi"}></i>&nbsp;&nbsp;
                                管理员管理
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Content>
                        <Body>
                            
                        </Body>
                </Content>
            </Layout>
        </Layout>
      </div>
    )
}


export default App;

 let Enum ={
    xs: '480px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1600px',
}