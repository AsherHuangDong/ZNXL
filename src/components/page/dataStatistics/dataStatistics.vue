<template>
  <div>
    <Row>
      <Col span="11">
        <Card>
          <p slot="title">用户统计</p>
          <div class="personNum">
            <p>
              <span>{{loginCount.userNumber}}</span>
              <span>用户人数</span>
            </p>
            <p>
              <span>{{loginCount.userCount}}</span>
              <span>使用人数</span>
            </p>
          </div>
        </Card>
      </Col>
      <Col span="11" offset="2">
        <Card dis-hover>
          <p slot="title">最近登录</p>
          <p v-for="(item,index) in loginCount.loginList" :key="index" class="login-list">
            <span>{{item.userName}}</span>
            <span>{{item.userEmail}}</span>
            <span>{{item.loginTime}}</span>
          </p>
        </Card>
      </Col>
    </Row>
    <br />
    <Row>
      <Col span="24">
        <Card>
          <p slot="title">练习评价</p>
          <Table border :columns="columns" :data="evaluationCount"></Table>
          <br />
          <div style="text-align:center;">
            <Page
              :total="total"
              :current="page"
              :page-size="pageSize"
              show-total
              show-sizer
              show-elevator
              @on-change="changePage"
              @on-page-size-change="changePageSize"
            />
          </div>
        </Card>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  name: "dataStatistics",
  data() {
    return {
      page: 1,
      pageSize: 10,
      total: 0,
      evaluationCount: [],
      loginCount: {},
      columns: [
        {
          title: "序号",
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              params.index + (this.page - 1) * this.pageSize + 1
            );
          }
        },
        {
          title: "练习内容",
          key: "resourceName",
          align: "center"
        },
        {
          title: "类型",
          key: "resourceType",
          align: "center",
          render: function(h, param) {
            return h(
              "div",
              {},
              param.row.resourceType == 1
                ? "音频"
                : param.row.resourceType == 2
                ? "视频"
                : param.row.resourceType == 3
                ? "电子书"
                : param.row.resourceType == 4
                ? "问卷"
                : param.row.resourceType == 5
                ? "表单"
                : ""
            );
          }
        },
        {
          title: "完成人数",
          key: "peopleNumber",
          align: "center"
        },
        {
          title: "完成人次",
          key: "peopleCount",
          align: "center"
        },
        {
          title: "平均评价",
          key: "averageComment",
          align: "center"
        }
      ]
    };
  },
  methods: {
    changePage(page) {
      this.page = page;
      this.getEvaluationCount;
    },
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.getEvaluationCount();
    },
    //数据统计-用户统计,最近登录
    getLoginCount() {
      this.$axios.post("api/user/getLoginCount").then(res => {
        this.loginCount = res.data.data;
      });
    },
    //数据统计-练习评价
    getEvaluationCount() {
      this.$axios
        .post("api/user/getEvaluationCount", {
          page: this.page,
          pageSize: this.pageSize
        })
        .then(res => {
          this.evaluationCount = res.data.data.recordList;
          this.total = res.data.data.total;
        });
    }
  },
  mounted() {
    this.getLoginCount();
    this.getEvaluationCount();
  }
};
</script>
<style>
.personNum {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-bottom: 38px;
  padding-top: 20px;
}
.personNum p {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.personNum p span {
  padding-top: 30px;
}
.personNum p span:nth-of-type(1) {
  font-size: 30px;
}
.personNum p span:nth-of-type(2) {
  padding-top: 10px;
}
.login-list {
  display: flex;
  justify-content: space-between;
  padding-top: 20px;
}
</style>