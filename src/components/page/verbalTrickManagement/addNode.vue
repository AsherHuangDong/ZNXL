<template>
  <div id="addNodeText">
    <Modal
      v-model="modelAdd"
      width="700"
      :mask-closable="false"
      :closable="false"
      :transfer="false"
     >
      <p slot="header">
        <span style="font-size:20px">话术详情</span>
      </p>

      <div class="addText">
        <Button type="primary" @click="addText">新增文本</Button>
        <Button v-if="isShowTask" type="primary" @click="addTask">新增任务</Button>
        <Button v-if="!isShowTask" disabled type="primary">新增任务</Button>
        <!-- <Button v-if="isShowWork" type="primary" @click="assignHomework">布置作业</Button> -->
      </div>

      <div style="margin-top:56px">
        <div
          style="background-color:rgba(235, 240, 251, 1);width:638px;padding-bottom:10px;margin-bottom:10px"
          v-for="(item,index) in addNode.nodeTextList"
          :key="index"
        >
          <span
            style="color:#07175D;display:inline-block;text-align:left;margin-left:10px;margin-top:10px"
          >话术文本</span>
          <a
            style="color:red;display:inline-block;float:right;margin-right:10px;margin-top:10px"
            @click="deleteText(index)"
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
      <div v-if="isShowTaskAdd">
        <div
          style="background-color:rgba(235, 240, 251, 1);width:638px;min-height:168px;margin-bottom:10px"
        >
          <span
            style="color:#07175D;display:inline-block;text-align:left;margin-left:10px;margin-top:10px"
          >任务资源</span>
          <a
            style="color:red;display:inline-block;float:right;margin-right:10px;margin-top:10px"
            @click="deleteTask"
          >删除</a>
          <!-- 任务资源 -->
          <div style="margin-top:10px">
            <span
              style="color:#07175D;display:inline-block;text-align:left;margin-left:10px;margin-top:10px"
            >请选择任务资源：</span>
            <Select
              v-model="addNode.taskResourceMap.taskResourceList[0].type"
              @on-change="select1"
              style="width: 70px"
            >
              <Option
                v-for="(element,index2) in resourceType"
                :value="element.type"
                :key="index2"
              >{{element.value}}</Option>
            </Select>
            <Select
              v-model="addNode.taskResourceMap.taskResourceList[0].contentId"
              style="width: 400px"
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
            >请选择备选资源：</span>
            <Select v-model="taskResourceList.type" @on-change="select1" style="width: 70px">
              <Option
                v-for="(element,index3) in resourceType"
                :value="element.type"
                :key="index3"
              >{{element.value}}</Option>
            </Select>
            <Select v-model="taskResourceList.contentId" multiple style="width: 400px">
              <Option
                v-for="(element1,index3) in contentList"
                :key="index3"
                :value="element1.contentId"
              >{{element1.title}}</Option>
            </Select>
          </div>
          <Checkbox
            v-model="addNode.taskResourceMap.isComment"
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
          <Select v-model="addNode.term" style="width:100px;display:inline-block" transfer>
            <Option :value="3">无</Option>
            <Option :value="1">用户选择</Option>
            <Option :value="2">用户输入</Option>
          </Select>
          <Input
            v-if="addNode.term!=3"
            style="width:200px;display:inline-block;text-align:center"
            type="text"
            placeholder="请输入内容"
            v-model="addNode.termValue"
          ></Input>
        </div>
      </div>
      <div slot="footer">
        <Button @click="cancel">取消</Button>
        <Button type="primary" @click="save">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
export default {
  components: { VueEditor },
  data() {
    return {
      modelAdd: true,
      isShowTask: true,
      isShowTaskAdd: false,
      contentList: [],
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
      taskResourceList: {
        type: 1,
        status: 2,
        contentId: []
      },
      addNode: {
        verbalTrickId: "",
        stageId: "",
        upId: "",
        term: 3,
        termValue: "",
        nodeTextList: [],
        taskResourceMap: {}
      },
      addNode1: {
        verbalTrickId: "",
        stageId: "",
        nodeTextList: [],
        taskResourceMap: {
          isComment: "",
          taskResourceList: []
        }
      },
      index:""
    };
  },
  methods: {
    //新增选项
    addOption(index) {
      this.addNode.nodeTextList[index].textOptionList.push({
        option: "", //选项
        optionContent: "" //选项对应内容
      });
    },
    //删除选项
    deleteOption(index, index1) {
      console.log(index1);
      this.addNode.nodeTextList[index].textOptionList.splice(index1, 1);
    },
    addText() {
      this.addNode.nodeTextList.push({ content: "", textOptionList: [] });
    },
    addTask() {
      this.addNode.taskResourceMap = {
        isComment: false,
        taskResourceList: [
          {
            contentId: "",
            type: 1,
            status: 1
          }
        ]
      };
      this.$axios
        .post("api/taskResource/getTaskResourceList", {
          type: this.addNode.taskResourceMap.taskResourceList[0].type
        })
        .then(res => {
          this.contentList = res.data.data;
          console.log("contentId", this.contentList);
          this.addNode.taskResourceMap.taskResourceList[0].contentId = this.contentList[0].contentId;
        });
      this.isShowTaskAdd = true;
      this.isShowTask = false;
    },
    select1(e) {
      this.addNode.taskResourceMap.taskResourceList[0].type = e;
      this.taskResourceList.type = e;
      this.$axios
        .post("api/taskResource/getTaskResourceList", { type: e })
        .then(res => {
          this.contentList = res.data.data;
          this.addNode.taskResourceMap.contentId = res.data.data[0].contentId;
        });
    },
    deleteText(index) {
      this.addNode.nodeTextList.splice(index, 1);
    },
    deleteTask() {
      this.addNode.taskResourceMap = {};
      this.isShowTaskAdd = false;
      this.isShowTask = true;
    },
    //保存全部
    save() {
      console.log(this.addNode);
      console.log(this.taskResourceList);
      this.addNode1.verbalTrickId = this.addNode.verbalTrickId;
      this.addNode1.stageId = this.addNode.stageId;
      if (this.addNode.upId) {
        this.addNode1.upId = this.addNode.upId;
      }
      if (
        this.addNode.term &&
        this.addNode.termValue &&
        this.addNode.term != 3
      ) {
        this.addNode1.term = this.addNode.term;
        this.addNode1.termValue = this.addNode.termValue;
      }
      if (this.addNode.term == 3) {
        this.addNode1.term = this.addNode.term;
        this.addNode1.termValue = "";
      }
      this.addNode1.nodeTextList = this.addNode.nodeTextList;
      if (JSON.stringify(this.addNode.taskResourceMap) != "{}") {
        if (this.addNode.taskResourceMap.isComment == true) {
          this.addNode1.taskResourceMap.isComment = 1;
        }
        if (this.addNode.taskResourceMap.isComment == false) {
          this.addNode1.taskResourceMap.isComment = 2;
        }
        this.addNode1.taskResourceMap.taskResourceList.push(
          this.addNode.taskResourceMap.taskResourceList[0]
        );
        if (this.taskResourceList.contentId.length != 0) {
          this.taskResourceList.contentId.forEach(item => {
            this.addNode1.taskResourceMap.taskResourceList.push({
              type: this.taskResourceList.type,
              status: 2,
              contentId: item
            });
          });
        }
      } else {
        delete this.addNode1.taskResourceMap;
      }
      // if (this.addNode1.nodeTextList.length == 0) {
      //   this.$Message.info("请添加话术文本");
      //   return false;
      if(this.addNode1.nodeTextList.length != 0) {
        let k = 1;
        let m = 1;
        let n = 1;
        this.addNode1.nodeTextList.forEach(item => {
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
      if (this.addNode1.term != 3) {
        console.log("ffff");
        if (!this.addNode1.termValue) {
          this.$Message.info("请输入触发条件内容");
          return false;
        }
      }
      console.log(this.addNode1);
      this.$axios
        .post("api/verbalTrickNode/addVerbalTrickNode", this.addNode1)
        .then(res => {
          if (res.data.code == 0) {
            this.$Message.success("添加成功！");
            this.$router.go(-1);
          } else {
            this.$Message.error(res.data.msg);
          }
        });
      this.isShowTaskAdd = false;
      this.addNode.nodeTextList = [];
      this.addNode.taskResourceMap = {};
      this.taskResourceList.contentId = [];
    },
    cancel() {
      this.$router.go(-1);
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
    },
    //布置作业
    assignHomework(){

    }
  },
  mounted() {
    this.addNode.verbalTrickId = this.$route.query.verbalTrickId;
    this.addNode.stageId = this.$route.query.momentChild;
    this.index = this.$route.query.index;
    if (this.$route.query.upId) {
      this.addNode.upId = this.$route.query.upId;
    }
    console.log(this.addNode)
  }
}
</script>
<style scoped>
/deep/ .ivu-modal-body{
    padding:0px;
    padding-left: 16px;
  }
#addNodeText .addText{
    position: absolute;
    width: 668px;
    height: 56px;
    background: #ffffff;
    z-index: 1;
    padding-top: 16px;
}
</style>
