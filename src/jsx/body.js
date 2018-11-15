import React , {Component}                           from "react";
import axios                                         from "axios";
import { DatePicker ,Input,Table,Button,Pagination,message } from 'antd';
import moment from 'moment';
import "../css/body.css"
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const Search = Input.Search;
const { Column } = Table;
let url = ""
export default class App  extends Component {
     constructor(props){
         super(props)
         this.state={
            starttime:"",
            stoptime:"",
            query:"",
            pageNum:1,
            onSearch:"",

            Lis:[],
            total:0,
            RowKeys:[],

            loading:false,
            showTips:false,
            _showTips:false,
         }
     }
     componentWillMount(){
        url = sessionStorage.getItem("url");
     }
     componentDidMount(){
         this.init()
     }
     /**开始时间 */
     startTime=(type,date)=>{
         this.setState({
            starttime:date
         })
     }
     /**结束时间 */
     endTime=(type,date)=>{
        this.setState({
            stoptime:date
         })
     }
     /**查询要求 */
     Search=( e )=>{
         this.setState({
            query:e.target.value
         })
     }

     init=( data,cb )=>{
            let _data={
                pageSize:8,
                pageNum:this.state.pageNum,
            }
                if(this.state.query.length>0)       _data.query       = this.state.query;
                if(this.state.starttime.length>0)   _data.starttime   = this.state.starttime;
                if(this.state.stoptime.length>0)    _data.stoptime    = this.state.stoptime;
            if(data){
                for(let k in data){
                    _data[k] = data[k];
                }
            }
            
            axios.post(url+"SmartShoes/admin/equipment/getEquipmentDetails",_data)
                 .then((res)=>{
                     if(res.data.success){
                        this.setState({
                            Lis:res.data.data.list,
                            total:res.data.data.total,
                        })
                     }  
                 }).catch(()=>{
                     message.error("网络连接错误，请稍后再试！")
                 })

     }

     onPage = (data)=>{
         this.setState({
            pageNum:data,
         })
            this.init({pageNum:data})
     }

     onSearch=( )=>{
        this.init({})
     }

     rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
        //  console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
            this.setState({
                RowKeys:selectedRowKeys,
            })       
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
          axios.post(url+"/SmartShoes/admin/equipment/deleteEquipmentListByShoesId",{shoesId:this.state.RowKeys[0]})
                .then((res)=>{
                    if(res.data.success){
                        this.showTips( );
                        this.init( )
                    }else{
                        message.error(res.data.message)
                    }
                })
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
                <Table rowSelection={this.rowSelection} dataSource={this.state.Lis} rowKey={"shoesId"} pagination={false}>
                    <Column
                        title="编号"
                        dataIndex="userId"
                        key="userId"
                    />
                        <Column
                        title="设备编号"
                        dataIndex="shoesId"
                        key="shoesId"
                    />
                        <Column
                        title="设备名称"
                        dataIndex="shoesName"
                        key="shoesName"
                    />
                        <Column
                        title="绑定日期"
                        dataIndex="createtime"
                        key="createtime"
                    />
                        <Column
                        title="用户"
                        dataIndex="userName"
                        key="userName"
                    />
                        <Column
                        title="手机号"
                        dataIndex="userPhone"
                        key="userPhone"
                    />
                </Table>
                <div style={{textAlign:"right",marginTop:"30px"}}>
                    <Button loading={this.state.loading} style={btnStyle} onClick={this.Relieve} type="primary">解约绑定</Button>
                </div>
                <div className={"page"}>
                    <span>共{this.state.total}条</span>
                    <Pagination defaultCurrent={1} total={this.state.total} onChange={this.onPage}/>
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

// const data = [{
//     key: '1',
//     firstName: 'John',
//     lastName: 'Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     tags: ['nice', 'developer'],
//   }, {
//     key: '2',
//     firstName: 'Jim',
//     lastName: 'Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     tags: ['loser'],
//   }, {
//     key: '3',
//     firstName: 'Joe',
//     lastName: 'Black',
//     age: 32,
//     address: 'Sidney No. 1 Lake Park',
//     tags: ['cool', 'teacher'],
//   }];