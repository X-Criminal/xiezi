import React,{Component}                        from "react";
import { Form, Icon, Input, Button,message}             from 'antd';
import axios                                    from "axios";
import cookie                                   from "react-cookies";
import "../css/login.css"
import logo2                                   from "../img/logo2.png"
let url;
const FormItem = Form.Item;
class app extends Component{
    constructor(props){
        super(props)
        this.state={
                Switch:true,
                loading:false,
                loginerr:"",
                resetAdminErr:"",
                code:"",
                user:"",
        }
    }
    /**获取地址 */
    componentWillMount(){
        url  = sessionStorage.getItem("url")
    }
    /***验证两次输入是否一致 */
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
          form.validateFields(['confirm'], { force: true });
        }
        callback();
      };

      compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('Password')) {
          callback('两次输入的密码不一致!');
        } else {
          callback();
        }
      }

    /**登录 */
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
          if (!err) {
              axios.post(url+"/SmartShoes/admin/adminLogin",values)
                     .then((res)=>{ 
                            if(res.data.success){
                                cookie.save("userData",res.data.data);
                                message.success(res.data.message);
                                this.props.login( );
                            }else{
                                message.error(res.data.message)
                            }
                     })
                     .catch((err)=>{
                        message.error("网络连接错误，请稍后再试~~")
                     })
            }else{
              console.log(err)
          }
        });
      }

     /**错误提示*/
      onfocus=()=>{
          this.setState({
            loginerr:""
          })
      }

    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div className={"login"}>
                <div className={"_loginTitle"}>
                    <p>- Welcome</p>
                    <p>华凯威-后台管理系统</p>
                    <p>Huakingway-Background Management System</p>
                </div>
                 <div className={"loginBody"}>
                            <img src={logo2} alt="logo2"/>
                            <p className={"loginTitle"}>登录</p>
                            <Form onSubmit={this.handleSubmit} className="login-form Login">
                            <FormItem>
                            {getFieldDecorator('adminAccount', {
                                rules: [{ required: true, message: '请输入用户名!' }],
                            })(
                                <Input  key={"登陆账号"} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} onFocus={this.onfocus} placeholder="账号" />
                            )}
                            </FormItem>
                            <FormItem>
                            {getFieldDecorator('adminPassword', {
                                rules: [{ required: true, message: '请输入密码!' }] ,
                            })(
                                <Input prefix={<Icon key={"登陆密码"} type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" onFocus={this.onfocus} placeholder="密码" />
                            )}
                            </FormItem>
                            <p className={"err"}>{this.state.loginerr}</p>
                            <FormItem>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登录
                                </Button>
                            </FormItem>
                        </Form>
                 </div>
            </div>
        )
    }
}

const  WrappedNormalLoginForm  = Form.create( )(app);
export default WrappedNormalLoginForm;