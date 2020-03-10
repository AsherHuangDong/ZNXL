<template>
  <div>
    <!-- 删除 -->
    <Modal v-model="model1" width="360" draggable @on-cancel="cancel1">
      <div style="text-align:center;margin-top:30px">
        <p style="font-size:20px;margin-bottom:5px">是否删除该条记录？</p>
        <p style="color:#104E8B">删除后不可恢复</p>
      </div>
      <div slot="footer" style="text-align:center">
        <Button style="width:100px" type="error" @click="ok">删除</Button>
        <Button style="width:100px" @click="cancel">取消</Button>
      </div>
    </Modal>

    <!-- 新增资源 -->
    <Modal v-model="modelA" width="700" draggable @on-cancel="cancel1">
      <p slot="header">
        <span v-if="name==0" style="font-size:20px">新增音频资源</span>
        <span v-if="name==1" style="font-size:20px">新增视频资源</span>
        <span v-if="name==2" style="font-size:20px">新增电子书资源</span>
      </p>
      <div class="modalA">
        <div class="title">
          <span style="color:#104E8B;margin-right:20px">标题</span>
          <Input v-model="newResource.title" placeholder="预设提示文字" style="width:200px"></Input>
        </div>

        <div class="cover">
          <div>
            <span style="color:#104E8B;margin-right:20px">封面</span>
            <Button
              icon="md-add"
              style="width:100px;height:100px;background:#eee;margin-right:10px"
              type="dashed"
              @click="addimg"
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
          </div>

          <div class="imgSrc">
            <div
              style="width:100px;height:100px;border:1px solid black;border-style:dotted;"
              v-if="imgSrc"
            >
              <img style="width:100px;height:100px" :src="imgSrc" />
            </div>
          </div>
        </div>
        <div style="margin-left:50px;margin-bottom:10px">
          <span style="color:#ccc;margin-right:70px">支持扩展名：.jpg .jpeg .png ...，建议图片尺寸</span>
        </div>
        <div class="file">
          <div>
            <span style="color:#104E8B;margin-right:20px">文件</span>
            <Button icon="ios-cloud-upload-outline" @click="addFile" style="margin-right:20px">上传文件</Button>
            <input
              id="addMusic"
              type="file"
              style="opacity: 0;height: 0;width: 0"
              accept=".mp3, .wav, .wma, .flac"
            />
            <input
              id="addVideo"
              type="file"
              style="opacity: 0;height: 0;width: 0"
              accept=".mp4, .avi, .wmv, .mkv"
            />
            <input
              id="addBook"
              type="file"
              style="opacity: 0;height: 0;width: 0"
              accept=".zip, .rar"
            />
          </div>
        </div>

        <!-- <div v-if="name==2">
          <div>
            <span style="color:#104E8B;margin-right:10px">电子书URL</span>
            <Input v-model="bookPath" placeholder="预设提示文字" style="width:400px"></Input>
          </div>
        </div>-->

        <div>
          <span
            v-if="name==0"
            style="color:#ccc;margin-left:50px"
          >支持扩展名：.mp3 .wav .wma .flac ...，建议文件大小不超过100M</span>
          <span
            v-if="name==1"
            style="color:#ccc;margin-left:50px"
          >支持扩展名：.mp4 .avi .wmv .mkv ...，建议文件大小不超过100M</span>
          <span v-if="name==2" style="color:#ccc;margin-left:50px">支持扩展名：.zip .rar ...，建议文件大小不超过100M</span>
          <div v-if="fileList" style="margin-left:50px">
            <span>{{fileList.name}}</span>
          </div>
        </div>
      </div>
      <div slot="footer" style="text-align:center">
        <Button style="width:100px" type="primary" @click="okAdd">确认</Button>
        <Button style="width:100px" @click="cancelAdd">取消</Button>
      </div>
    </Modal>

    <!-- 编辑资源 -->
    <Modal v-model="modelE" width="700" draggable @on-cancel="cancel1">
      <p slot="header">
        <span v-if="name==0" style="font-size:20px">编辑音频资源</span>
        <span v-if="name==1" style="font-size:20px">编辑视频资源</span>
        <span v-if="name==2" style="font-size:20px">编辑电子书资源</span>
      </p>

      <div class="modalE">
        <div class="title">
          <span style="color:#104E8B;margin-right:20px">标题</span>
          <Input v-model="fileEdit.title" placeholder="预设提示文字" style="width:200px"></Input>
        </div>

        <div class="cover">
          <div>
            <span style="color:#104E8B;margin-right:20px">封面</span>
            <Button
              icon="md-add"
              style="width:100px;height:100px;background:#eee;margin-right:10px"
              type="dashed"
              @click="editImg"
            >
              <br />
              <span style="margin-top:10px">上传</span>
            </Button>
            <input
              id="editImg"
              type="file"
              style="opacity: 0;height: 0;width: 0"
              accept=".png, .jpg, .jpeg"
            />
          </div>

          <div class="imgSrc">
            <div
              style="width:100px;height:100px;border:1px solid black;border-style:dotted;"
              v-if="imgSrc"
            >
              <img style="width:100px;height:100px" :src="imgSrc" />
            </div>
          </div>
        </div>
        <div style="margin-left:50px;margin-bottom:10px">
          <span style="color:#ccc;margin-right:70px">支持扩展名：.jpg .jpeg .png ...，建议图片尺寸</span>
        </div>
        <div class="file">
          <div>
            <span style="color:#104E8B;margin-right:20px">文件</span>
            <Button icon="ios-cloud-upload-outline" @click="editFile" style="margin-right:20px">上传文件</Button>
            <input
              id="editMusic"
              type="file"
              style="opacity: 0;height: 0;width: 0"
              accept=".mp3, .wav, .wma, .flac"
            />
            <input
              id="editVideo"
              type="file"
              style="opacity: 0;height: 0;width: 0"
              accept=".mp4, .avi, .wmv, .mkv"
            />
            <input
              id="editBook"
              type="file"
              style="opacity: 0;height: 0;width: 0"
              accept=".zip, .rar"
            />
          </div>
        </div>

        <!-- <div v-if="name==2">
          <div>
            <span style="color:#104E8B;margin-right:10px">电子书URL</span>
            <Input v-model="bookPath" placeholder="预设提示文字" style="width:400px"></Input>
          </div>
        </div>-->

        <div>
          <span
            v-if="name==0"
            style="color:#ccc;margin-left:50px"
          >支持扩展名：.mp3 .wav .wma .flac ...，建议文件大小不超过100M</span>
          <span
            v-if="name==1"
            style="color:#ccc;margin-left:50px"
          >支持扩展名：.mp4 .avi .wmv .mkv ...，建议文件大小不超过100M</span>
          <span v-if="name==2" style="color:#ccc;margin-left:50px">支持扩展名：.zip .rar ...，建议文件大小不超过100M</span>
          <div v-if="fileList" style="margin-left:50px">
            <span>{{fileList.name}}</span>
          </div>
        </div>
      </div>
      <div slot="footer" style="text-align:center">
        <Button style="width:100px" type="primary" @click="okEdit">确认</Button>
        <Button style="width:100px" @click="cancelEdit">取消</Button>
      </div>
    </Modal>

    <Tabs type="card" v-model="type" @on-click="change">
      <TabPane label="音频资源">
        <Row>
          <Col span="20">
            <span style="margin-right:10px">标题</span>
            <Input v-model="showAllProductParams.title" style="width:200px"></Input>
          </Col>
          <Col span="4">
            <Button type="primary" style="margin-right:20px" @click="getSearch">搜索</Button>
            <Button type="info" @click="Add">新增</Button>
          </Col>
        </Row>
        <br />
        <Table border :columns="columns1" :data="data1">
          <template slot-scope="{ row, index }" slot="product">
            <div style="text-align:center">
              <img :src="row.cover" style="width:40px;height:40px;margin-top:10px" />
            </div>
          </template>
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
              :total="total1"
              :current="showAllProductParams.page"
              :page-size="showAllProductParams.pageSize"
              show-total
              show-sizer
              show-elevator
              @on-change="changePage"
              @on-page-size-change="changePageSize"
            ></Page>
          </Col>
        </Row>
      </TabPane>

      <TabPane label="视频资源">
        <Row>
          <Col span="20">
            <span style="margin-right:10px">标题</span>
            <Input v-model="showAllProductParams.title" style="width:200px"></Input>
          </Col>
          <Col span="4">
            <Button type="primary" style="margin-right:20px" @click="getSearch">搜索</Button>
            <Button type="info" @click="Add">新增</Button>
          </Col>
        </Row>
        <br />
        <Table border :columns="columns2" :data="data2">
          <template slot-scope="{ row, index }" slot="product">
            <div style="text-align:center">
              <img :src="row.cover" style="width:40px;height:40px;margin-top:10px" />
            </div>
          </template>
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
              :total="total2"
              :current="showAllProductParams.page"
              :page-size="showAllProductParams.pageSize"
              show-total
              show-sizer
              show-elevator
              @on-change="changePage"
              @on-page-size-change="changePageSize"
            ></Page>
          </Col>
        </Row>
      </TabPane>

      <TabPane label="电子书资源">
        <Row>
          <Col span="20">
            <span style="margin-right:10px">标题</span>
            <Input v-model="showAllProductParams.title" style="width:200px"></Input>
          </Col>
          <Col span="4">
            <Button type="primary" style="margin-right:20px" @click="getSearch">搜索</Button>
            <Button type="info" @click="Add">新增</Button>
          </Col>
        </Row>
        <br />
        <Table border :columns="columns3" :data="data3">
          <template slot-scope="{ row, index }" slot="product">
            <div style="text-align:center">
              <img :src="row.cover" style="width:40px;height:40px;margin-top:10px" />
            </div>
          </template>
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
              :total="total3"
              :current="showAllProductParams.page"
              :page-size="showAllProductParams.pageSize"
              show-total
              show-sizer
              show-elevator
              @on-change="changePage"
              @on-page-size-change="changePageSize"
            ></Page>
          </Col>
        </Row>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
export default {
  name: "mediaResource",
  data() {
    return {
      type: 0,
      model1: false,
      modelA: false,
      modelE: false,
      imgSrc: "",
      fileList: {},
      bookName: "book",
      bookPath: "",
      name: 0,
      fileEdit: {
        id: "",
        title: "",
        cover: "",
        type: 0,
        fileList: {}
      },
      newResource: {
        title: "",
        cover: "",
        type: 0,
        fileList: []
      },
      showAllProductParams: {
        type: 0,
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
              params.index +
                (this.showAllProductParams.page - 1) *
                  this.showAllProductParams.pageSize +
                1
            );
          }
        },
        {
          title: "标题",
          key: "title",
          align: "center"
        },
        {
          title: "封面缩略图",
          align: "center",
          slot: "product"
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
      total1: 0,
      columns2: [
        {
          title: "序号",
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              params.index +
                (this.showAllProductParams.page - 1) *
                  this.showAllProductParams.pageSize +
                1
            );
          }
        },
        {
          title: "标题",
          key: "title",
          align: "center"
        },
        {
          title: "封面缩略图",
          align: "center",
          slot: "product"
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
      data2: [],
      total2: 0,
      columns3: [
        {
          title: "序号",
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              params.index +
                (this.showAllProductParams.page - 1) *
                  this.showAllProductParams.pageSize +
                1
            );
          }
        },
        {
          title: "标题",
          key: "title",
          align: "center"
        },
        {
          title: "封面缩略图",
          align: "center",
          slot: "product"
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
      data3: [],
      total3: 0
    };
  },
  methods: {
    getData() {
      let name = this.name;
      this.newResource.type = this.name + 1;
      this.fileEdit.type = this.name + 1;
      this.showAllProductParams.type = this.name + 1;
      if (name == 0) {
        this.$axios
          .post("/api/resource/getResourceList", {
            type: 1,
            page: 1,
            pageSize: 10
          })
          .then(res => {
            console.log(res);
            this.data1 = res.data.data.records;
            this.total1 = res.data.data.total;
          });
      }
      if (name == 1) {
        this.$axios
          .post("/api/resource/getResourceList", {
            type: 2,
            page: 1,
            pageSize: 10
          })
          .then(res => {
            console.log(res);
            this.data2 = res.data.data.records;
            this.total2 = res.data.data.total;
          });
      }
      if (name == 2) {
        this.$axios
          .post("/api/resource/getResourceList", {
            type: 3,
            page: 1,
            pageSize: 10
          })
          .then(res => {
            console.log(res);
            this.data3 = res.data.data.records;
            this.total3 = res.data.data.total;
          });
      }
    },
    getSearch() {
      if (this.showAllProductParams.type == 1) {
        this.$axios
          .post("api/resource/getResourceList", this.showAllProductParams)
          .then(res => {
            console.log(res);
            this.data1 = res.data.data.records;
            this.total1 = res.data.data.total;
          });
      }
      if (this.showAllProductParams.type == 2) {
        this.$axios
          .post("api/resource/getResourceList", this.showAllProductParams)
          .then(res => {
            console.log(res);
            this.data2 = res.data.data.records;
            this.total2 = res.data.data.total;
          });
      }
      if (this.showAllProductParams.type == 3) {
        this.$axios
          .post("api/resource/getResourceList", this.showAllProductParams)
          .then(res => {
            console.log(res);
            this.data3 = res.data.data.records;
            this.total3 = res.data.data.total;
          });
      }
    },
    changePage(page) {
      this.showAllProductParams.page = page;
      this.getSearch();
    },
    changePageSize(pageSize) {
      this.showAllProductParams.pageSize = pageSize;
      this.getSearch();
    },
    Delete() {
      this.model1 = true;
    },
    Add() {
      this.modelA = true;
    },
    toEdit(id) {
      this.modelE = true;
      console.log(id);
      this.$axios.post("api/resource/getResource", { id: id }).then(res => {
        console.log(res);
        let str = "http://psychic.zhineng.talkingcake.cn/file/";
        this.fileEdit.id = id;
        this.fileEdit.title = res.data.data.title;
        this.fileEdit.cover = res.data.data.cover;
        this.imgSrc = res.data.data.cover;
        this.fileEdit.cover = res.data.data.cover.replace(str, "");
        this.fileList.name = res.data.data.resourceFileList[0].fileName;
        this.fileList.path = res.data.data.resourceFileList[0].filePath;
        // this.bookName = res.data.data.resourceFileList[0].fileName;
        // this.bookPath = res.data.data.resourceFileList[0].filePath;
        console.log("cover", this.fileEdit.cover);
        console.log("fileList", this.fileList);
        console.log("imgSrc", this.imgSrc);
      });
    },
    addimg() {
      const self = this;
      let addMainImg = document.getElementById("addMainImg");
      addMainImg.click();
      console.log("addMainImg", addMainImg);
      addMainImg.onchange = function(e) {
        console.log("lllllll");
        let form = new FormData();
        form.append("img", this.files[0]);
        self.$axios.post("api/file/upload", form).then(res => {
          console.log(res.data);
          self.newResource.cover = res.data.data.filePath;
        });
        const oFReader = new FileReader();
        oFReader.readAsDataURL(this.files[0]);
        oFReader.onload = function(oFREvent) {
          console.log("oFREvent", oFREvent);
          self.imgSrc = oFREvent.target.result; // base64
        };
      };
    },
    addFile() {
      const self = this;
      let addFile = "";
      if (self.name == 0) {
        addFile = document.getElementById("addMusic");
      }
      if (self.name == 1) {
        addFile = document.getElementById("addVideo");
      }
      if (self.name == 2) {
        addFile = document.getElementById("addBook");
      }
      let url = "";
      if (self.name == 2) {
        url = "/api/file/uploadUnzip";
      } else {
        url = "api/file/upload";
      }
      console.log("name", self.name);
      console.log("addFile", addFile);
      addFile.click();
      addFile.onchange = function(e) {
        console.log(this.files);
        for (let i = 0; i < this.files.length; i++) {
          let form = new FormData();
          form.append("img", this.files[i]);
          self.$axios.post(url, form).then(res => {
            console.log(res.data);
            self.newResource.fileList = res.data.data;
            self.fileList = res.data.data;
          });
        }
      };
    },
    editImg() {
      const self = this;
      let editImg = document.getElementById("editImg");
      editImg.click();
      editImg.onchange = function(e) {
        let form = new FormData();
        form.append("img", this.files[0]);
        self.$axios.post("api/file/upload", form).then(res => {
          console.log(res.data);
          self.fileEdit.cover = res.data.data.filePath;
          console.log(self.fileEdit.cover);
        });
        const oFReader = new FileReader();
        oFReader.readAsDataURL(this.files[0]);
        oFReader.onload = function(oFREvent) {
          self.imgSrc = oFREvent.target.result; // base64
        };
      };
    },
    editFile() {
      const self = this;
      let editFile = "";
      if (self.name == 0) {
        editFile = document.getElementById("editMusic");
      }
      if (self.name == 1) {
        editFile = document.getElementById("editVideo");
      }
      if (self.name == 2) {
        editFile = document.getElementById("editBook");
      }
      let url = "";
      if (self.name == 2) {
        url = "/api/file/uploadUnzip";
      } else {
        url = "api/file/upload";
      }
      console.log("editFile", editFile);
      editFile.click();
      editFile.onchange = function(e) {
        let form = new FormData();
        form.append("img", this.files[0]);
        self.$axios.post(url, form).then(res => {
          console.log(res.data);
          self.fileList = res.data.data;
          console.log("fileList", self.fileList);
        });
      };
    },
    okAdd() {
      console.log(this.newResource);
      // if (this.name == 0 || this.name == 1) {
      if (this.name == 2) {
        this.newResource.fileList = [
          {
            path: this.newResource.fileList.path,
            name: this.newResource.fileList.name
          }
        ];
      } else {
        this.newResource.fileList = [
          {
            path: this.newResource.fileList.filePath,
            name: this.newResource.fileList.name
          }
        ];
      }
      //}
      // if (this.name == 2) {
      //   this.newResource.fileList = [
      //     {
      //       path: this.bookPath,
      //       name: this.bookName
      //     }
      //   ];
      // }
      console.log("newResource", this.newResource);
      if (!this.newResource.title) {
        this.$Message.info("请输入标题");
        return false;
      }
      if (!this.newResource.cover) {
        this.$Message.info("请上传封面");
        return false;
      }
      // if (this.name != 2) {
      if (
        this.newResource.fileList[0].path == undefined ||
        this.newResource.fileList[0].name == undefined
      ) {
        this.$Message.info("请上传文件");
        return false;
      }
      //} else {
      // if (this.newResource.fileList[0].path == "") {
      //   this.$Message.info("请输入URL地址");
      //   return false;
      //}
      //}
      this.$axios
        .post("api/resource/addResource", this.newResource)
        .then(res => {
          console.log(res);
          if (res.data.code == 0) {
            this.modelA = false;
            this.$Message.success("添加成功!");
            this.newResource.title = "";
            this.fileList = {};
            this.imgSrc = "";
            this.bookPath = "";
            this.getSearch();
          } else {
            this.$Message.error(res.data.msg);
          }
        });
    },
    cancelAdd() {
      this.modelA = false;
      this.imgSrc = "";
      this.fileList = {};
      this.newResource.title = "";
      this.bookPath = "";
      this.$Message.info("用户点击了取消!");
    },
    okEdit() {
      console.log(this.bookPath);
      let str = "http://test.psychic.zhineng.talkingcake.cn/file/";
      let str1 = "http://psychic.zhineng.talkingcake.cn/file/";
      console.log("fileList", this.fileList);
      this.fileEdit.cover = this.fileEdit.cover.replace(str, "");
      this.fileEdit.cover = this.fileEdit.cover.replace(str1, "");
      console.log("cover", this.fileEdit.cover);
      // if (this.name != 2) {
      let path = this.fileList.path.replace(str, "");
      path = path.replace(str1, "");
      if (this.name == 2) {
        this.fileEdit.fileList = [
          {
            path: this.fileList.path,
            name: this.fileList.name
          }
        ];
      } else {
        this.fileEdit.fileList = [
          {
            path: path,
            name: this.fileList.name
          }
        ];
      }
      //}
      // console.log(this.fileEdit);
      // if (this.name == 2) {
      //   console.log("fffff");
      //   this.fileEdit.fileList = [
      //     {
      //       path: this.bookPath,
      //       name: this.bookName
      //     }
      //   ];
      // }
      if (!this.fileEdit.title) {
        this.$Message.info("请输入标题");
        return false;
      }
      this.$axios.post("api/resource/editResource", this.fileEdit).then(res => {
        console.log(res);
        this.modelE = false;
        this.$Message.success("修改成功!");
        (this.fileList = {}), (this.imgSrc = "");
        this.bookPath = "";
        this.getSearch();
      });
    },
    cancelEdit() {
      (this.fileList = {}), (this.imgSrc = "");
      this.bookPath = "";
      this.$Message.info("用户点击了取消");
      this.modelE = false;
    },
    Delete(id) {
      this.model1 = true;
      this.deleteId = id;
    },
    ok() {
      console.log(this.deleteId);
      let id = this.deleteId;
      this.$axios.post("api/resource/deleteResource", { id: id }).then(res => {
        console.log(res);
        this.model1 = false;
        this.$Message.success("删除成功!");
        this.getData();
      });
    },
    cancel() {
      this.model1 = false;
      this.$Message.info("用户点击了取消！");
    },
    cancel1() {
      this.imgSrc = "";
    },
    change(name) {
      this.name = name;
      console.log(name);
      this.newResource.type = name + 1;
      this.fileEdit.type = name + 1;
      this.showAllProductParams.type = name + 1;
      if (name == 0) {
        this.$axios
          .post("/api/resource/getResourceList", {
            type: 1,
            page: this.showAllProductParams.page,
            pageSize: this.showAllProductParams.pageSize
          })
          .then(res => {
            console.log(res);
            this.data1 = res.data.data.records;
            this.total1 = res.data.data.total;
          });
      }
      if (name == 1) {
        this.$axios
          .post("/api/resource/getResourceList", {
            type: 2,
            page: this.showAllProductParams.page,
            pageSize: this.showAllProductParams.pageSize
          })
          .then(res => {
            console.log(res);
            this.data2 = res.data.data.records;
            this.total2 = res.data.data.total;
          });
      }
      if (name == 2) {
        this.$axios
          .post("/api/resource/getResourceList", {
            type: 3,
            page: this.showAllProductParams.page,
            pageSize: this.showAllProductParams.pageSize
          })
          .then(res => {
            console.log(res);
            this.data3 = res.data.data.records;
            this.total3 = res.data.data.total;
          });
      }
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style lang="scss" scoped>
.modalA {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 100px;
  .cover {
    margin-top: 10px;
    display: inherit;
    justify-content: flex-start;
    align-items: center;
  }
}
.modalE {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 100px;
  .cover {
    margin-top: 10px;
    display: inherit;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>