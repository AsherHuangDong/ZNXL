<template>
  <div>
    <Modal v-model="modal2" :closable="false">
      <Input placeholder="请输入维度名" v-model="momentName"></Input>
      <div slot="footer" style="text-align:center">
        <Button style="width:100px" type="primary" @click="ok">确认</Button>
        <Button style="width:100px" @click="cancel">取消</Button>
      </div>
    </Modal>
    <Row>
      <Col>
        <Button @click="goback" type="info">返回</Button>
      </Col>
    </Row>
    <div class="question" v-if="isshow">
      <div style="margin-left:40px">
        <img src="/static/img/one.png" style="width:30px;height:30px" />
        <img src="/static/img/line.png" style="width:400px;height:30px;overflow:hidden" />
        <img src="/static/img/2.png" style="width:30px;height:30px" />
      </div>

      <div>
        <span style="color:black;margin-right:320px">填写问卷基本信息</span>
        <span style="color:#ccc">设置问卷题目与解释</span>
      </div>

      <div style="margin-top:20px">
        <span style="color:#07175D;margin-right:20px">问卷标题</span>
        <Input v-model="addQuestion.title" placeholder="预设提示文字" style="width:400px"></Input>
      </div>

      <div style="margin-top:10px" class="cover">
        <span style="color:#07175D;margin-right:25px">问卷封面</span>
        <Button
          icon="md-add"
          style="width:100px;height:100px;background:#eee;margin-right:10px"
          type="dashed"
          @click="Maddimg"
        >
          <br />
          <span style="margin-top:10px">上传</span>
        </Button>
        <input
          id="addMainImg"
          type="file"
          style="opacity: 0;height: 0;width: 0"
          accept=".png, .jpg, .jpeg"
        />
        <div
          style="width:100px;height:100px;border:1px solid black;border-style:dotted;"
          v-if="imgSrc"
        >
          <img style="width:100px;height:100px" :src="imgSrc" />
        </div>
      </div>

      <span style="color:#ccc;margin-left:80px">支持扩展名：.jpg .jpeg .png ...，建议图片尺寸</span>

      <div style="margin-top:10px">
        <span style="color:#07175D;margin-right:35px;">指导语</span>
        <Input v-model="addQuestion.introduct" type="textarea" :rows="4" style="width:400px" />
      </div>

      <div style="margin-top:40px;margin-left:200px">
        <Button style="width:100px;" type="primary" @click="gotoNext">下一步</Button>
      </div>
    </div>

    <div v-if="!isshow">
      <Row>
        <div style="text-align:center">
          <img src="/static/img/stop.png" style="width:30px;height:30px" />
          <img src="/static/img/line1.png" style="width:400px;height:30px;overflow:hidden" />
          <img src="/static/img/tow.png" style="width:30px;height:30px" />
        </div>
      </Row>
      <Row>
        <Col span="24">
          <div style="text-align:center">
            <span style="color:black;margin-right:320px">填写问卷基本信息</span>
            <span style="color:black">设置问卷题目与解释</span>
          </div>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span="24" offset="5">
          <div style="display:flex;justify-content:flex-start;align-item:flex-start">
            <div
              style="width:4px;height:20px;background:#07175D;display:inline-block;margin-right:5px"
            ></div>
            <div style="display:inline-block;color:#07175D">
              <h1 style="font-size:15px">问卷维度</h1>
            </div>
          </div>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span="24" offset="5">
          <div style="float:left;width:500px">
            <Tag
              v-for="(item,index) in weidulist"
              :key="item.dimensionId"
              :name="index"
              closable
              @on-close="handleClose2(index,item.dimensionId)"
            >{{item.dimensionName}}</Tag>
            <Button icon="ios-add" type="dashed" size="small" @click="handleAdd">添加标签</Button>
          </div>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span="24" offset="5">
          <div style="display:flex;justify-content:flex-start;align-item:flex-start">
            <div
              style="width:4px;height:20px;background:#07175D;display:inline-block;margin-right:5px"
            ></div>
            <div style="display:inline-block;color:#07175D">
              <h1 style="font-size:15px">问卷题目</h1>
            </div>
          </div>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span="24">
          <div style="float:left;margin-left:240px;">
            <div
              v-for="(item,index) in Question.questionList"
              :key="index"
              style="margin-bottom:10px"
            >
              <div style="display:flex;justify-content:flex-start;align-items:center">
                <!-- <div
                  v-if="index !==0 "
                  style="width:10px;height:10px;display:inline-block;border:1px solid red"
                  @click="deleteQ(index)"
                ></div>-->
                <img
                  v-if="index !==0"
                  src="static/img/remove.png"
                  style="width:15px;height:15px;cursor:pointer;margin-right:5px"
                  @click="deleteQ(index)"
                />
                <div style="width:20px;color:#07175D;display:inline-block;">{{index+1}}.</div>
                <Input style="display:inline-block;width:385px" v-model="item.questionName"></Input>
                <Button
                  style="display:inline-block;height:34px;margin-left:5px"
                  type="info"
                  @click="addTitle(index)"
                >+添加</Button>
              </div>

              <div
                style="margin-top:10px;margin-left:40px"
                v-for="(item1,index1) in item.optionList"
                :key="index1"
              >
                <!-- <div
                  style="width:8px;height:8px;display:inline-block;border:1px solid red"
                  @click="deleteC(index,index1)"
                ></div>-->
                <img
                  v-if="index1!=0"
                  src="static/img/remove.png"
                  style="width:12px;height:12px;display:inline-block;cursor:pointer"
                  @click="deleteC(index,index1)"
                />
                <div
                  style="width:40px;text-align:right;color:#07175D;display:inline-block"
                >选项{{index1+1}}:</div>
                <Input
                  placeholder="选项描述"
                  style="width:194px;display:inline-block"
                  v-model="item1.optionName"
                ></Input>
                <div style="width:80px;text-align:right;color:#07175D;display:inline-block">得分:</div>
                <Input
                  type="number"
                  style="width:76px;display:inline-block"
                  v-model="item1.optionScore"
                ></Input>
              </div>
              <div
                style="width:80px;text-align:left;margin-left:40px;margin-top:10px"
                @click="addPrint(index)"
              >
                <a style="color:blue;">新增选项</a>
              </div>

              <div style="text-align:left;margin-top:10px">
                <div style="width:70px;text-align:right;color:#07175D;display:inline-block">维度:</div>
                <div style="text-align:left;display:inline-block">
                  <Tag
                    v-for="(item2,index2) in item.dimensionList"
                    :key="index2"
                    :name="index2"
                    closable
                    @on-close="handleClose(index,index2)"
                  >{{item2.dimensionName}}</Tag>
                </div>
                <Dropdown @on-click="gotoAdd">
                  <Button icon="ios-add" type="dashed" size="small" @click="getIndex(index)">新增</Button>
                  <DropdownMenu slot="list">
                    <DropdownItem
                      v-for="item3 in weidulist"
                      :key="item3.dimensionId"
                      :name="item3.dimensionId+'+'+item3.dimensionName"
                    >{{item3.dimensionName}}</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span="24" offset="5">
          <div style="display:flex;justify-content:flex-start;align-items:flex-start">
            <div
              style="width:4px;height:20px;background:#07175D;display:inline-block;margin-right:5px"
            ></div>
            <div style="display:inline-block;color:#07175D">
              <h1 style="font-size:15px">问卷解释</h1>
            </div>
          </div>
        </Col>
      </Row>
      <br />
      <Row>
        <Col span="24">
          <Tabs style="margin-bottom:10px;float:left;margin-left:240px;" @on-change="change">
            <TabPane v-for="(item4,index4) in weidulist" :key="index4" :label="item4.dimensionName">
              <div>
                <span style="color:#07175D">得分范围:</span>
              </div>
              <br />
              <div style="float:left;">
                <div
                  v-for="(item5,index5) in item4.scoreExplanList"
                  :key="index5"
                  style="margin-bottom:10px"
                >
                  <div style="display:flex;justify-content:flex-start;align-items:center">
                    <!-- <div
                      v-if="index5 !==0 "
                      style="width:10px;height:10px;display:inline-block;border:1px solid red"
                      @click="deleteE(index4,index5)"
                    ></div>-->
                    <img
                      v-if="index5 !== 0"
                      src="static/img/remove.png"
                      style="width:15px;height:15px;cursor:pointer;margin-right:5px"
                      @click="deleteE(index4,index5)"
                    />
                    <div style="width:20px;color:#07175D;display:inline-block;">{{index5+1}}.</div>
                    <Input
                      style="display:inline-block;width:81px"
                      v-model="item5.beginScore"
                      type="number"
                    ></Input>
                    <img
                      src="/static/img/line.png"
                      style="width:50px;height:10px;overflow:hidden;display:inline-block;"
                    />
                    <Input
                      style="display:inline-block;width:81px"
                      v-model="item5.endScore"
                      type="number"
                    ></Input>
                    <Button
                      style="display:inline-block;height:34px;margin-left:5px"
                      type="info"
                      @click="addExplain(index4,index5)"
                    >+添加</Button>
                  </div>
                  <Input
                    style="width:399px;height:118px;margin-top:10px;margin-left:25px"
                    type="textarea"
                    :rows="4"
                    placeholder="解释和干预"
                    v-model="item5.explan"
                  ></Input>
                </div>
              </div>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <div style="margin-bottom:10px;float:left;margin-left:340px;">
            <Button style="width:100px;margin-right:40px" type="primary" @click="gotoLast">上一步</Button>
            <Button style="width:100px;" type="primary" @click="save">保存</Button>
          </div>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
export default {
  name: "questionnaireAdd",
  data() {
    return {
      momentName: "",
      modal2: false,
      count: [],
      imgSrc: "",
      isshow: true,
      title: "",
      description: "",
      index: "",
      scorce: {
        beginScore: "",
        endScore: ""
      },
      //问卷题目
      questionlist: {
        evaluationId: "",
        dimensionList: [
          {
            dimensionId: "",
            scoreExplanList: [
              {
                beginScore: "",
                endScore: "",
                explan: ""
              }
            ]
          }
        ]
      },
      weidulist: [],
      evaluationId: "",
      weiduAdd: {
        evaluationId: "",
        dimensionNameList: []
      },
      //问卷题目
      Question: {
        evaluationId: "",
        questionList: [
          {
            questionName: "",
            dimensionList: [],
            optionList: [
              {
                optionName: "",
                optionScore: ""
              }
            ]
          }
        ]
      },
      explain: {
        evaluationId: "",
        dimensionList: []
      },
      addQuestion: {
        title: "",
        cover: "",
        introduct: ""
      }
    };
  },
  methods: {
    handleAdd() {
      this.modal2 = true;
    },
    ok() {
      if (this.momentName) {
        this.weiduAdd.dimensionName = this.momentName;
        this.$axios
          .post("api/evaluationDimension/addEvaluationDimension", this.weiduAdd)
          .then(res => {
            console.log(res);
            this.modal2 = false;
            this.weidulist.push({
              dimensionId: res.data.data.dimensionId,
              dimensionName: res.data.data.dimensionName,
              scoreExplanList: [
                {
                  beginScore: "",
                  endScore: "",
                  explan: ""
                }
              ]
            });
            console.log(this.weidulist);
            this.momentName = "";
          });
      } else {
        this.$Message.error("请输入维度名!!");
      }
    },
    cancel() {
      this.modal2 = false;
    },
    handleClose2(index, dimensionId) {
      this.weidulist.splice(index, 1);
      console.log("questionList", this.Question.questionList);
      if (this.Question.questionList) {
        this.Question.questionList.forEach(item => {
          let m = -1;
          for (let i = 0; i < item.dimensionList.length; i++) {
            if (item.dimensionList[i].dimensionId == dimensionId) {
              m = i;
            }
          }
          console.log("m", m);
          if (m >= 0) {
            item.dimensionList.splice(m, 1);
          }
        });
      }
      this.$axios
        .post("api/evaluationDimension/deleteEvaluationDimension", {
          id: dimensionId
        })
        .then(res => {
          console.log(res);
        });
    },
    handleClose(index, index2) {
      this.Question.questionList[index].dimensionList.splice(index2, 1);
    },
    Maddimg() {
      const self = this;
      let addMainImg = document.getElementById("addMainImg");
      addMainImg.click();
      addMainImg.onchange = function(e) {
        let form = new FormData();
        form.append("img", this.files[0]);
        self.$axios.post("api/file/upload", form).then(res => {
          console.log(res.data);
          self.addQuestion.cover = res.data.data.filePath;
        });
        const oFReader = new FileReader();
        oFReader.readAsDataURL(this.files[0]);
        oFReader.onload = function(oFREvent) {
          self.imgSrc = oFREvent.target.result; // base64
        };
      };
    },
    gotoNext() {
      console.log(this.addQuestion);
      if (this.evaluationId) {
        this.isshow = false;
      } else {
        if (
          this.addQuestion.title &&
          this.addQuestion.cover &&
          this.addQuestion.introduct
        ) {
          this.$axios
            .post("api/evaluation/addEvaluation", this.addQuestion)
            .then(res => {
              console.log(res);
              this.evaluationId = res.data.data.evaluationId;
              this.weiduAdd.evaluationId = res.data.data.evaluationId;
              this.questionlist.evaluationId = res.data.data.evaluationId;
              this.explain.evaluationId = res.data.data.evaluationId;
              this.Question.evaluationId = res.data.data.evaluationId;
              this.isshow = false;
            });
        } else {
          this.$Message.error("存在未填写选项，请填写完成后重试！");
        }
      }
    },
    gotoLast() {
      this.isshow = true;
    },
    save() {
      //this.$router.go(-1);
      console.log("weidulist", this.weidulist);
      console.log("questionList", this.Question.questionList);
      if (this.weidulist.length != 0) {
        let k = 1;
        let m = 1;
        this.explain.dimensionList = window.JSON.parse(
          window.JSON.stringify(this.weidulist)
        );
        this.explain.dimensionList.forEach(item => {
          delete item.dimensionName;
          for (let i = 0; i < item.scoreExplanList.length; i++) {
            if (
              !item.scoreExplanList[i].explan ||
              !item.scoreExplanList[i].beginScore ||
              !item.scoreExplanList[i].endScore
            ) {
              k = 2;
            }
          }
        });

        this.Question.questionList.forEach((item, index) => {
          if (!item.questionName) {
            k = 2;
          }
          for (let i = 0; i < item.optionList.length; i++) {
            if (
              !item.optionList[i].optionName ||
              !item.optionList[i].optionScore
            ) {
              k = 2;
            }
          }
          if (item.dimensionList.length == 0) {
            m = 2;
          }
        });
        if (k == 1 && m == 1) {
          let list = [];
          console.log("Question", this.Question);
          this.Question.questionList.forEach(item => {
            item.optionList.forEach(item1 => {
              item1.optionScore = parseInt(item1.optionScore);
            });
            for (let i = 0; i < item.dimensionList.length; i++) {
              item.dimensionList[i] = item.dimensionList[i].dimensionId;
            }
          });
          console.log("explain", this.explain);
          console.log("Question", this.Question);
          this.$axios
            .post("api/evaluationQuestion/addEvaluationQuestion", this.Question)
            .then(res => {
              console.log(res);
              if (res.data.code != 0) {
                this.$Message.error(res.data.msg);
              }
            });
          this.$axios
            .post(
              "api/evaluationDimensionExplan/addEvaluationDimensionExplan",
              this.explain
            )
            .then(res => {
              console.log(res);
              if (res.data.code != 0) {
                this.$Message.error(res.data.msg);
              } else {
                this.$Message.success("添加成功！");
                this.$router.go(-1);
              }
            });
        } else if (k == 1 && m == 2) {
          this.$Message.error("请添加维度!");
        } else {
          this.$Message.error("请将信息填写完后重试!");
        }
      } else {
        this.$router.go(-1);
      }
    },
    addTitle(index) {
      this.Question.questionList.splice(index + 1, 0, {
        questionName: "",
        dimensionList: [],
        optionList: [
          {
            optionName: "",
            optionScore: ""
          }
        ]
      });
    },
    addPrint(index) {
      this.Question.questionList[index].optionList.push({
        optionName: "",
        optionScore: ""
      });
    },
    deleteQ(index) {
      this.Question.questionList.splice(index, 1);
    },
    deleteC(index, index1) {
      this.Question.questionList[index].optionList.splice(index1, 1);
    },
    gotoAdd(name) {
      console.log(name);
      let list = name.split("+");
      let dimensionId = parseInt(list[0]);
      let dimensionName = list[1];
      console.log(list);
      let k = 1;
      this.Question.questionList[this.index].dimensionList.forEach(item => {
        if (item.dimensionId == dimensionId) {
          k = 2;
        }
      });
      if (k == 2) {
        this.$Message.error("已存在维度!!!");
      }
      if (k == 1) {
        this.Question.questionList[this.index].dimensionList.push({
          dimensionId: dimensionId,
          dimensionName: dimensionName
        });
      }
      console.log("Question", this.Question.questionList);
    },
    getIndex(index) {
      console.log(index);
      this.index = index;
    },
    addExplain(index4, index5) {
      this.weidulist[index4].scoreExplanList.splice(index5 + 1, 0, {
        beginScore: "",
        endScore: "",
        explan: ""
      });
      this.$forceUpdate();
      console.log(this.weidulist);
    },
    deleteE(index4, index5) {
      this.weidulist[index4].scoreExplanList.splice(index5, 1);
      this.$forceUpdate();
      console.log(this.weidulist);
    },
    goback() {
      this.$router.go(-1);
    },
    change() {
      console.log("fjdkjfd", new data());
      this.reload = new data();
    }
  }
};
</script>
<style lang="scss" scoped>
.question {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 300px;
  .cover {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>