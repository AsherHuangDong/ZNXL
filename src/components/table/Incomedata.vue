<template>
  <div class="content_box">
    <div class="cont_head">
      <Breadcrumb :style="{padding: '14px 24px'}">
        <BreadcrumbItem to="/datastatistics">数据统计</BreadcrumbItem>
        <BreadcrumbItem>收入统计</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="container">
      <Row>
        <Col >
          <span>时间 : </span>
          <DatePicker type="datetimerange"  v-model="shijianduan1" placeholder="请选择时间日期" style="width: 300px"></DatePicker>
          <div @click="dates" class="yangshi"  >
            <span :class="item.name==num?'ac':''" v-for="(item,index) in date" :data-index="item.value">{{item.name}}</span>
          </div>
          <Button style="background:#00C1DE;color:#ffffff;border-color:#00C1DE;" @click="tosearch">搜索</Button>
        </Col>
      </Row>
      <Row>
        <Table style="margin-top: 30px" :columns="columns" :data="list1" class="table" :loading="isLoading"></Table>
      </Row>
      <Row class="m-t-10 text-center">
        <Col style="text-align:center;margin-top:20px;">
          <Page :total="total" show-total :current="pageIndex" :page-size="pageSize" @on-change="getList"></Page>
        </Col>
      </Row>
      <Row>
          <!--<div id="myChart" style="width:100%;height:400px;margin-top: 30px;background-size: contain"></div>-->
      </Row>
    </div>
  </div>
</template>
<script>
  import echarts from 'echarts'
    export default {
    name: "orderadmin",
    data () {
      let self = this;
      return {
        num:"",
        id:"",
        date:[
          // {
          //   value:"1",
          //   name:'今日'
          // },
          // {
          //   value:"2",
          //   name:'昨天'
          // },
          {
            value:"7",
            name:'最近7天'
          },
          {
            value:"30",
            name:'最近30天'
          },
          {
            value:"0",
            name:'所有'
          },
        ],
        total:0,
        pageIndex:1,
        pageSize: 0,
        isLoading: false,
        shijianduan1:[],
        list1:[],
        obj: {
          startDate:"",
          endDate:""
        },
        list:{
          wechat:""
        },
        columns:[
          {
            align: "center",
            title: '日期',
            key: 'province',
            render: function (h, params) {
              return h('span',params.row.statDate)
            }
          },
          {
            align: "center",
            title: '微信收入',
            render: function (h, params) {
              return h('span',parseInt(params.row.wechat))
            }
          },
          {
            type: "center",
            align: "center",
            title: '支付宝收入',
            render: function (h, params) {
              return h('span',parseInt(params.row.alipay))
            }
          },
          {
            align: "center",
            title: '人民币总收入',
            render: function (h, params) {
              return h('span',parseInt(params.row.wechat+params.row.alipay))
            }
          },
          {
            align: "center",
            title: '商城消费收入',
            render: function (h, params) {
              return h('span',parseInt(params.row.shopConsumption))
            }
          },
          {
            align: "center",
            title: '许愿收入',
            render: function (h, params) {
              return h('span',parseInt(params.row.wishIncome))
            }
          },
          {
            align: "center",
            title: '认证收入',
            render: function (h, params) {
              return h('span',parseInt(params.row.realNameIncome))
            }
          },
          {
            align: "center",
            title: '赠送ATOS',
            render: function (h, params) {
              return h('span',parseInt(params.row.totalAtoshi))
            }
          },
          {
            align: "center",
            title: '赠送算力',
            render: function (h, params) {
              return h('span',parseInt(params.row.totalCalculatePower))
            }
          },
          {
            align: "center",
            title: '产品成本',
            render: function (h, params) {
              return h('span',parseInt(params.row.productCosts))
            }
          },
          {
            align: "center",
            title: '销售奖金',
            render: function (h, params) {
              return h('span',parseInt(params.row.salesBonus))
            }
          },
          {
            align: "center",
            title: '毛利润',
            render: function (h, params) {
              return h('span',parseInt(params.row.wechat+params.row.alipay)-params.row.productCosts-params.row.salesBonus)
            }
          },
          {
            align: "center",
            title: '赠送ATOS异常'
          },
          {
            align: "center",
            title: '赠送算力异常'
          },
        ],
        datezes:[],
        api:""
      }
    },
    methods: {
      tosearch(){
        this.num=""
        if (this.shijianduan1[0] && this.shijianduan1[1]) {
          this.obj.startDate=this.get_unix_time(this.$tool.date.format(new Date(this.shijianduan1[0]), 'yyyy-MM-dd hh:mm:ss'))
          this.obj.endDate=this.get_unix_time(this.$tool.date.format(new Date(this.shijianduan1[1]), 'yyyy-MM-dd hh:mm:ss'))
        } else {
          delete this.obj.startDate
          delete this.obj.endDate
        }
        if(this.obj.startDate && this.obj.endDate){
          this.getData();
        }

      },
      get_unix_time(dateStr){//日期转换成毫秒
        var newstr = dateStr.replace(/-/g,'/');
        var date =  new Date(newstr);
        var time_str = date.getTime()
        return time_str
      },
      getData (){
        let _this=this
        _this.obj.page=_this.pageIndex
        _this.isLoading=true
         // if(this.num==1){
         //   _this.api="/api/dataStat/queryIncomeStat"
         // }else if(this.num==2){
         //   _this.api="/api/dataStat/queryPersonStat"
         // }else if(this.num==3){
         //   _this.api="/api/dataStat/queryAtoshiStat"
         // }else if(this.num==4){
         //   _this.api="/api/dataStat/queryCalculatePowerStat"
         // }

        _this.$axios.post('/api/dataStat/queryIncomeStat', _this.obj).then(res => {
          if (res.data.code == 100) {
            _this.list1=res.data.data.pageInfo.list
            _this.total=res.data.data.pageInfo.total
            _this.pageSize=res.data.data.pageInfo.pageSize
            _this.isLoading=false;
          } else {
            _this.$Message.error(res.data.msg)
          }
        })
      },
      dates(e){
        var _this=this
        _this.num= e.target.innerText
        let date=_this.$tool.date.format(new Date(), 'yyyy-MM-dd hh:mm:ss')
        if(parseInt(e.target.dataset.index)==7){
          _this.obj.startDate=_this.get_unix_time(date)-(parseInt(e.target.dataset.index)+1)*86400000;
          this.obj.endDate=_this.get_unix_time(date)
          _this.datezes=[]
          for(let i=1;i<=7;i++){
            _this.datezes.push(_this.getMyDate(parseInt(_this.get_unix_time(date)-(i*86400000))))
          }
          }else if(parseInt(e.target.dataset.index)==30){
          _this.obj.startDate=_this.get_unix_time(date)-(parseInt(e.target.dataset.index)+1)*86400000;
          this.obj.endDate=_this.get_unix_time(date)-(1*86400000)
          _this.datezes=[]
          _this.datezes.push(_this.getMyDate(parseInt(_this.get_unix_time(date))))
          for(let i=1;i<=30;i++){
            _this.datezes.push(_this.getMyDate(parseInt(_this.get_unix_time(date)-((i+2)*86400000))))
            i=i+2
          }
        } else if(parseInt(e.target.dataset.index)==0){
          _this.obj.startDate=_this.get_unix_time(_this.$tool.date.format(new Date(), '2019-5-24'))
          _this.obj.endDate=_this.get_unix_time(date)
          _this.datezes=[]
          this.datezes.push(date.split(" ")[0])
          for(let i=1;i<12;i++){
            this.datezes.push(_this.getPreMonth(date).split(" ")[0])
            date=_this.getPreMonth(date)
           }
           }

        // this.drawLine()
       _this.getData();
      },
      getList (val){
        this.pageIndex = val;
        this.getData();
      },
    getPreMonth(date) {
     var arr = date.split('-');
     var year = arr[0]; //获取当前日期的年份  
     var month = arr[1]; //获取当前日期的月份  
     var day = arr[2]; //获取当前日期的日 
     var days = new Date(year, month, 0);
     days = days.getDate(); //获取当前日期中月的天数 
    var year2 = year;
    var month2 = parseInt(month) - 1;
    if (month2 == 0) {
      year2 = parseInt(year2) - 1;
      month2 = 12;
    }
    var day2 = day;
    var days2 = new Date(year2, month2, 0);
    days2 = days2.getDate();
    if (day2 > days2) {
      day2 = days2;
    }
    if (month2 < 10) {
      month2 = '0' + month2;
    }
    var t2 = year2 + '-' + month2 + '-' + day2;
    return t2;
  },
      getMyDate(str) {
        var oDate = new Date(str),
          oYear = oDate.getFullYear(),
          oMonth = oDate.getMonth()+1,
          oDay = oDate.getDate(),
          oHour = oDate.getHours(),
          oMin = oDate.getMinutes(),
          oSen = oDate.getSeconds(),
          // oTime = oYear +'-'+ this.addZero(oMonth) +'-'+ this.addZero(oDay) +' '+ this.addZero(oHour) +':'+
          //   this.addZero(oMin) +':'+this.addZero(oSen);
        oTime = oYear +'-'+ this.addZero(oMonth) +'-'+ this.addZero(oDay)
        return oTime;
      },
      addZero(num){
    if(parseInt(num) < 10){
      num = '0'+num;
    }
    return num;
     },
      dateze(){
        var _this=this
        let date=_this.$tool.date.format(new Date(), 'yyyy-MM-dd hh:mm:ss')
        this.datezes.push(date.split(" ")[0])
        for(let i=1;i<12;i++){
          this.datezes.push(_this.getPreMonth(date).split(" ")[0])
          date=_this.getPreMonth(date)
        }


      },
      drawLine(){
        var _this=this
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        console.log(_this.datezes)
          myChart.setOption({
          title: {
            show:true,
            text: '收入统计折线图'
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            data:['人民币收入','商城消费收入','许愿收入','认证收入','毛利润']
          },
          grid: {
            left: 0,
            right: 0,
            bottom: '3%',
            containLabel: true,
            width:"auto"
          },

          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            // axisTick: {length:5},
            axisLabel: {
              interval: 0,
              rotate:60
            },
            data: _this.datezes,
          },
          yAxis: {
            type: 'value',
          },
          series: [
            {
              name:'人民币收入',
              type:'line',
              stack: '总量',
            },
            {
              name:'商城消费收入',
              type:'line',
              stack: '总量',
              data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
              name:'许愿收入',
              type:'line',
              stack: '总量',
              data:[150, 232, 201,0 , 190, 330, 410]
            },
            {
              name:'认证收入',
              type:'line',
              stack: '总量',
              data:[320, 332, 301, 334, 390, 330, 320]
            },
            {
              name:'毛利润',
              type:'line',
              stack: '总量',
              data:[820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
      })
        window.onresize = myChart.resize;
        // document.getElementById('myChart').resize(myChart.resize)
      }

    },


    created() {
    },
    mounted () {
      this.id=this.$route.query.id
      this.dateze()
      // this.drawLine()
      let date=this.$tool.date.format(new Date(), 'yyyy-MM-dd hh:mm:ss')
     this.obj.startDate=this.get_unix_time(this.$tool.date.format(new Date(), '2019-5-24'))
      this.obj.endDate=this.get_unix_time(date)
      this.getData();
    }
  }
</script>
<style lang="scss" scoped>
  @import "@/assets/css/index.scss";
  .cont_head{
    height:50px;
    width:100%;
    background:#EEEEEE;
  }
  .container{
    padding: 25px 22px;
    background-color: $cont_bgcolor;
    padding-bottom:100px;
  }
  span{
    margin-right: 30px;
    cursor: pointer;
  }
  .yangshi{
    display: inline-block;
    font-size: 18px;
  }
  .ac{
    color: red;
  }
 </style>

