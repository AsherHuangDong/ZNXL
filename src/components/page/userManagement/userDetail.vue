<template>
  <div>
    <Row>
      <Col span="24">
        <Card>
          <p slot="title">基本信息</p>
          <p class="row1">
            <span>用户昵称：{{userInfo.userName}}</span>
            <span>性别：{{userInfo.sex==1?'男':'女'}}</span>
            <span>单位：{{userInfo.unit}}</span>
            <span>职级：{{userInfo.rank==1?'普通':userInfo.rank==2?'处级':userInfo.rank==3?'局级':userInfo.rank==4?'局级以上':''}}</span>
            <span>职称：{{userInfo.jobTitle==1?'其他':userInfo.jobTitle==2?'中级':userInfo.jobTitle==3?'副高':userInfo.jobTitle==4?'正高':''}}</span>
          </p>
          <p class="row2">
            <span>岗位类型：{{userInfo.jobType==1?'科研':userInfo.jobType==2?'管理':userInfo.jobType==3?'支撑':'columns'}}</span>
            <span>婚姻状况：{{userInfo.marriage==1?'未婚':userInfo.marriage==2?'已婚':userInfo.marriage==3?'离异':userInfo.marriage==4?'丧偶':''}}</span>
            <span>子女状况：{{userInfo.child==1?'无':userInfo.child==2?'一个子女':userInfo.child==3?'两个子女':userInfo.child==4?'两个以上':''}}</span>
            <span>年收入：{{userInfo.income==1?'15万以下':userInfo.income==2?'15-30万':userInfo.income==3?'30-50万':userInfo.income==4?'50-70万':userInfo.income==5?'70-100万':userInfo.income==6?'100万以上':''}}</span>
            <span>注册邮箱：{{userInfo.userEmail}}</span>
          </p>
        </Card>
      </Col>
    </Row>
    <br />
    <Row>
      <Col span="24">
        <Card>
          <p>
            <strong>当前所处阶段：</strong>
            {{finished.breakVerbalName}}
          </p>
          <p style="padding-top:20px;">
            <span>
              <strong>中断练习：</strong>
              {{finished.breakResourceName}}
            </span>
            <span style="padding-left:60px;">
              <strong>类型：</strong>
              {{finished.breakResourceType==1?'音频':finished.breakResourceType==2?'视频':finished.breakResourceType==3?'电子书':finished.breakResourceType==4?'问卷':finished.breakResourceType==5?'表单':''}}
            </span>
            <span style="padding-left:60px;">
              <strong>中断时间：</strong>
              {{finished.breakTime}}
            </span>
          </p>
        </Card>
      </Col>
    </Row>
    <br />
    <Row>
      <Col span="24">
        <Card>
          <p slot="title" style="display:flex;justify-content: space-between;">
            已完成练习（{{total}}）
            <span>评价平均得分：4.0</span>
          </p>
          <Table border :columns="columns" :data="list"></Table>
          <br />
          <div style="text-align:right;">
            <Page :total="total" :current="page" show-total @on-change="changePage" />
          </div>
        </Card>
      </Col>
    </Row>
    <br />
    <Row>
      <Col span="24">
        <Card style="overflow-x:scroll;min-height:100px">
          <p slot="title">问卷结果比较（{{data2.length}}）</p>
          <div v-if="data2.length==0">还没有结果</div>
          <div v-if="data2.length!=0">
            <Select
              v-model="evaluationId"
              placeholder="请选择"
              style="width:200px"
              @on-change="select"
            >
              <Option
                v-for="item in data2"
                :key="item.evaluationId"
                :value="item.evaluationId"
              >{{item.evaluationName}}</Option>
            </Select>
            <br />
            <div id="resultCompare" style="width:100%;height:300px"></div>
          </div>
        </Card>
      </Col>
    </Row>
    <br />
    <Row>
      <Col span="24">
        <Card style="overflow-x:scroll">
          <p slot="title">问卷测评结果（{{data1.length}}）</p>
          <div v-if="data1.length==0">还没有结果</div>
          <Table v-if="data1.length!=0" :columns="columns1" :data="data1"></Table>
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  name: "userDetail",
  data() {
    return {
      id: "",
      page: 1,
      pageSize: 10,
      total: 0,
      list: [],
      userInfo: {},
      finished: {},
      columns: [
        {
          title: "序号",
          type: "index",
          align: "center"
        },
        {
          title: "练习内容",
          key: "practiceMap.resourceName",
          align: "center",
          render: function(h, param) {
            return h("div", {}, param.row.practiceMap.resourceName);
          }
        },
        {
          title: "类型",
          key: "type",
          align: "center",
          render: function(h, param) {
            return h(
              "div",
              {},
              param.row.type == 1
                ? "音频"
                : param.row.type == 2
                ? "视频"
                : param.row.type == 3
                ? "电子书"
                : param.row.type == 4
                ? "问卷"
                : param.row.type == 5
                ? "表单"
                : param.row.type == 6
                ? "小游戏"
                : ""
            );
          }
        },
        {
          title: "评价",
          key: "userEmail",
          align: "center"
        },
        {
          title: "阶段",
          key: "practiceMap.verbalName",
          align: "center",
          render: function(h, param) {
            return h("div", {}, param.row.practiceMap.verbalName);
          }
        },
        {
          title: "用时",
          key: "practiceMap.usedTime",
          align: "center",
          render: function(h, param) {
            return h("div", {}, param.row.practiceMap.usedTime);
          }
        },
        {
          title: "完成时间",
          key: "practiceMap.endTime",
          align: "center",
          render: function(h, param) {
            return h("div", {}, param.row.practiceMap.endTime);
          }
        }
      ],
      data1: [
        {
          evaluationName: "测评",
          resultList: [
            {
              time: "2019-12-03 15:35:41",
              resultExplanList: [
                {
                  score: 6,
                  explan: "编辑维度1解释与建议3",
                  dimensionName: "编辑维度1"
                },
                {
                  score: 4,
                  explan: "维度2解释与建议1",
                  dimensionName: "编辑维度2"
                },
                {
                  score: 5,
                  explan: "维度3解释与建议1",
                  dimensionName: "编辑维度3"
                },
                {
                  score: 0,
                  dimensionName: "维度1"
                }
              ]
            },
            {
              time: "2019-12-03 16:35:41",
              resultExplanList: [
                {
                  score: 6,
                  explan: "编辑维度1解释与建议3",
                  dimensionName: "编辑维度1"
                },
                {
                  score: 4,
                  explan: "维度2解释与建议1",
                  dimensionName: "编辑维度2"
                },
                {
                  score: 5,
                  explan: "维度3解释与建议1",
                  dimensionName: "编辑维度3"
                },
                {
                  score: 0,
                  dimensionName: "维度1"
                }
              ]
            },
            {
              time: "2019-12-03 17:35:41",
              resultExplanList: [
                {
                  score: 6,
                  explan: "编辑维度1解释与建议3",
                  dimensionName: "编辑维度1"
                },
                {
                  score: 4,
                  explan: "维度2解释与建议1",
                  dimensionName: "编辑维度2"
                },
                {
                  score: 5,
                  explan: "维度3解释与建议1",
                  dimensionName: "编辑维度3"
                },
                {
                  score: 0,
                  dimensionName: "维度1"
                }
              ]
            },
            {
              time: "2019-12-03 18:35:50",
              resultExplanList: [
                {
                  score: 6,
                  explan: "编辑维度1解释与建议3",
                  dimensionName: "编辑维度1"
                },
                {
                  score: 4,
                  explan: "维度2解释与建议1",
                  dimensionName: "编辑维度2"
                },
                {
                  score: 5,
                  explan: "维度3解释与建议1",
                  dimensionName: "编辑维度3"
                },
                {
                  score: 0,
                  dimensionName: "维度1"
                }
              ]
            }
          ]
        },
        {
          evaluationName: "维度31",
          resultList: [
            {
              time: "2019-12-03 20:50:36",
              resultExplanList: [
                {
                  score: 6,
                  explan: "可以",
                  dimensionName: "焦虑"
                },
                {
                  score: 4,
                  explan: "不错",
                  dimensionName: "忧愁"
                }
              ]
            },
            {
              time: "2019-12-03 21:51:39",
              resultExplanList: [
                {
                  score: 8,
                  explan: "可以",
                  dimensionName: "焦虑"
                },
                {
                  score: 5,
                  explan: "不错",
                  dimensionName: "忧愁"
                }
              ]
            }
          ]
        },
        {
          evaluationName: "维度31",
          resultList: [
            {
              time: "2019-12-03 20:50:36",
              resultExplanList: [
                {
                  score: 6,
                  explan: "可以",
                  dimensionName: "焦虑"
                },
                {
                  score: 4,
                  explan: "不错",
                  dimensionName: "忧愁"
                }
              ]
            },
            {
              time: "2019-12-03 21:51:39",
              resultExplanList: [
                {
                  score: 8,
                  explan: "可以",
                  dimensionName: "焦虑"
                },
                {
                  score: 5,
                  explan: "不错",
                  dimensionName: "忧愁"
                }
              ]
            },
            {
              time: "2019-12-03 21:51:39",
              resultExplanList: [
                {
                  score: 8,
                  explan: "可以",
                  dimensionName: "焦虑"
                },
                {
                  score: 5,
                  explan: "不错",
                  dimensionName: "忧愁"
                }
              ]
            },
            {
              time: "2019-12-03 21:51:39",
              resultExplanList: [
                {
                  score: 8,
                  explan: "可以",
                  dimensionName: "焦虑"
                },
                {
                  score: 5,
                  explan: "不错",
                  dimensionName: "忧愁"
                }
              ]
            },
            {
              time: "2019-12-03 21:51:39",
              resultExplanList: [
                {
                  score: 8,
                  explan: "可以",
                  dimensionName: "焦虑"
                },
                {
                  score: 5,
                  explan: "不错",
                  dimensionName: "忧愁"
                }
              ]
            }
          ]
        }
      ],
      columns1: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 50
        },
        {
          title: "问卷",
          key: "evaluationName",
          align: "center",
          width: 100
        }
      ],
      data2: [],
      evaluationId: "",
      data3: {
        userTime: "",
        time: "",
        list: []
      }
    };
  },
  methods: {
    changePage(page) {
      this.page = page;
      this.getFinished();
    },
    getUserInfo() {
      this.$axios
        .post("api/user/getUserInfo", {
          userId: this.id
        })
        .then(res => {
          this.userInfo = res.data.data;
        });
    },
    getFinished() {
      this.$axios
        .post("api/user/getUserVerbal", {
          userId: this.id,
          page: this.page
        })
        .then(res => {
          this.finished = res.data.data;
          this.total = this.finished.userConsultRecordIPage.total;
          this.list = this.finished.userConsultRecordIPage.records;
        });
    },
    //获取问卷结果
    getResult() {
      this.$axios
        .post("api/user/getUserResult", {
          userId: this.id
        })
        .then(res => {
          console.log(res);
          this.data1 = res.data.data;
          this.data2 = res.data.data;
          if (this.data1.length) {
            this.changeTable(this.data1);
          }
        });
    },
    //问卷结果分析
    resultAnalyze(evaluationId, userId) {
      this.$axios
        .post("/api/evaluation/getUserEvaluation", {
          evaluationId: evaluationId,
          userId: userId
        })
        .then(res => {
          this.data3 = res.data.data;
          console.log("data3", this.data3);
          this.getLine();
        });
    },
    changeTable(data1) {
      let max = 0;
      let i = 0;
      data1.forEach((item, index) => {
        if (item.resultList.length > max) {
          max = item.resultList.length;
          i = index;
        }
      });
      console.log(i);
      data1.forEach((item, index) => {
        item.resultList.forEach((item1, index1) => {
          item1.status = "";
          item1.resultExplanList.forEach((item2, index2) => {
            item1.status +=
              "维度名称:" +
              item2.dimensionName +
              " <br>" +
              "得分:" +
              item2.score +
              " <br> " +
              "维度解释:" +
              item2.explan +
              " <br/> " +
              "<br>";
          });
        });
      });
      data1[i].resultList.forEach((item, index) => {
        this.columns1.push({
          title: "第" + (index + 1) + "次测评结果",
          align: "center",
          key: "resultList" + index,
          render: function(h, param) {
            return h("div", {
              domProps: {
                innerHTML: param.row["resultList" + index]
              }
            });
          },
          width: 300
        });
      });
      console.log(this.columns1);
      data1.forEach((item, index) => {
        item.resultList.forEach((item1, index1) => {
          let result = "resultList" + index1;
          item[result] = item1.status;
        });
      });
      console.log("data1", data1);
    },
    //切换结果
    select(e) {
      this.evaluationId = e;
      this.resultAnalyze(this.evaluationId, this.id);
    },
    //画图
    getLine() {
      let self = this;
      let dom = document.getElementById("resultCompare");
      console.log("dom", dom);
      var myChart = this.$echarts.init(
        document.getElementById("resultCompare")
      );
      myChart.clear();
      console.log("this.data3", this.data3);
      // 指定图表的配置项和数据
      console.log("myChart", myChart);
      //x坐标
      let x = [];
      for (let i in this.data3) {
        x.push(String(Number(i) + 1));
      }
      console.log("x", x);
      //充值总额
      var option = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: [],
          bottom: 0
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "10%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: x
        },
        yAxis: {
          type: "value"
        },
        series: []
      };
      option.legend.data = this.data3[0].list.map(function(item){
        return item.dimensionName;
      })
      option.legend.data.forEach(item=>{
        option.series.push({
          name:item,
          type:'line',
          data:[]
        })
      })
      this.data3.forEach(item=>{
        item.list.forEach(item1=>{
          option.series.forEach(item2=>{
            if(item2.name == item1.dimensionName){
              item2.data.push(item1.score)
            }
          })
        })
      })
      console.log("option", option);
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getUserInfo();
    this.getFinished();
    this.getResult();
    //this.changeTable(this.data1);
  }
};
</script>
<style>
.row1,
.row2 {
  display: flex;
  justify-content: space-between;
}
.row2 {
  padding-top: 20px;
}
.row1 span,
.row2 span {
  flex: 1;
}
table,
td,
th {
  border: 1px solid #eee;
}
</style>
