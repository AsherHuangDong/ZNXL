<template>
  <div>
    <Row>
      <Col span="12">
        <span>邮箱</span>
        <Input style="width:200px;" v-model="userEmail"></Input>
      </Col>
      <Col span="12" style="text-align:right;">
        <Button type="primary" style="margin-right:10px" @click="getList">搜索</Button>
        <Dropdown style="margin-left: 10px;text-align:left" @on-click="selectQuestion" trigger="click">
          <Button type="success" @click="outExcel">导出问卷数据</Button>
          <DropdownMenu slot="list">
            <p style="color:#3399FF">咨询过程问卷结果</p>
            <DropdownItem v-for="item in questionList" :key="item.id" :name="item.id">{{item.title}}</DropdownItem>
          </DropdownMenu>
          <DropdownMenu slot="list">
            <p style="color:#3399FF">用户自主练习问卷结果</p>
            <DropdownItem
              v-for="item1 in questionList"
              :key="item1.id"
              :name="item1.id + 'i'"
            >{{item1.title}}</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Col>
    </Row>
    <br />
    <Row>
      <Table border :columns="columns" :data="list"></Table>
    </Row>
    <br />
    <Row>
      <Col span="24" style="text-align:right;">
        <Page
          :total="total"
          show-total
          show-sizer
          show-elevator
          :loading="loading"
          :current="page"
          :page-size="pageSize"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
        />
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  name: "userManagement",
  data() {
    let _this = this;
    return {
      loading: false,
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
          title: "昵称",
          key: "userName",
          align: "center"
        },
        {
          title: "注册邮箱",
          key: "userEmail",
          align: "center"
        },
        {
          title: "首次使用时间",
          key: "createTime",
          align: "center"
        },
        {
          title: "操作",
          align: "center",
          render: function(h, param) {
            return h(
              "a",
              {
                style: {
                  color: "#00C1DE"
                },
                on: {
                  click: () => {
                    _this.$router.push({
                      path: "/userdetail",
                      query: {
                        id: param.row.id
                      }
                    });
                  }
                }
              },
              "查看详情"
            );
          }
        }
      ],
      list: [],
      page: 1,
      pageSize: 10,
      userEmail: "",
      total: 0,
      idList: [],
      questionList: []
    };
  },
  methods: {
    changePage(page) {
      this.page = page;
    },
    changePageSize(pageSize) {
      this.pageSize = pageSize;
    },
    getList() {
      this.loading = true;
      let obj = {
        page: this.page,
        pageSize: this.pageSize
      };
      if (this.userEmail) {
        obj.userEmail = this.userEmail;
      }
      this.$axios.post("api/user/getUserList", obj).then(res => {
        this.loading = false;
        this.list = res.data.data.records;
        this.total = res.data.data.total;
      });
    },
    //导出问卷数据
    outExcel() {
      this.$axios
        .post("api/evaluation/getEvaluationList", { page: 1, pageSize: 100 })
        .then(res => {
          if (res.data.code == 0) {
            this.questionList = res.data.data.records;
          } else {
            this.$Message.error(res.data.msg);
          }
        });
    },
    selectQuestion(e) {
      console.log("e", e);
      console.log("e", typeof e);
      if (typeof e == "number") {
        let m = ''
        m = String(e)
        this.$axios.post("/api/evaluation/exportNodeToExcel",{evaluationId:m}).then(res=>{
          console.log(res)
          if(res.data.code == 0){
            console.log(JSON.stringify(res.data.data))
            if(JSON.stringify(res.data.data)!=='{}'){
              console.log('fffff')
              window.location.href = res.data.data.path;
            }else{
              this.$Message.info('暂无问卷列表')
            }
          }else{
            this.$Message.error(res.data.msg)
          }
        })
      }
      if (typeof e == "string") {
        let n = ''
        n = e.replace(/i$/,'');
        this.$axios.post("/api/evaluation/exprotEvaluationToExcel",{evaluationId:n}).then(res=>{
          console.log(res)
          console.log(res)
          if(res.data.code == 0){
            console.log(JSON.stringify(res.data.data))
            if(JSON.stringify(res.data.data)!=='{}'){
              console.log('fffff')
              window.location.href = res.data.data.path;
            }else{
              this.$Message.info('暂无问卷列表')
            }
          }else{
            this.$Message.error(res.data.msg)
          }
        })
      }
    }
  },
  mounted() {
    this.getList();
  }
};
</script>
<style lang="">
</style>