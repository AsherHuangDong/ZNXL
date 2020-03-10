<template>
  <div id="editNodeText">
    <Modal style="padding:16px;" v-model="showDel" width="360" :mask-closable="false" :closable="false">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>是否删除该条数据？</span>
      </p>
      <div style="text-align:center">
        <p>删除数据后将无法恢复</p>
      </div>
      <div slot="footer" style="text-align:center;">
        <Button type="error" @click="del">删除</Button>
        <Button style="margin-left:40px;" @click="cancelDel">取消</Button>
      </div>
    </Modal>

   <div>
      <Modal
      v-model="modelEdit"
      width="700"
      :mask-closable="false"
      :closable="false"
      :transfer="false"
     >
      <p slot="header">
        <span style="font-size:20px">话术详情</span>
      </p>

      <div class="editText">
        <Button style="displa:inline-block" type="primary" @click="addText">新增文本</Button>
        <Button v-if="isShowTask" style="displa:inline-block" type="primary" @click="addTask">新增任务</Button>
        <Button v-if="!isShowTask" style="displa:inline-block" disabled type="primary">新增任务</Button>
      </div>

      <div style="margin-top:56px">
        <div
          style="background-color:rgba(235, 240, 251, 1);padding-bottom:10px;width:638px;margin-bottom:10px"
          v-for="(item,index) in editNode.nodeTextList"
          :key="index"
        >
          <span
            style="color:#07175D;display:inline-block;text-align:left;margin-left:10px;margin-top:10px"
          >话术文本</span>
          <a
            style="color:red;display:inline-block;float:right;margin-right:10px;margin-top:10px"
            @click="deleteText1(index)"
          >删除</a>
          <!-- <Input
            type="textarea"
            :rows="3"
            placeholder="输入话术文本"
            v-model="item.content"
            style="width:620px;height:78px;margin-left:10px;margin-top:5px"
          ></Input>-->
          <VueEditor
            v-model="item.content"
            useCustomImageHandler
            @image-added="handleImageAdded"
            style="width:620px;margin-left:10px;margin-top:5px;background:#fff"
          ></VueEditor>
          <a
            style="font-size:10px;color:blue;margin-left:10px;margin-top:10px;"
            @click="addOption(index)"
          >+新增选项</a>
          <div
            v-for="(item1,index1) in item.textOptionList"
            :key="index1"
            style="width:620px;display:flex;justify-content:space-between;align-items:center;padding-left:10px;margin-top:10px"
          >
            <Input style="width:50px;margin-right:10px;text-align:center" v-model="item1.option"></Input>
            <Input
              style="width:550px;margin-right:10px"
              placeholder="请输入选项内容"
              v-model="item1.optionContent"
            ></Input>
            <img
              src="static/img/remove.png"
              style="width:20px;height:20px;margin:0;cursor:pointer"
              @click="deleteOption(index,index1)"
            />
          </div>
        </div>
      </div>

      <br />
      <div v-if="isShowTaskEdit">
        <div
          style="background-color:rgba(235, 240, 251, 1);width:638px;height:168px;margin-bottom:10px"
        >
          <span
            style="color:#07175D;display:inline-block;text-align:left;margin-left:10px;margin-top:10px"
          >任务资源</span>
          <a
            style="color:red;display:inline-block;float:right;margin-right:10px;margin-top:10px"
            @click="deleteTask1"
          >删除</a>
          <!-- 任务资源 -->
          <div style="margin-top:10px">
            <span
              style="color:#07175D;display:inline-block;text-align:left;margin-left:10px;margin-top:10px"
            >推荐资源</span>
            <Select
              v-model="editNode.taskResourceMap.taskResourceList[0].type"
              @on-change="select2"
              style="width: 70px"
            >
              <Option
                v-for="(element,index2) in resourceType"
                :value="element.type"
                :key="index2"
              >{{element.value}}</Option>
            </Select>
            <Select
              v-model="editNode.taskResourceMap.taskResourceList[0].contentId"
              style="width: 490px"
            >
              <Option
                v-for="(element1,index3) in contentList"
                :key="index3"
                :value="element1.contentId"
              >{{element1.title}}</Option>
            </Select>
          </div>
          <!-- 备选资源 -->
          <div style="margin-top:10px">
            <span
              style="color:#07175D;display:inline-block;text-align:left;margin-left:10px;margin-top:10px"
            >备选资源</span>
            <Select v-model="taskResourceList.type" @on-change="select2" style="width: 70px">
              <Option
                v-for="(element,index3) in resourceType"
                :value="element.type"
                :key="index3"
              >{{element.value}}</Option>
            </Select>
            <Select v-model="taskResourceList.contentId" multiple style="width: 490px">
              <Option
                v-for="(element1,index3) in contentList"
                :key="index3"
                :value="element1.contentId"
              >{{element1.title}}</Option>
            </Select>
          </div>
          <Checkbox
            v-model="editNode.taskResourceMap.isComment"
            style="margin-left:10px;margin-top:10px"
          >接受用户评价</Checkbox>
        </div>
      </div>

      <br />
      <div>
        <div style="width:57px;height:20px">
          <p>
            <span style="color: #07175D;font-size: 14px;">触发条件</span>
          </p>
        </div>
        <br />
        <div>
          <Select v-model="editNode.term" style="width:100px;display:inline-block" transfer>
            <Option :value="3">无</Option>
            <Option :value="1">用户选择</Option>
            <Option :value="2">用户输入</Option>
          </Select>
          <Input
            style="width:56px;display:inline-block;text-align:center"
            type="text"
            placeholder="请输入内容"
            v-model="editNode.termValue"
            v-if="editNode.term&&editNode.term!=3"
          ></Input>
        </div>
      </div>
      <div slot="footer">
        <Button type="error" style="float:left;" @click="toDel">删除</Button>
        <Button @click="cancel">取消</Button>
        <Button type="primary" @click="save">确定</Button>
      </div>
    </Modal>
   </div>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
export default {
  components: { VueEditor },
  data() {
    return {
      showDel: false,
      isShowTask: false,
      nodeId: "",
      upId: '',
      isShowTaskEdit: false,
      modelEdit: true,
      editNode1: {},
      editNode: {
        nodeId: "",
        term: "0",
        termValue: "",
        nodeTextList: [],
        taskResourceMap: {
          isComment: 2,
          taskResourceList: [
            {
              contentId: "",
              type: "",
              status: 1
            }
          ]
        }
      },
      taskResourceList: {
        type: "",
        status: 2,
        contentId: []
      },
      resourceType: [
        {
          type: 1,
          value: "音频"
        },
        {
          type: 2,
          value: "视频"
        },
        {
          type: 3,
          value: "电子书"
        },
        {
          type: 4,
          value: "问卷"
        },
        {
          type: 5,
          value: "表单"
        },
        {
          type: 6,
          value: "小游戏"
        }
      ],
      contentList: []
    };
  },
  methods: {
    //新增选项
    addOption(index) {
      this.editNode.nodeTextList[index].textOptionList.push({
        option: "", //选项
        optionContent: "" //选项对应内容
      });
    },
    //删除选项
    deleteOption(index, index1) {
      console.log(index1);
      this.editNode.nodeTextList[index].textOptionList.splice(index1, 1);
    },
    getDetail() {
      this.$axios
        .post("api/verbalTrickNode/selectVerbalTrickNode", {
          nodeId: this.nodeId
        })
        .then(res => {
          this.editNode1 = res.data.data;
          this.editNode.nodeId = this.nodeId;
          this.editNode.upId = this.editNode1.upId;
          if (this.editNode1.term) {
            this.editNode.term = this.editNode1.term;
          }
          this.editNode.termValue = this.editNode1.termValue;
          if (this.editNode1.nodeTextList1) {
            this.editNode1.nodeTextList1.forEach(item => {
              this.editNode.nodeTextList.push(item);
            });
          }
          if (JSON.stringify(this.editNode1.taskResourceMap) == "{}") {
            this.isShowTask = true;
            this.editNode.taskResourceMap = {};
          } else {
            this.isShowTaskEdit = true;
            if (this.editNode1.taskResourceMap.isComment == 1) {
              this.editNode.taskResourceMap.isComment = true;
            }
            if (this.editNode1.taskResourceMap.isComment == 2) {
              this.editNode.taskResourceMap.isComment = false;
            }
            this.editNode1.taskResourceMap.list.forEach(item => {
              if (item.status == 1) {
                this.editNode.taskResourceMap.taskResourceList[0] = item;
              } else {
                this.taskResourceList.type = item.type;
                this.taskResourceList.contentId.push(item.contentId);
              }
            });
            this.select2(
              this.editNode.taskResourceMap.taskResourceList[0].type
            );
          }
          console.log("eidtNode", this.editNode);
        });
    },
    addText() {
      this.editNode.nodeTextList.push({ content: "", textOptionList: [] });
    },
    addTask() {
      this.isShowTask = false;
      this.editNode.taskResourceMap = {
        isComment: 2,
        taskResourceList: [
          {
            type: 1,
            status: 1,
            contentId: ""
          }
        ]
      };
      this.taskResourceList.type = 1;
      this.$axios
        .post("api/taskResource/getTaskResourceList", {
          type: this.editNode.taskResourceMap.taskResourceList[0].type
        })
        .then(res => {
          this.contentList = res.data.data;
          this.editNode.taskResourceMap.taskResourceList[0].contentId = this.contentList[0].contentId;
          this.taskResourceList.contentId = [];
        });
      this.isShowTaskEdit = true;
      this.isShowTask2 = false;
    },
    deleteTask1() {
      this.editNode.taskResourceMap = {};
      this.isShowTaskEdit = false;
      this.isShowTask = true;
    },
    select2(e) {
      console.log("e", e);
      let type1 = this.editNode.taskResourceMap.taskResourceList[0].type;
      this.editNode.taskResourceMap.taskResourceList[0].type = e;
      this.taskResourceList.type = e;
      this.$axios
        .post("api/taskResource/getTaskResourceList", { type: e })
        .then(res => {
          console.log(res);
          this.contentList = res.data.data;
          if (type1 != e) {
            this.editNode.taskResourceMap.taskResourceList[0].contentId = "";
            this.taskResourceList.contentId = [];
          }
        });
    },
    deleteText1(index1) {
      this.editNode.nodeTextList.splice(index1, 1);
    },
    save() {
      let editNewNode = {
        taskResourceMap: {}
      };
      editNewNode.nodeId = this.editNode.nodeId;
      if (
        this.editNode.term &&
        this.editNode.termValue &&
        this.editNode.term != 3
      ) {
        editNewNode.term = this.editNode.term;
        editNewNode.termValue = this.editNode.termValue;
      }
      if (this.editNode.term == 3) {
        editNewNode.term = this.editNode.term;
      }
      editNewNode.nodeTextList = this.editNode.nodeTextList;
      if (JSON.stringify(this.editNode.taskResourceMap) != "{}") {
        editNewNode.taskResourceMap = JSON.parse(
          JSON.stringify(this.editNode.taskResourceMap)
        );
        if (editNewNode.taskResourceMap.isComment == true) {
          editNewNode.taskResourceMap.isComment = 1;
        }
        if (editNewNode.taskResourceMap.isComment == false) {
          editNewNode.taskResourceMap.isComment = 2;
        }
        if (this.taskResourceList.contentId.length != 0) {
          this.taskResourceList.contentId.forEach(item => {
            editNewNode.taskResourceMap.taskResourceList.push({
              type: this.taskResourceList.type,
              status: 2,
              contentId: item
            });
          });
        }
        delete editNewNode.taskResourceMap.taskResourceList[0].resourceName;
      } else {
        delete editNewNode.taskResourceMap;
      }

      // if (editNewNode.nodeTextList.length == 0) {
      //   this.$Message.info("请添加话术文本");
      //   return false;
      // } else
      if (editNewNode.nodeTextList.length != 0) {
        let k = 1;
        let m = 1;
        let n = 1;
        editNewNode.nodeTextList.forEach(item => {
          if (!item.content) {
            k = 2;
          }
          if (item.textOptionList.length != 0) {
            item.textOptionList.forEach(item1 => {
              if (!item1.option) {
                m = 2;
              }
              if (!item1.optionContent) {
                n = 2;
              }
            });
          }
        });
        if (k == 2) {
          this.$Message.info("请输入文本内容");
          return false;
        }
        if (m == 2) {
          this.$Message.info("请输入选项");
          return false;
        }
        if (n == 2) {
          this.$Message.info("请输入选项对应内容");
          return false;
        }
      }
      if (editNewNode.term != 3) {
        console.log("ffff");
        if (!editNewNode.termValue) {
          this.$Message.info("请输入触发条件内容");
          return false;
        }
      }

      console.log("editNewNode", editNewNode);
      this.$axios
        .post("api/verbalTrickNode/editVerbalTrickNode", editNewNode)
        .then(res => {
          if (res.data.code == 0) {
            console.log(res);
            this.$Message.success("修改成功！");
            this.$router.go(-1);
          } else {
            this.$Message.error(res.data.msg);
          }
        });
    },
    toDel() {
      this.showDel = true;
    },
    del() {
      this.$axios
        .post("api/verbalTrickNode/deleteVerbalTrickNode", {
          nodeId: this.nodeId
        })
        .then(res => {
          if (res.data.code == 0) {
            this.$router.go(-1);
            this.$Message.success("删除成功！");
          } else {
            this.$Message.error(res.data.msg);
          }
        });
    },
    cancel() {
      this.$router.go(-1);
    },
    cancelDel() {
      this.showDel = false;
    },
    //富文本转字符串
    removeHTMLTag(str) {
      str = str.replace(/<\/?[^>]*>/g, ""); //去除HTML tag
      str = str.replace(/[ | ]*\n/g, "\n"); //去除行尾空白
      //str = str.replace(/\n[\s| | ]*\r/g,'\n'); //去除多余空行
      str = str.replace(/ /gi, ""); //去掉
      return str;
    },
    //富文本上传文件
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append("img", file);
      this.$axios
        .post("api/file/upload", formData)
        .then(result => {
          let url = result.data.data.path; // Get url from response
          Editor.insertEmbed(cursorLocation, "image", url);
          resetUploader();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.nodeId = this.$route.query.id;
    this.upId = this.$route.query.upId;
    console.log(this.nodeId)
    console.log(this.upId)
    this.getDetail();
  }
};
</script>
<style scoped>
#editNodeText /deep/ .ivu-modal-body{
    padding:0px;
    padding-left: 16px;
  }
#editNodeText .editText{
    position: absolute;
    width: 668px;
    height: 56px;
    background: #ffffff;
    z-index: 1;
    padding-top: 16px;
}
</style>
