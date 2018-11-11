import React , {Component}     from "react";
import { DatePicker ,Input,Table,Button,Pagination } from 'antd';
import moment from 'moment';
import "../css/body.css"
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const Search = Input.Search;
const { Column } = Table;
export default class App  extends Component {
     constructor(props){
         super(props)
         this.state={
            startTime:"",
            endTime:"",
            onSearch:"",
            loading:false,
            showTips:false,
            _showTips:false,
         }
     }
     startTime=(type,date)=>{
         this.setState({
            startTime:date
         })
     }
     endTime=(type,date)=>{
        this.setState({
            endTime:date
         })
     }
     Search=( e )=>{
         this.setState({
            onSearch:e.target.value
         })
     }
     onSearch=( )=>{

     }

     rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        }),
      };

      Relieve=( )=>{
          this.setState({
            loading:true,
          })
        this.showTips( )
      }
      
      /**提示框 */
      showTips=()=>{
          let _this = this;
        this.setState({
            showTips:!this.state.showTips,
            _showTips:!this.state._showTips
        })
        setTimeout(()=>{
            _this.setState({
                _showTips:!this.state._showTips,
            })
            setTimeout(()=>{
                _this.setState({
                    showTips:!this.state.showTips,
                    loading:false,
                })
            },800)
        },2500)
      }
      
     render(){
         return(
             <div className={"body"}>
                <h3>设备列表</h3>
                <div className={"search"}>
                    <span>日期查询</span>
                    <DatePicker placeholder={"开始时间"} onChange={this.startTime} />
                    <DatePicker placeholder={"结束时间"} onChange={this.endTime} />
                    <Search
                        onChange={this.Search}
                        placeholder="搜索设备编号"
                        onSearch={this.onSearch}
                        enterButton
                     />
                </div>
                <Table rowSelection={this.rowSelection} dataSource={data} rowKey={"key"} pagination={false}>
                    <Column
                        title="编号"
                        dataIndex="key"
                        key="key"
                    />
                        <Column
                        title="设备编号"
                        dataIndex="lastName"
                        key="lastName"
                    />
                        <Column
                        title="设备名称"
                        dataIndex="age"
                        key="age"
                    />
                        <Column
                        title="绑定日期"
                        dataIndex="address"
                        key="address"
                    />
                        <Column
                        title="用户"
                        dataIndex="firstName"
                        key="firstName"
                    />
                        <Column
                        title="手机号"
                        dataIndex="tags"
                        key="tags"
                    />
                </Table>
                <div style={{textAlign:"right",marginTop:"30px"}}>
                    <Button loading={this.state.loading} style={btnStyle} onClick={this.Relieve} type="primary">解约绑定</Button>
                </div>
                <div className={"page"}>
                    <span>共{}条</span>
                    <Pagination defaultCurrent={1} total={50} />
                </div>
                {
                    this.state.showTips?(
                        <div className={this.state._showTips?"Tips Tipsa":"Tips Tipsb"}>
                            <i className={"iconfont icon-zhengque"}></i>
                            <p>设备解绑成功!</p>
                        </div>
                    ):null
                }
             </div>
         )
     }
}
let btnStyle ={
    marginRight:"20px"
}

const data = [{
    key: '1',
    firstName: 'John',
    lastName: 'Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  }, {
    key: '2',
    firstName: 'Jim',
    lastName: 'Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  }, {
    key: '3',
    firstName: 'Joe',
    lastName: 'Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  }];