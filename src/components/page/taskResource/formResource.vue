<template>
  <div id="form">
    <Modal v-model="modelD" width="360">
      <div style="text-align:center;margin-top:30px">
        <p style="font-size:20px;margin-bottom:5px">是否删除该条记录？</p>
        <p style="color:#104E8B">删除后不可恢复</p>
      </div>
      <div slot="footer" style="text-align:center">
        <Button style="width:100px" type="error" @click="okD">删除</Button>
        <Button style="width:100px" @click="cancelD">取消</Button>
      </div>
    </Modal>

    <Modal v-model="modelF" width="800" draggable @on-cancel="cancel1" :transfer="false">
      <p slot="header">
        <span v-if="type==1" style="font-size:20px">新增表格类表单</span>
        <span v-if="type==2" style="font-size:20px">编辑表格类表单</span>
      </p>
      <div style="text-align:center">
        <Row>
          <Col span="24">
            <div style="float:left;margin-left:100px">
              <span style="color:#104E8B;margin-right:20px">标题</span>
              <Input
                v-if="type==1"
                placeholder="预设提示文字"
                style="width:200px"
                v-model="addForm.title"
              ></Input>
              <Input
                v-if="type==2"
                placeholder="预设提示文字"
                style="width:200px"
                v-model="editForm.title"
              ></Input>
            </div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span="8">
            <div style="float:left;margin-left:100px">
              <span style="color:#104E8B;margin-right:20px">封面</span>
              <Button
                icon="md-add"
                style="width:100px;height:100px;background:#eee;"
                type="dashed"
                @click="addimg"
              >
                <br />
                <span style="margin-top:10px">上传</span>
              </Button>
              <input
                v-if="type==1"
                id="addMainImg"
                type="file"
                style="opacity: 0;height: 0;width: 0"
                accept=".png, .jpg, .jpeg"
              />
              <input
                v-if="type==2"
                id="editMainImg"
                type="file"
                style="opacity: 0;height: 0;width: 0"
                accept=".png, .jpg, .jpeg"
              />
            </div>
          </Col>
          <Col span="16">
            <div
              style="width:100px;height:100px;border:1px solid black;border-style:dotted;"
              v-if="imgSrc"
            >
              <img style="width:100px;height:100px" :src="imgSrc" />
            </div>
          </Col>
        </Row>
        <Row>
          <Col span="24">
            <span style="color:#ccc;margin-right:180px">支持扩展名：.jpg .jpeg .png ...，建议图片尺寸</span>
          </Col>
        </Row>
        <Row>
          <Col span="5">
            <span style="color:#104E8B;margin-left:80px">引导语</span>
          </Col>
          <Col span="19">
            <VueEditor
              v-if="type==1"
              v-model="addForm.introduce"
              useCustomImageHandler
              @image-added="handleImageAdded"
              style="width:600px;"
            ></VueEditor>
            <VueEditor
              v-if="type==2"
              v-model="editForm.introduce"
              useCustomImageHandler
              @image-added="handleImageAdded"
              style="width:600px;"
            ></VueEditor>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span="24">
            <div style="float:left;margin-left:100px">
              <span style="color:#104E8B;margin-right:20px">横轴</span>
              <Input v-if="type==1" v-model="addForm.x" placeholder="表头之间用逗号隔开" style="width:400px"></Input>
              <Input
                v-if="type==2"
                v-model="editForm.x"
                placeholder="表头之间用逗号隔开"
                style="width:400px"
              ></Input>
            </div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span="24">
            <div style="float:left;margin-left:100px">
              <span style="color:#104E8B;margin-right:20px">纵轴</span>
              <Input v-if="type==1" v-model="addForm.y" placeholder="表头之间用逗号隔开" style="width:400px"></Input>
              <Input
                v-if="type==2"
                v-model="editForm.y"
                placeholder="表头之间用逗号隔开"
                style="width:400px"
              ></Input>
            </div>
          </Col>
        </Row>
      </div>

      <div slot="footer" style="text-align:center">
        <Button style="width:100px" type="primary" @click="okF">确认</Button>
        <Button style="width:100px" @click="cancelF">取消</Button>
      </div>
    </Modal>

    <Modal v-model="modelQ" width="800" draggable @on-cancel="cancel1" :transfer="false">
      <p slot="header">
        <span v-if="type1==1" style="font-size:20px">新增问卷类表单</span>
        <span v-if="type1==2" style="font-size:20px">编辑问卷类表单</span>
      </p>
      <div v-if="type1==1" style="text-align:center">
        <Form ref="addQuestion" :model="addQuestion" :label-width="80">
          <FormItem prop="title">
            <template slot="label">
              <div style="color:#104E8B">标题</div>
            </template>
            <Input v-model="addQuestion.title" placeholder="预设文字输入"></Input>
          </FormItem>
          <FormItem prop="introduce">
            <template slot="label">
              <div style="color:#104E8B">引导语</div>
            </template>
            <VueEditor v-model="addQuestion.introduce" useCustomImageHandler  @image-added="handleImageAdded"></VueEditor>
          </FormItem>

          <FormItem prop="cover">
            <template slot="label">
              <div style="color:#104E8B">封面</div>
            </template>
            <div
              style="text-align:left;display:flex;justify-content:flex-start;align-item:flex-start"
            >
              <Button
                icon="md-add"
                style="width:100px;height:100px;background:#eee;"
                type="dashed"
                @click="addimg1"
              >
                <br />
                <span style="margin-top:10px">上传</span>
              </Button>
              <input
                id="addMainImg1"
                type="file"
                style="opacity: 0;height: 0;width: 0"
                accept=".png, .jpg, .jpeg"
              />
              <div
                style="width:100px;height:100px;border:1px solid black;border-style:dotted;display:inline-block;margin-left:10px"
                v-if="imgSrc"
              >
                <img style="width:100px;height:100px" :src="imgSrc" />
              </div>
            </div>
          </FormItem>

          <FormItem prop="mapList">
            <template slot="label">
              <div style="color:#104E8B">题目</div>
            </template>
            <div v-for="(item,index) in addQuestion.mapList" :key="index">
              <div style="display:flex;justify-content:flex-start;align-item:flex-start">
                <div style="width:80px;text-align:right;color:#104E8B">{{index+1}}.题干:</div>
                <div style="width:600px">
                  <Input style="display:inline-block;width:500px" v-model="item.questionName"></Input>
                  <Button
                    style="display:inline-block;height:34px"
                    type="info"
                    @click="addTitle(index)"
                  >+添加</Button>
                </div>
              </div>

              <div style="display:flex;justify-content:flex-start;align-item:flex-start">
                <div style="width:80px;text-align:right;color:#104E8B">输入项:</div>
                <div style="width:600px">
                  <div style="width:500px;text-align:left;margin-left:15px">
                    <Tag
                      v-for="(item1,index2) in item.initemList"
                      :key="item1"
                      :name="index2"
                      closable
                      @on-close="handleClose(index,index2)"
                    >{{item1}}</Tag>
                  </div>
                  <div style="width:80px;text-align:left;margin-left:15px" @click="addPrint(index)">
                    <a style="color:blue;">添加输入项</a>
                  </div>
                  <Modal v-model="showInput" :closable="false">
                    <Input placeholder="请输入名称" v-model="print"></Input>
                    <div slot="footer" style="text-align:center">
                      <Button style="width:100px" type="primary" @click="ok">确认</Button>
                      <Button style="width:100px" @click="cancel">取消</Button>
                    </div>
                  </Modal>
                </div>
              </div>
            </div>
          </FormItem>
        </Form>
      </div>

      <div v-if="type1==2" style="text-align:center">
        <Form ref="editQuestion" :model="editQuestion" :label-width="80">
          <FormItem prop="title">
            <template slot="label">
              <div style="color:#104E8B">标题</div>
            </template>
            <Input v-model="editQuestion.title" placeholder="预设文字输入"></Input>
          </FormItem>
          <FormItem prop="introduce">
            <template slot="label">
              <div style="color:#104E8B">引导语</div>
            </template>
            <VueEditor v-model="editQuestion.introduce" useCustomImageHandler  @image-added="handleImageAdded"></VueEditor>
          </FormItem>

          <FormItem prop="cover">
            <template slot="label">
              <div style="color:#104E8B">封面</div>
            </template>
            <div
              style="text-align:left;display:flex;justify-content:flex-start;align-item:flex-start"
            >
              <Button
                icon="md-add"
                style="width:100px;height:100px;background:#eee;"
                type="dashed"
                @click="addimg1"
              >
                <br />
                <span style="margin-top:10px">上传</span>
              </Button>
              <input
                id="addMainImg1"
                type="file"
                style="opacity: 0;height: 0;width: 0"
                accept=".png, .jpg, .jpeg"
              />
              <div
                style="width:100px;height:100px;border:1px solid black;border-style:dotted;display:inline-block;margin-left:10px"
                v-if="imgSrc"
              >
                <img style="width:100px;height:100px" :src="imgSrc" />
              </div>
            </div>
          </FormItem>

          <FormItem prop="mapList">
            <template slot="label">
              <div style="color:#104E8B">题目</div>
            </template>
            <div v-for="(item,index) in editQuestion.mapList" :key="index">
              <div style="display:flex;justify-content:flex-start;align-item:flex-start">
                <div style="width:80px;text-align:right;color:#104E8B">{{index+1}}.题干:</div>
                <div style="width:600px">
                  <Input style="display:inline-block;width:500px" v-model="item.questionName"></Input>
                  <Button
                    style="display:inline-block;height:34px"
                    type="info"
                    @click="addTitle(index)"
                  >+添加</Button>
                </div>
              </div>

              <div style="display:flex;justify-content:flex-start;align-item:flex-start">
                <div style="width:80px;text-align:right;color:#104E8B">输入项:</div>
                <div style="width:600px">
                  <div style="width:500px;text-align:left;margin-left:15px">
                    <Tag
                      v-for="(item1,index2) in item.initemList"
                      :key="item1"
                      :name="index2"
                      closable
                      @on-close="handleClose(index,index2)"
                    >{{item1}}</Tag>
                  </div>
                  <div style="width:80px;text-align:left;margin-left:15px" @click="addPrint(index)">
                    <a style="color:blue;">添加输入项</a>
                  </div>
                  <Modal v-model="showInput" :closable="false">
                    <Input placeholder="请输入名称" v-model="print"></Input>
                    <div slot="footer" style="text-align:center">
                      <Button style="width:100px" type="primary" @click="ok">确认</Button>
                      <Button style="width:100px" @click="cancel">取消</Button>
                    </div>
                  </Modal>
                </div>
              </div>
            </div>
          </FormItem>
        </Form>
      </div>
      <div slot="footer" style="text-align:center">
        <Button style="width:100px" type="primary" @click="okQ">确认</Button>
        <Button style="width:100px" @click="cancelQ">取消</Button>
      </div>
    </Modal>

    <Row>
      <Col span="20">
        <span style="margin-right:10px">标题</span>
        <Input style="width:200px" v-model="getdata.title"></Input>
      </Col>
      <Col span="4">
        <Button type="primary" style="margin-right:20px" @click="getData">搜索</Button>
        <Dropdown @on-click="gotoAdd">
          <Button type="info">新增</Button>
          <DropdownMenu slot="list">
            <DropdownItem name="addForm">新增表格类</DropdownItem>
            <DropdownItem name="addQuestionnaire">新增问答类</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </Col>
    </Row>
    <br />

    <Table border :columns="columns1" :data="data1">
      <template slot-scope="{ row, index }" slot="product">
        <div style="display:flex">
          <img :src="row.product.outImgUrl" style="width:40px;height:40px;margin-right:5px;" alt />
        </div>
      </template>
      <template slot-scope="{ row, index }" slot="edit">
        <a
          size="small"
          type="primary"
          @click="toEdit(row.id,row.type)"
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
import { VueEditor } from "vue2-editor";
export default {
  name: "formResource",
  components: { VueEditor },
  data() {
    return {
      index: "",
      index1: "",
      formValidate: {},
      page: 1,
      pageSize: 10,
      modelF: false,
      modelQ: false,
      modelEF: false,
      modelEQ: false,
      modelD: false,
      showInput: false,
      print: "",
      deletId: "",
      imgSrc: "",
      type: 1,
      type1: 1,
      addForm: {
        title: "",
        cover: "",
        introduce: "",
        x: "",
        y: ""
      },
      addForm1: {
        title: "",
        cover: "",
        introduce: "",
        x: [],
        y: []
      },
      addQuestion: {
        title: "",
        introduce: "",
        cover: "",
        mapList: [
          {
            questionName: "",
            initemList: []
          }
        ]
      },
      editForm: {
        id: "",
        title: "",
        cover: "",
        introduce: "",
        x: "",
        y: ""
      },
      editQuestion: {
        title: "",
        introduce: "",
        cover: "",
        mapList: []
      },
      getdata: {
        title: "",
        page: 1,
        pageSize: 10
      },
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
          title: "表单标题",
          key: "title",
          align: "center"
        },
        {
          title: "类型",
          key: "type",
          align: "center",
          render(h, param) {
            let str = "";
            if (param.row.type == 1) {
              str = "表格类";
            }
            if (param.row.type == 2) {
              str = "问答类";
            }
            return h("span", {}, str);
          }
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
    getData() {
      this.$axios.post("api/form/getFormList", this.getdata).then(res => {
        console.log(res);
        this.data1 = res.data.data.records;
        this.total = res.data.data.total;
      });
    },
    gotoAdd(name) {
      if (name == "addForm") {
        this.modelF = true;
        this.type = 1;
        this.addForm = {
          title: "",
          cover: "",
          introduce: "",
          x: "",
          y: ""
        };
      }
      if (name == "addQuestionnaire") {
        this.modelQ = true;
        this.type1 = 1;
        console.log(this.addQuestion);
        this.addQuestion = {
          title: "",
          introduce: "",
          cover: "",
          mapList: [
            {
              questionName: "",
              initemList: []
            }
          ]
        };
      }
    },
    cancel1() {
      this.imgSrc = "";
    },
    //表格类新增和编辑
    okF() {
      let self = this;
      let obj = {
        title: "",
        cover: "",
        introduce: "",
        x: "",
        y: ""
      };
      console.log(this.type);
      if (this.type == 1) {
        console.log("add");
        console.log(this.addForm);
        if (!this.addForm.title) {
          this.$Message.info("请输入标题");
          return false;
        }
        if (!this.addForm.cover) {
          this.$Message.info("请上传封面");
          return false;
        }
        if (!this.addForm.introduce) {
          this.$Message.info("请输入引导语");
          return false;
        }
        if (!this.addForm.x) {
          this.$Message.info("请输入横轴");
          return false;
        }
        if (!this.addForm.y) {
          this.$Message.info("请输入纵轴");
          return false;
        }
        this.addForm1 = JSON.parse(JSON.stringify(this.addForm));
        this.addForm1.x = this.Splitstr(this.addForm1.x);
        this.addForm1.y = this.Splitstr(this.addForm1.y);
        console.log(this.addForm1);
        this.$axios
          .post("api/formTable/addFormTable", this.addForm1)
          .then(res => {
            console.log(res);
            if (res.data.code == 0) {
              this.addForm = obj;
              this.imgSrc = "";
              this.$Message.success("添加成功!");
              this.modelF = false;
              this.getData();
            } else {
              this.$Message.error(res.data.msg);
            }
          });
      }
      if (this.type == 2) {
        console.log(this.editForm);
        let str = "http://test.psychic.zhineng.talkingcake.cn/file/";
        let str1 = "http://psychic.zhineng.talkingcake.cn/file/";
        this.editForm.cover = this.editForm.cover.replace(str, "");
        this.editForm.cover = this.editForm.cover.replace(str1, "");
        if (
          this.editForm.title &&
          this.editForm.cover &&
          this.editForm.introduce &&
          this.editForm.x &&
          this.editForm.y
        ) {
          this.addForm1 = JSON.parse(JSON.stringify(this.editForm));
          this.addForm1.x = this.Splitstr(this.addForm1.x);
          this.addForm1.y = this.Splitstr(this.addForm1.y);
          console.log(this.addForm1);
          this.$axios
            .post("api/formTable/editFormTable", this.addForm1)
            .then(res => {
              console.log(res);
              this.getData();
              this.$Message.success("修改成功!");
              this.modelF = false;
            });
        } else {
          this.$Message.error("存在空选项,请将所有选项填写完毕重试！");
        }
      }
    },
    handleClose(index, index2) {
      if (this.type1 == 1) {
        this.addQuestion.mapList[index].initemList.splice(index2, 1);
      }
      if (this.type1 == 2) {
        this.editQuestion.mapList[index].initemList.splice(index2, 1);
      }
    },
    cancelF() {
      let obj = {
        title: "",
        cover: "",
        introduce: "",
        x: "",
        y: ""
      };
      this.addForm = obj;
      this.imgSrc = "";
      this.$Message.info("用户点击了取消");
      this.modelF = false;
    },
    addimg() {
      console.log("sssss");
      const self = this;
      if (this.type == 1) {
        let addMainImg = document.getElementById("addMainImg");
        addMainImg.click();
        addMainImg.onchange = function(e) {
          let form = new FormData();
          form.append("img", this.files[0]);
          self.$axios.post("api/file/upload", form).then(res => {
            console.log(res.data);
            self.addForm.cover = res.data.data.filePath;
          });
          const oFReader = new FileReader();
          oFReader.readAsDataURL(this.files[0]);
          oFReader.onload = function(oFREvent) {
            console.log(oFREvent);
            self.imgSrc = oFREvent.target.result; // base64
          };
        };
      }
      if (this.type == 2) {
        let editMainImg = document.getElementById("editMainImg");
        editMainImg.click();
        editMainImg.onchange = function(e) {
          let form = new FormData();
          form.append("img", this.files[0]);
          self.$axios.post("api/file/upload", form).then(res => {
            console.log(res.data);
            self.editForm.cover = res.data.data.filePath;
          });
          const oFReader = new FileReader();
          oFReader.readAsDataURL(this.files[0]);
          oFReader.onload = function(oFREvent) {
            console.log(oFREvent);
            self.imgSrc = oFREvent.target.result; // base64
          };
        };
      }
    },
    addimg1() {
      const self = this;
      if (this.type1 == 1) {
        let addMainImg1 = document.getElementById("addMainImg1");
        addMainImg1.click();
        addMainImg1.onchange = function(e) {
          let form = new FormData();
          form.append("img", this.files[0]);
          self.$axios.post("api/file/upload", form).then(res => {
            console.log(res.data);
            self.addQuestion.cover = res.data.data.filePath;
          });
          const oFReader = new FileReader();
          oFReader.readAsDataURL(this.files[0]);
          oFReader.onload = function(oFREvent) {
            console.log(oFREvent);
            self.imgSrc = oFREvent.target.result; // base64
          };
        };
      }
      if (this.type1 == 2) {
        let editMainImg1 = document.getElementById("editMainImg1");
        editMainImg1.click();
        editMainImg1.onchange = function(e) {
          let form = new FormData();
          form.append("img", this.files[0]);
          self.$axios.post("api/file/upload", form).then(res => {
            console.log(res.data);
            self.editQuestion.cover = res.data.data.filePath;
          });
          const oFReader = new FileReader();
          oFReader.readAsDataURL(this.files[0]);
          oFReader.onload = function(oFREvent) {
            console.log(oFREvent);
            self.imgSrc = oFREvent.target.result; // base64
          };
        };
      }
    },
    //问卷类新增和编辑
    okQ() {
      let obj = {
        title: "",
        introduce: "",
        cover: "",
        mapList: [
          {
            questionName: "",
            initemList: []
          }
        ]
      };
      if (this.type1 == 1) {
        let key = true;
        let initemList = true;
        this.addQuestion.mapList.forEach(item => {
          if (item.questionName == "") {
            key = false;
          }
          if (item.initemList.length == 0) {
            key = true;
          }
        });
        if (!this.addQuestion.title) {
          this.$Message.info("请输入标题");
          return false;
        }
        if (!this.addQuestion.cover) {
          this.$Message.info("请上传封面");
          return false;
        }
        if (!this.addQuestion.introduce) {
          this.$Message.info("请输入引导语");
          return false;
        }
        if (!key) {
          this.$Message.info("请输入题干");
          return false;
        }
        if (!initemList) {
          this.$Message.info("请添加输入项");
          return false;
        }
        this.$axios
          .post("api/form/addFormQuestion", this.addQuestion)
          .then(res => {
            console.log(res);
            if (res.data.code == 0) {
              this.$Message.success("添加成功！");
              this.addQuestion = obj;
              this.imgSrc = "";
              this.modelQ = false;
              console.log("addQuestion", this.addQuestion);
              this.getData();
            } else {
              this.$Message.error(res.data.msg);
            }
          });
      } else {
        let key = true;
        this.editQuestion.mapList.forEach(item => {
          if (item.questionName == "") {
            key = false;
          }
          if (!item.initemList) {
            key = false;
          }
        });
        let str = "http://test.psychic.zhineng.talkingcake.cn/file/";
        let str1 = "http://psychic.zhineng.talkingcake.cn/file/";
        this.editQuestion.cover = this.editQuestion.cover.replace(str, "");
        this.editQuestion.cover = this.editQuestion.cover.replace(str1, "");
        if (
          this.editQuestion.title &&
          this.editQuestion.introduce &&
          this.editQuestion.cover &&
          this.editQuestion.mapList &&
          key
        ) {
          this.$axios
            .post("api/form/editFormQuestion", this.editQuestion)
            .then(res => {
              console.log(res);
              this.$Message.success("修改成功！");
              this.modelQ = false;
              this.getData();
            });
        } else {
          this.$Message.error("请将所有选项填写完重试");
        }
      }
    },
    cancelQ() {
      let obj = {
        title: "",
        introduce: "",
        cover: "",
        mapList: [
          {
            questionName: "",
            initemList: []
          }
        ]
      };
      this.addQuestion = obj;
      this.imgSrc = "";
      this.modelQ = false;
      this.$Message.info("用户点击了取消");
    },
    changePage(page) {
      this.page = page;
      this.getData();
    },
    changePageSize(pageSize) {
      this.pageSize = pageSize;
      this.getData();
    },
    toEdit(id, type) {
      if (type == 1) {
        this.type = 2;
        this.modelF = true;
        this.$axios.post("api/formTable/getFormTable", { id: id }).then(res => {
          console.log(res);
          this.editForm = res.data.data;
          let x = "";
          let y = "";
          for (let i = 0; i < this.editForm.x.length; i++) {
            if (this.editForm.x.length == 1) {
              x += this.editForm.x[i];
            } else {
              if (i == this.editForm.x.length - 1) {
                x += this.editForm.x[i];
              } else {
                x += this.editForm.x[i] + ",";
              }
            }
          }
          for (let i = 0; i < this.editForm.y.length; i++) {
            if (this.editForm.y.length == 1) {
              y += this.editForm.y[i];
            } else {
              if (i == this.editForm.y.length - 1) {
                y += this.editForm.y[i];
              } else {
                y += this.editForm.y[i] + ",";
              }
            }
          }
          this.editForm.x = x;
          this.editForm.y = y;
          this.imgSrc = res.data.data.cover;
        });
      }
      if (type == 2) {
        this.type1 = 2;
        this.modelQ = true;
        this.$axios.post("api/form/getFormQuestion", { id: id }).then(res => {
          console.log(res);
          this.editQuestion = res.data.data;
          this.editQuestion.id = id;
          this.imgSrc = res.data.data.cover;
          console.log(this.editQuestion);
        });
      }
    },
    addPrint(index) {
      this.showInput = true;
      this.index = index;
    },

    Splitstr(str) {
      let str1 = str;
      str1 = str1.split(",");
      let list = [];
      str1.forEach(item => {
        if (item !== "") {
          list.push(item);
        }
      });
      return list;
    },

    Delete(id) {
      this.deletId = id;
      this.modelD = true;
    },
    okD() {
      let id = this.deletId;
      this.$axios
        .post("api/formTable/deleteFormTable", { id: id })
        .then(res => {
          console.log(res);
          this.getData();
          this.modelD = false;
          this.$Message.success("删除成功！");
        });
    },
    cancelD() {
      this.modelD = false;
      this.$Message.info("用户点击了取消!");
    },
    ok() {
      if (this.print) {
        if (this.type1 == 1) {
          this.addQuestion.mapList[this.index].initemList.push(this.print);
          this.showInput = false;
          this.print = "";
        } else {
          this.editQuestion.mapList[this.index].initemList.push(this.print);
          this.showInput = false;
          this.print = "";
        }
      } else {
        this.$Message.error("请输入名称！");
      }
    },
    cancel() {
      this.print = "";
      this.showInput = false;
    },
    addTitle(index) {
      if (this.type1 == 1) {
        this.addQuestion.mapList.splice(index + 1, 0, {
          questionName: "",
          initemList: []
        });
      }
      if (this.type1 == 2) {
        this.editQuestion.mapList.splice(index + 1, 0, {
          questionName: "",
          initemList: []
        });
      }
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
    this.getData();
  }
};
</script>
<style>
#form .ivu-modal-body {
  height: 500px;
  overflow-y: scroll;
}
</style>