<template>
  <div id="verbal">
    <!-- 添加阶段或子阶段 -->
    <Modal v-model="modal2" width="360">
      <p slot="header" style="text-align:left">
        <span>添加阶段</span>
      </p>
      <div style="text-align:left">
        <Input placeholder="请输入阶段名" v-model="verbalName" />
      </div>
      <div slot="footer">
        <Button type="default" @click="cancel1">取消</Button>
        <Button type="primary" :loading="modal_loading" @click="addVerbalTrick">保存</Button>
      </div>
    </Modal>
    <Modal v-model="modalChild" width="360">
      <p slot="header" style="text-align:left">
        <span>添加子阶段</span>
      </p>
      <div style="text-align:left">
        <Input placeholder="请输入阶段名" v-model="childObj.stageName" />
      </div>
      <div slot="footer">
        <Button type="default" @click="cancel2">取消</Button>
        <Button type="primary" :loading="modal_loading" @click="addChildVerbalTrick">保存</Button>
      </div>
    </Modal>
    <!-- 编辑阶段或子阶段 -->
    <Modal v-model="modal3" width="360">
      <p slot="header" style="text-align:left">
        <span>编辑阶段</span>
      </p>
      <div style="text-align:left">
        <Input placeholder="请输入阶段名" v-model="item.verbalName" />
      </div>
      <div slot="footer">
        <Button type="default" @click="modal3 = false">取消</Button>
        <Button type="primary" :loading="modal_loading" @click="editVerbalTrick">保存</Button>
      </div>
    </Modal>
    <Modal v-model="modal3Child" width="360">
      <p slot="header" style="text-align:left">
        <span>编辑子阶段</span>
      </p>
      <div style="text-align:left">
        <Input placeholder="请输入子阶段名" v-model="itemChild.stageName" />
      </div>
      <div slot="footer">
        <Button type="default" @click="modal3Child = false">取消</Button>
        <Button type="primary" :loading="modal_loading" @click="editChildVerbalTrick">保存</Button>
      </div>
    </Modal>
    <!-- 删除阶段或子阶段 -->
    <Modal v-model="deleteModal" width="360">
      <p slot="header" style="text-align:left">
        <span>删除阶段</span>
      </p>
      <div style="text-align:left">
        <span style="font-size:18px;">确认删除{{ mName }}么？</span>
      </div>
      <div slot="footer">
        <Button type="default" @click="deleteModal = false">取消</Button>
        <Button type="error" :loading="modal_loading" @click="deleteVerbalTrick">删除</Button>
      </div>
    </Modal>
    <Modal v-model="deleteModalChild" width="360">
      <p slot="header" style="text-align:left">
        <span>删除子阶段</span>
      </p>
      <div style="text-align:left">
        <span style="font-size:18px;">确认删除{{ itemChild.stageName }}么？</span>
      </div>
      <div slot="footer">
        <Button type="default" @click="deleteModalChild = false">取消</Button>
        <Button type="error" :loading="modal_loading" @click="deleteChildVerbalTrick">删除</Button>
      </div>
    </Modal>
    <!-- 显示阶段与子阶段 -->
    <Select v-model="moment" @on-change="select" style="width:200px">
      <Option v-for="(item,index) in momentList" :value="item.id" :key="item.id">
        {{ item.verbalName }}
        <Icon @click.stop="toDelete(item)" type="ios-trash" style="float:right;color:red;" />
        <Icon @click.stop="toEdit(item)" type="md-create" style="float:right;color:mediumblue;" />
        <!-- 话术阶段下移 -->
        <Icon
          v-if="index!=momentList.length-1"
          @click.stop="down(item)"
          type="md-arrow-down"
          style="float:right;color:black"
        />
        <!-- 话术阶段上移 -->
        <Icon
          v-if="index!=0"
          @click.stop="up(item)"
          type="md-arrow-round-up"
          style="float:right;color:orange"
        />
      </Option>
      <Button
        type="primary"
        @click="modal2 = true"
        style="height:30px;margin:20px auto 0;display:block;"
      >新增阶段</Button>
    </Select>
    <Select
      v-model="momentChild"
      v-if="momentList.length>0"
      @on-change="selectChild"
      style="width:200px"
    >
      <Option v-for="(item,index) in momentChildList" :value="item.id" :key="item.id">
        {{ item.stageName }}
        <Icon @click.stop="toDeleteChild(item)" type="ios-trash" style="float:right;color:red;" />
        <Icon
          @click.stop="toEditChild(item)"
          type="md-create"
          style="float:right;color:mediumblue;"
        />
        <!-- 小阶段下移 -->
        <Icon
          v-if="index!=momentChildList.length-1"
          @click.stop="downSmall(item)"
          type="md-arrow-down"
          style="float:right;color:black"
        />
        <!-- 小阶段上移 -->
        <Icon
          v-if="index!=0"
          @click.stop="upSmall(item)"
          type="md-arrow-round-up"
          style="float:right;color:orange"
        />
      </Option>
      <Button
        type="primary"
        @click="modalChild = true"
        style="height:30px;margin:20px auto 0;display:block;"
      >新增子阶段</Button>
    </Select>
    <br />
    <br />
    <!-- 显示节点列表 -->
    <nodeList
      :nodeList="nodeListData"
      :verbalTrickId="verbalTrickId"
      :momentChild="momentChild"
      :type="type"
      @changeNodeList="changeNodeList"
      @changeList="changeList"
      :verbalTrickManagement="this"
    ></nodeList>
    <router-view></router-view>
  </div>
</template>
<script>
import nodeList from "./nodeList";
export default {
  name: "verbalTrickManagement",
  components: {
    nodeList
  },
  data() {
    return {
      modalChild: false, //是否显示添加子阶段模态框
      childObj: {},
      modal3Child: false,
      itemChild: {},
      deleteModalChild: false,
      type: "",
      choiceId: "",
      handle: 1,
      nodeCss: {
        "background-color": "white",
        width: "255px",
        height: "76px",
        "margin-left": "6px",
        "margin-top": "10px",
        position: "relative"
      },
      isShowTask1: true,
      isShowTask2: true,
      isShowTaskAdd: false,
      isShowTaskEdit: false,
      modelAdd: false,
      modelEdit: false,
      number: 0,
      resource: [],
      item: {}, // 编辑阶段
      mName: "", // 用于删除时展示阶段名称
      dId: "", // 删除阶段的ID
      moment: "", // 选中的阶段
      momentList: [], // 阶段列表
      momentChild: "",
      momentChildList: [],
      verbalName: "",
      modal2: false,
      deleteModal: false,
      modal3: false,
      modal_loading: false,
      treeNode: [],
      Nodes: [],
      nodeListData: [],
      index1: "",
      creatTime: "",
      verbalTrickId: "",
      upId: "",
      type: false
    };
  },
  watch: {
    $route: function(to, from) {
      console.log(from);
      console.log("add.from",from.query.upId)
      console.log("add.from",from.query.index)
      if (from.name == "addnode") {
        if (from.query.upId) {
          this.upId = from.query.upId;
          this.getVerbalTrickNodeList(from.query.index);
        } else {
          this.upId = "";
          this.getVerbalTrickNodeList(0);
        }
      }
      if (from.name == "editnode") {
        console.log(from.query)
        console.log("edit.upId",from.query.upId);
        console.log("edit.from",from.query.index1);
        console.log(this.index1);
        if (from.query.upId) {
          this.upId = from.query.upId;
          this.getVerbalTrickNodeList(from.query.index1);
        } else {
          this.upId = "";
          this.getVerbalTrickNodeList(0);
        }
      }
    }
  },
  mounted() {
    this.getMoment(true);
  },
  methods: {
    changeList(obj) {
      console.log("obj",obj)
      this.index1 = obj.level;
      this.Nodes = obj.nodeList;
      console.log("this.nodes", this.Nodes);
      if (obj.upId) {
        this.upId = obj.upId;
        this.getVerbalTrickNodeList(this.index1);
      } else {
        this.upId = "";
        this.getVerbalTrickNodeList(0);
      }
    },
    //话术阶段上移
    up(item) {
      console.log(item);
      let obj = {};
      obj.verbalId = item.id;
      obj.type = 1;
      this.$axios.post("/api/verbalTrick/sortVerbalNode", obj).then(res => {
        this.getMoment(true);
      });
    },
    //话术阶段下移
    down(item) {
      console.log(item);
      let obj = {};
      obj.verbalId = item.id;
      obj.type = 2;
      this.$axios.post("/api/verbalTrick/sortVerbalNode", obj).then(res => {
        this.getMoment(true);
      });
    },
    //小阶段上移
    upSmall(item) {
      console.log(item);
      let obj = {};
      obj.id = item.id;
      obj.type = 1;
      this.$axios
        .post("/api/verbalTrickStage/sortVerbalStage", obj)
        .then(res => {
          this.getMomentChild();
        });
    },
    //小阶段下移
    downSmall(item) {
      console.log(item);
      let obj = {};
      obj.id = item.id;
      obj.type = 2;
      this.$axios
        .post("/api/verbalTrickStage/sortVerbalStage", obj)
        .then(res => {
          this.getMomentChild();
        });
    },
    changeNodeList(obj) {
      this.index1 = obj.level;
      this.Nodes = obj.nodeList;
      console.log("index1");
      console.log("Nodes", this.Nodes);
    },
    // 编辑话术阶段
    editVerbalTrick() {
      const self = this;
      this.modal_loading = true;
      this.$axios
        .post("/api/verbalTrick/editVerbalTrick", {
          id: self.item.id,
          verbalName: self.item.verbalName
        })
        .then(res => {
          this.modal_loading = false;
          if (res.data.code === 0) {
            this.$Message.success(res.data.msg);
            this.modal3 = false;
            this.getMoment(true);
          } else {
            this.$Message.error(res.data.msg);
          }
        });
    },
    editChildVerbalTrick() {
      this.modal_loading = true;
      this.$axios
        .post("/api/verbalTrickStage/editVerbalTrickStage", {
          id: this.itemChild.id,
          stageName: this.itemChild.stageName
        })
        .then(res => {
          this.modal_loading = false;
          if (res.data.code === 0) {
            this.$Message.success(res.data.msg);
            this.modal3Child = false;
            this.getMoment(true);
          } else {
            this.$Message.error(res.data.msg);
          }
        });
    },
    // 点击编辑阶段图表
    toEdit(item) {
      this.modal3 = true;
      this.item = item;
      let body = document.getElementsByTagName("body")[0];
      body.click();
    },
    toEditChild(item) {
      this.modal3Child = true;
      this.itemChild = item;
      let body = document.getElementsByTagName("body")[0];
      body.click();
    },
    select(e) {
      console.log(e);
      this.verbalTrickId = e;
      this.moment = e;
      this.getMomentChild();
    },
    selectChild(e) {
      this.momentChild = e;
      this.getVerbalTrickNodeList(0, 1);
    },

    // api/verbalTrick/deleteVerbalTrick 删除话术阶段
    deleteVerbalTrick() {
      const self = this;
      this.modal_loading = true;
      this.$axios
        .post("/api/verbalTrick/deleteVerbalTrick", { id: self.dId })
        .then(res => {
          this.modal_loading = false;
          if (res.data.code === 0) {
            this.$Message.success(res.data.msg);
            this.deleteModal = false;
            this.getMoment(true);
          } else {
            this.$Message.error(res.data.msg);
          }
        });
    },
    //删除话术子阶段
    deleteChildVerbalTrick() {
      this.modal_loading = true;
      this.$axios
        .post("/api/verbalTrickStage/deleteVerbalTrickStage", {
          id: this.itemChild.id
        })
        .then(res => {
          this.modal_loading = false;
          if (res.data.code === 0) {
            this.$Message.success(res.data.msg);
            this.deleteModalChild = false;
            this.getMomentChild();
          } else {
            this.$Message.error(res.data.msg);
          }
        });
    },
    // 点击删除阶段图表
    toDelete(item) {
      this.deleteModal = true;
      this.dId = item.id;
      this.mName = item.verbalName;
      let body = document.getElementsByTagName("body")[0];
      body.click();
    },
    toDeleteChild(item) {
      this.deleteModalChild = true;
      this.itemChild = item;
      let body = document.getElementsByTagName("body")[0];
      body.click();
    },
    // 增加话术阶段
    addVerbalTrick() {
      this.modal_loading = true;
      const self = this;
      this.$axios
        .post("/api/verbalTrick/addVerbalTrick", {
          verbalName: self.verbalName
        })
        .then(res => {
          this.modal_loading = false;
          if (res.data.code === 0) {
            this.$Message.success(res.data.msg);
            this.modal2 = false;
            this.getMoment();
            this.verbalName = "";
          } else {
            this.$Message.error(res.data.msg);
          }
        });
    },
    cancel1() {
      this.verbalName = "";
      this.modal2 = false;
    },
    // 增加话术子阶段
    addChildVerbalTrick() {
      this.modal_loading = true;
      const self = this;
      this.$axios
        .post("/api/verbalTrickStage/addVerbalTrickStage", {
          stageName: self.childObj.stageName,
          verbalId: self.moment
        })
        .then(res => {
          this.modal_loading = false;
          if (res.data.code === 0) {
            this.$Message.success(res.data.msg);
            this.modalChild = false;
            this.childObj.stageName = "";
            this.getMomentChild();
          } else {
            this.$Message.error(res.data.msg);
          }
        });
    },
    cancel2() {
      this.childObj.stageName = "";
      this.modalChild = false;
    },
    // 查询话术阶段列表,参数代表是否选中第一个阶段
    getMoment(i) {
      this.$axios.post("api/verbalTrick/getVerbalTrickList", {}).then(res => {
        console.log(res);
        this.momentList = res.data.data;
        if (i) {
          if (this.momentList.length > 0) {
            this.moment = this.momentList[0].id;
            this.verbalTrickId = this.momentList[0].id;
            this.getMomentChild();
          }
        }
      });
    },

    //获取话术子阶段
    getMomentChild() {
      this.$axios
        .post("api/verbalTrickStage/getVerbalTrickStageList", {
          verbalId: this.moment
        })
        .then(res => {
          this.momentChildList = res.data.data;
          if (res.data.data.length > 0) {
            this.momentChild = this.momentChildList[0].id;
            this.getVerbalTrickNodeList(0, 1);
          }
        });
    },
    // 查询话术节点列表
    getVerbalTrickNodeList(index, type) {
      let obj = {
        verbalTrickId: this.moment,
        stageId: this.momentChild
      };
      if (type == 1) {
        this.upId = "";
      }
      if (this.upId) {
        obj.upId = this.upId;
      }
      this.$axios
        .post("api/verbalTrickNode/getVerbalTrickNodeList", obj)
        .then(res => {
          console.log("hahahah", index);
          if (this.upId) {
            res.data.data.upId = this.upId;
          }
          if (type == 1) {
            this.Nodes = [];
            this.type = true; //判断是否是切换阶段
          } else {
            this.type = false;
          }
          this.Nodes[index] = res.data.data;
          // if (res.data.data.length > 0) {
          // } else {
          //   this.creatTime = "";
          // }
          this.$set(this.nodeListData, this.Nodes);
          this.nodeListData = this.Nodes;
          this.nodeListData = JSON.parse(JSON.stringify(this.nodeListData));
          console.log("Nodes111111", this.nodeListData);
        });
    },
    getNodes() {
      if (this.moment) {
        this.nodes.verbalTrickId = this.moment;
        this.verbalTrickId = this.moment;
      }
    }
  }
};
</script>
<style >
#verbal .ivu-modal-body {
  height: 500px;
  overflow-y: scroll;
}
.nodeCss {
  background-color: rgba(161, 181, 255, 0.698039215686274);
  width: 255px;
  height: 76px;
  margin-left: 6px;
  margin-top: 10px;
  position: relative;
}
.nodeCss1 {
  background-color: white;
  width: 255px;
  height: 76px;
  margin-left: 6px;
  margin-top: 10px;
  position: relative;
}
</style>
