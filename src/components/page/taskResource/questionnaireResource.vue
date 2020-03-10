<template>
  <div>
    <Modal v-model="model1" width="360">
      <div style="text-align:center;margin-top:30px">
        <p style="font-size:20px;margin-bottom:5px">是否删除该条记录？</p>
        <p style="color:#104E8B">删除后不可恢复</p>
      </div>
      <div slot="footer" style="text-align:center">
        <Button style="width:100px" type="error" @click="ok">删除</Button>
        <Button style="width:100px" @click="cancel">取消</Button>
      </div>
    </Modal>
    <Row>
      <Col span="4">
        <Button type="primary" @click="addQuestionnaire">新增</Button>
      </Col>
    </Row>
    <br />
    <Table border :columns="columns1" :data="data1">
      <template slot-scope="{ row, index }" slot="edit">
        <a
          size="small"
          type="primary"
          @click="toEdit(row.id)"
          style="margin-top:2px;width:60px;color:blue;padding-right:10px"
        >编辑</a>
        <a
          size="small"
          type="primary"
          @click="Delete(row.id)"
          style="margin-top:2px;width:60px;color:blue"
        >删除</a>
      </template>
    </Table>
    <br />
    <Row>
      <Col span="24" style="text-align:right;">
        <Page
          :total="total"
          :current="page"
          :page-size="pageSize"
          show-total
          show-sizer
          show-elevator
          @on-change="changePage"
          @on-page-size-change="changePageSize"
        ></Page>
      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  name: "questionnaireResource",
  data() {
    return {
      page: 1,
      pageSize: 10,
      model1: false,
      deleteId: "",
      columns1: [
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
          title: "问卷标题",
          key: "title",
          align: "center"
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "center"
        },
        {
          title: "操作",
          align: "center",
          slot: "edit"
        }
      ],
      data1: [],
      total: 0
    };
  },
  methods: {
    getQuestion() {
      this.$axios
        .post("api/evaluation/getEvaluationList", {
          page: this.page,
          pageSize: this.pageSize
        })
        .then(res => {
          console.log(res);
          this.total = res.data.data.total;
          this.data1 = res.data.data.records;
        });
    },
    Delete(id) {
      this.model1 = true;
      this.deleteId = id;
    },
    addQuestionnaire() {
      this.$router.push("questionnaireAdd");
    },
    changePage(page) {
      this.page = page;
      this.getQuestion();
    },
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.getQuestion();
    },
    ok() {
      let deleteId = this.deleteId;
      this.$axios
        .post("api/evaluation/deleteEvaluation", { evaluationId: deleteId })
        .then(res => {
          this.$Message.success("删除成功！");
          this.model1 = false;
          this.getQuestion();
        });
    },
    cancel() {
      this.$Message.info("用户点击了取消");
      this.model1 = false;
    },
    toEdit(id) {
      this.$router.push({
        path: "/questionnaireEdit",
        query: {
          evaluationId: id
        }
      });
    }
  },
  mounted() {
    this.getQuestion();
  }
};
</script>
<style lang="">
</style>
