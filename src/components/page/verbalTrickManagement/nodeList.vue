<template>
  <div>
    <!-- 话术详情 -->
    <div style="width:1244px;height:660px;position:relative">
      <div style="height:650px;width:1170px;overflow-x:scroll">
        <div :style="{width:(nodeList.length+1)*290+'px'}" class="nodelist">
          <div
            style="display:inline-block;width:281px;height:641px;background:rgba(225, 230, 241, 1);position:relative;margin-right:5px"
            v-for="(item1,index1) in nodeList"
            :key="index1"
          >
            <div style="overflow-y:scroll;width:281px;height:641px;padding-bottom:80px;">
              <div
                :class="item.choiceId?'nodeCss':'nodeCss1'"
                v-for="(item,index) in item1"
                :key="index"
                @click="choice(index1,item)"
              >
                <div
                  style="overflow: hidden;
                  text-overflow: ellipsis;
                  display: -webkit-box;
                  -webkit-line-clamp: 2;
                  line-clamp: 2;
                  -webkit-box-orient: vertical;"
                >
                  <span
                    style="font-size:13px;color: #333333;padding-left:10px;"
                    v-for="(item1,index1) in item.nodeTextList"
                    :key="index1"
                  >{{removeHTMLTag(item1.content)}}</span>
                </div>

                <div
                  style="position:absolute;bottom:6px;width:100%;display:flex;justify-content: space-between"
                >
                  <span
                    style="color: rgba(89, 101, 151, 0.8);font-size:10px;padding-left:10px;"
                  >触发条件: {{item.term==1?'用户选择':item.term==2?'用户输入':'无'}}</span>
                  <div style="padding-right:5px">
                    <a
                      style="color: #2A60E4;font-size:10px;font-weight:800;padding-right:10px;"
                      @click.stop="gotoDetail(item1,item.id,index1)"
                    >查看详情</a>
                    <a
                      style="color: #2A60E4;font-size:10px;font-weight:800;"
                      @click.stop="copy(item,index1)"
                    >复制</a>
                  </div>
                </div>
              </div>
            </div>

            <div
              style="position:absolute;bottom:20px;left:0;background-color: #fff;width:281px;height:42px;margin-top:10px;text-align:center;border:1px solid black;border-style:dashed;"
            >
              <div style="margin-top:10px" @click="addContent(item1,index1)">
                <a>+新增</a>
              </div>
            </div>

            <div
              style="position:absolute;bottom:0;left:0;width:281px;height:20px;background:#eee;color:#07175D;display:flex;justify-content:space-between;align-items:center;padding-right:10px"
            >
              <span v-if="item1.length!=0">创建于 {{item1[0].createTime}}</span>
              <img
                src="static/img/paste.png"
                @click="paste(item1,index1)"
                style="width:15px;height:15px;cursor:pointer;position:absolute;bottom:0;right:0"
              />
            </div>
          </div>

          <div
            style="display:inline-block;position:relative;width:281px;height:641px;border:1px solid black;border-style:dashed;right:20px;background:#fff;margin-left:20px"
            v-if="isShowBox"
          >
            <Button
              @click="addNodes(nodeList.length)"
              type="primary"
              icon="md-add"
              style="position:absolute;left:50%;top:50%;margin-left:-47px;margin-top:-10px"
            >新增节点</Button>
            <img
              src="static/img/paste.png"
              @click="paste1(nodeList.length)"
              style="width:15px;height:15px;cursor:pointeri;position:absolute;bottom:5px;right:5px;cursor:pointer"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  inject: ["reload"],
  name: "nodelist",
  data() {
    return {
      level: "",
      choiceId: "",
      modelEdit: false,
      isShowBox: true,
      editNode1: {
        editNode1: []
      },
      copyData: {},
      pasteData: {
        verbalTrickId: "",
        upId: "",
        stageId: 1,
        term: 0,
        termValue: "",
        nodeTextList: [
          {
            content: "",
            textOptionList: []
          }
        ],
        taskResourceMap: {
          isComment: 1,
          taskResourceList: []
        }
      },
      upId: "",
      choiceList: [],
      index1: ""
    };
  },
  watch: {
    type(val) {
      if (val) {
        this.isShowBox = false;
      }
    },
    nodeList(value) {
      console.log("value", value);
    }
  },
  props: [
    "nodeList",
    "verbalTrickId",
    "momentChild",
    "type",
    "verbalTrickManagement"
  ],
  methods: {
    choice(index1, item) {
      console.log("choice");
      this.level = index1;
      this.choiceList.push(item.id);
      this.nodeList.forEach((item1, index2) => {
        item1.forEach((item2, index3) => {
          if (item2.id == item.id) {
            item2.choiceId = item.id;
          }
          if (
            item2.choiceId &&
            item2.id != item.id &&
            item2.upId == item.upId
          ) {
            delete item2.choiceId;
          }
        });
      });
      this.$axios
        .post("api/verbalTrickNode/getVerbalTrickNodeList", {
          verbalTrickId: this.verbalTrickId,
          stageId: this.momentChild,
          upId: item.id
        })
        .then(res => {
          console.log("fffff");
          console.log(res);
          if (res.data.data.length > 0) {
            this.isShowBox = false;
            res.data.data.upId = item.id;
            if (this.choiceId != item.id) {
              this.nodeList[index1 + 1] = res.data.data;
            }
            this.nodeList.splice(index1 + 2);
            this.choiceId = item.id;
          } else {
            this.choiceId = item.id;
            this.nodeList.splice(index1 + 1);
            this.isShowBox = true;
          }
          this.$emit("changeNodeList", {
            level: this.level,
            nodeList: this.nodeList
          });
        });
      console.log("choiceList", this.choiceList);
    },
    addContent(item1, index1) {
      console.log("item1", item1);
      let obj = {
        verbalTrickId: this.verbalTrickId,
        momentChild: this.momentChild,
        index: index1
      };
      if (item1.length != 0) {
        if (item1[0].upId != 0) {
          obj.upId = item1[0].upId;
        }
      }
      this.$router.push({
        path: "/addnode",
        query: obj
      });
    },
    addNodes(length) {
      this.$router.push({
        path: "/addnode",
        query: {
          verbalTrickId: this.verbalTrickId,
          momentChild: this.momentChild,
          upId: this.choiceId,
          index: length
        }
      });
      this.isShowBox = false;
    },
    gotoDetail(item1, id, index1) {
      console.log("mmmm");
      console.log("item1", item1);
      let obj = {
        id: id,
        index1: index1
      };
      if (item1[0].upId != 0) {
        obj.upId = item1[0].upId;
      }
      this.$router.push({
        path: "/editnode",
        query: obj
      });
    },
    //移除富文本编辑器的标签
    removeHTMLTag(str) {
      str = str.replace(/<\/?[^>]*>/g, ""); //去除HTML tag
      str = str.replace(/[ | ]*\n/g, "\n"); //去除行尾空白
      //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
      str = str.replace(/ /gi, ""); //去掉
      return str;
    },
    // 复制成功
    copy(item, index1) {
      this.index1 = index1;
      this.$axios
        .post("api/verbalTrickNode/getVerbalTrickNodeList", {
          verbalTrickId: this.verbalTrickId,
          stageId: this.momentChild,
          upId: item.id
        })
        .then(res => {
          console.log("fffff");
          console.log(res);
          if (res.data.data.length > 0) {
            this.isShowBox = false;
            res.data.data.upId = item.id;
            // if (this.choiceId != item.id) {
            //   this.nodeList[index1 + 1] = res.data.data;
            // }
            this.nodeList.splice(index1 + 2);
            this.choiceId = item.id;
          } else {
            this.choiceId = item.id;
            this.nodeList.splice(index1 + 1);
            this.isShowBox = true;
          }
        });
      this.$axios
        .post("api/verbalTrickNode/selectVerbalTrickNode", { nodeId: item.id })
        .then(res => {
          if (res.data.code == 0) {
            this.copyData = res.data.data;
            this.$Message.success("复制成功!");
          } else {
            this.$Message.error(res.data.msg);
          }
        });
    },
    // 粘贴
    paste(item1, index1) {
      console.log("copyData", this.copyData);
      console.log("item1", item1);

      // this.index1 = index1;
      // this.upId = item1[0].upId;
      if (JSON.stringify(this.copyData) != "{}") {
        this.pasteData.verbalTrickId = this.verbalTrickId;
        this.pasteData.stageId = this.momentChild;
        console.log("item1.upId", item1[0].upId);
        if (item1[0].upId != 0) {
          this.pasteData.upId = item1[0].upId;
        } else {
          this.pasteData.upId = "";
        }
        this.pasteData.term = this.copyData.term;
        this.pasteData.termValue = this.copyData.termValue;

        this.pasteData.nodeTextList = this.copyData.nodeTextList1;
        this.pasteData.nodeTextList.forEach(item => {
          item.textOptionList.forEach(item2 => {
            delete item2.optionId;
          });
        });
        console.log('{}',JSON.stringify(this.copyData.taskResourceMap));
        if (JSON.stringify(this.copyData.taskResourceMap) != "{}") {
          let list = this.copyData.taskResourceMap;
          let list1 = JSON.parse(
            JSON.stringify(list).replace(/list/g, "taskResourceList")
          );
          this.pasteData.taskResourceMap = list1;
        }else{
          delete this.pasteData.taskResourceMap;
        }
        console.log("pasteData", this.pasteData);
        this.$axios
          .post("api/verbalTrickNode/addVerbalTrickNode", this.pasteData)
          .then(res => {
            if (res.data.code == 0) {
              this.$Message.success("粘贴成功");
              this.$emit("changeList", {
                level: index1,
                nodeList: this.nodeList,
                upId: this.pasteData.upId
              });
            } else {
              this.$Message.error(res.data.msg);
            }
          });
      } else {
        this.$Message.error("请先复制");
      }
    },
    paste1(length) {
      console.log(length);
      if (JSON.stringify(this.copyData) != "{}") {
        this.pasteData.verbalTrickId = this.verbalTrickId;
        this.pasteData.stageId = this.momentChild;
        this.pasteData.upId = this.choiceId;
        this.pasteData.term = this.copyData.term;

        this.pasteData.termValue = this.copyData.termValue;

        this.pasteData.nodeTextList = this.copyData.nodeTextList1;
        this.pasteData.nodeTextList.forEach(item => {
          item.textOptionList.forEach(item2 => {
            delete item2.optionId;
          });
        });
        if (JSON.stringify(this.copyData.taskResourceMap) != "{}") {
          let list = this.copyData.taskResourceMap;
          let list1 = JSON.parse(
            JSON.stringify(list).replace(/list/g, "taskResourceList")
          );
          this.pasteData.taskResourceMap = list1;
        }else{
          delete this.pasteData.taskResourceMap;
        }
        console.log("pasteData", this.pasteData);
        this.$axios
          .post("api/verbalTrickNode/addVerbalTrickNode", this.pasteData)
          .then(res => {
            if (res.data.code == 0) {
              this.$Message.success("粘贴成功");
              //this.verbalTrickManagement.getVerbalTrickNodeList()
              //this.reload();
              //this.verbalTrickManagement.getMoment(true);
              console.log("length", length);
              this.$emit("changeList", {
                level: length,
                nodeList: this.nodeList,
                upId: this.choiceId
              });
            } else {
              this.$Message.error(res.data.msg);
            }
          });
      } else {
        this.$Message.error("请先复制");
      }
    }
  }
};
</script>
<style scoped>
.nodeCss {
  box-sizing: border-box;
  border-radius: 8px;
  background-color: rgba(161, 181, 255, 0.698039215686274);
  width: 255px;
  height: 76px;
  margin-left: 12px;
  margin-top: 10px;
  position: relative;
}
.nodeCss1 {
  border-radius: 8px;
  background-color: white;
  width: 255px;
  height: 76px;
  margin-left: 12px;
  margin-top: 10px;
  position: relative;
  box-sizing: border-box;
}
.nodelist {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>