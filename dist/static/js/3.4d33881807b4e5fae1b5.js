webpackJsonp([3],{a3Yh:function(t,e,a){"use strict";e.__esModule=!0;var i,o=a("liLe"),l=(i=o)&&i.__esModule?i:{default:i};e.default=function(t,e,a){return e in t?(0,l.default)(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}},faiR:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i,o=a("a3Yh"),l=a.n(o),s={name:"mediaResource",data:function(){var t=this;return{type:0,model1:!1,modelA:!1,modelE:!1,imgSrc:"",fileList:{},bookName:"book",bookPath:"",name:0,fileEdit:{id:"",title:"",cover:"",type:0,fileList:{}},newResource:{title:"",cover:"",type:0,fileList:{}},showAllProductParams:{type:0,title:"",page:1,pageSize:10},columns1:[{title:"序号",align:"center",render:function(e,a){return e("span",a.index+(t.showAllProductParams.page-1)*t.showAllProductParams.pageSize+1)}},{title:"标题",key:"title",align:"center"},{title:"封面缩略图",align:"center",slot:"product"},{title:"创建时间",key:"createTime",align:"center"},{title:"操作",align:"center",slot:"edit"}],data1:[],total1:0,columns2:[{title:"序号",align:"center",render:function(e,a){return e("span",a.index+(t.showAllProductParams.page-1)*t.showAllProductParams.pageSize+1)}},{title:"标题",key:"title",align:"center"},{title:"封面缩略图",align:"center",slot:"product"},{title:"创建时间",key:"createTime",align:"center"},{title:"操作",align:"center",slot:"edit"}],data2:[],total2:0,columns3:[{title:"序号",align:"center",render:function(e,a){return e("span",a.index+(t.showAllProductParams.page-1)*t.showAllProductParams.pageSize+1)}},{title:"标题",key:"title",align:"center"},{title:"封面缩略图",align:"center",slot:"product"},{title:"创建时间",key:"createTime",align:"center"},{title:"操作",align:"center",slot:"edit"}],data3:[],total3:0}},methods:(i={getData:function(){var t=this,e=this.name;this.newResource.type=this.name+1,this.fileEdit.type=this.name+1,this.showAllProductParams.type=this.name+1,0==e&&this.$axios.post("/api/resource/getResourceList",{type:1,page:1,pageSize:10}).then(function(e){console.log(e),t.data1=e.data.data.records,t.total1=e.data.data.total}),1==e&&this.$axios.post("/api/resource/getResourceList",{type:2,page:1,pageSize:10}).then(function(e){console.log(e),t.data2=e.data.data.records,t.total2=e.data.data.total}),2==e&&this.$axios.post("/api/resource/getResourceList",{type:3,page:1,pageSize:10}).then(function(e){console.log(e),t.data3=e.data.data.records,t.total3=e.data.data.total})},getSearch:function(){var t=this;1==this.showAllProductParams.type&&this.$axios.post("api/resource/getResourceList",this.showAllProductParams).then(function(e){console.log(e),t.data1=e.data.data.records,t.total1=e.data.data.total}),2==this.showAllProductParams.type&&this.$axios.post("api/resource/getResourceList",this.showAllProductParams).then(function(e){console.log(e),t.data2=e.data.data.records,t.total2=e.data.data.total}),3==this.showAllProductParams.type&&this.$axios.post("api/resource/getResourceList",this.showAllProductParams).then(function(e){console.log(e),t.data3=e.data.data.records,t.total3=e.data.data.total})},changePage:function(t){this.showAllProductParams.page=t,this.getSearch()},changePageSize:function(t){this.showAllProductParams.pageSize=t,this.getSearch()},Delete:function(){this.model1=!0},Add:function(){this.modelA=!0},toEdit:function(t){var e=this;this.modelE=!0,console.log(t),this.$axios.post("api/resource/getResource",{id:t}).then(function(a){console.log(a);e.fileEdit.id=t,e.fileEdit.title=a.data.data.title,e.fileEdit.cover=a.data.data.cover,e.imgSrc=a.data.data.cover,e.fileEdit.cover=a.data.data.cover.replace("http://psychic.zhineng.talkingcake.cn/file/",""),e.fileList.name=a.data.data.resourceFileList[0].fileName,e.fileList.path=a.data.data.resourceFileList[0].filePath,e.bookName=a.data.data.resourceFileList[0].fileName,e.bookPath=a.data.data.resourceFileList[0].filePath,console.log("cover",e.fileEdit.cover),console.log("fileList",e.fileList),console.log("imgSrc",e.imgSrc)})},addimg:function(){var t=this,e=document.getElementById("addMainImg");e.click(),console.log("addMainImg",e),e.onchange=function(e){console.log("lllllll");var a=new FormData;a.append("img",this.files[0]),t.$axios.post("api/file/upload",a).then(function(e){console.log(e.data),t.newResource.cover=e.data.data.filePath});var i=new FileReader;i.readAsDataURL(this.files[0]),i.onload=function(e){console.log("oFREvent",e),t.imgSrc=e.target.result}}},addFile:function(){var t=this,e="";0==t.name&&(e=document.getElementById("addMusic")),1==t.name&&(e=document.getElementById("addVideo")),console.log("name",t.name),console.log("addFile",e),e.click(),e.onchange=function(e){console.log(this.files);for(var a=0;a<this.files.length;a++){var i=new FormData;i.append("img",this.files[a]),t.$axios.post("api/file/upload",i).then(function(e){console.log(e.data),t.newResource.fileList=e.data.data,t.fileList=e.data.data})}}},editImg:function(){var t=this,e=document.getElementById("editImg");e.click(),e.onchange=function(e){var a=new FormData;a.append("img",this.files[0]),t.$axios.post("api/file/upload",a).then(function(e){console.log(e.data),t.fileEdit.cover=e.data.data.filePath,console.log(t.fileEdit.cover)});var i=new FileReader;i.readAsDataURL(this.files[0]),i.onload=function(e){t.imgSrc=e.target.result}}},editFile:function(){var t=this,e="";0==t.name&&(e=document.getElementById("editMusic")),1==t.name&&(e=document.getElementById("editVideo")),console.log("editFile",e),e.click(),e.onchange=function(e){var a=new FormData;a.append("img",this.files[0]),t.$axios.post("api/file/upload",a).then(function(e){console.log(e.data),t.fileList=e.data.data,console.log("fileList",t.fileList)})}},okAdd:function(){var t=this;console.log(this.newResource),0!=this.name&&1!=this.name||(this.newResource.fileList=[{path:this.newResource.fileList.filePath,name:this.newResource.fileList.name}]),2==this.name&&(this.newResource.fileList=[{path:this.bookPath,name:this.bookName}]),console.log("newResource",this.newResource),this.newResource.title&&this.newResource.cover&&this.newResource.fileList?this.$axios.post("api/resource/addResource",this.newResource).then(function(e){console.log(e),t.modelA=!1,t.$Message.success("添加成功!"),t.newResource.title="",t.fileList={},t.imgSrc="",t.getSearch()}):this.$Message.error("添加失败!")},cancelAdd:function(){this.modelA=!1,this.imgSrc="",this.fileList={},this.newResource.title="",this.$Message.info("用户点击了取消!")},okEdit:function(){var t=this,e="http://test.psychic.zhineng.talkingcake.cn/file/",a="http://psychic.zhineng.talkingcake.cn/file/";if(console.log("fileList",this.fileList),this.fileEdit.cover=this.fileEdit.cover.replace(e,""),this.fileEdit.cover=this.fileEdit.cover.replace(a,""),console.log("cover",this.fileEdit.cover),2!=name){var i=this.fileList.path.replace(e,"");i=i.replace(a,""),this.fileEdit.fileList=[{path:i,name:this.fileList.name}]}console.log(this.fileEdit),2==name&&(this.fileEdit.fileList=[{path:this.bookPath,name:this.bookName}]),this.fileEdit.title&&this.fileEdit.cover&&this.fileEdit.fileList?this.$axios.post("api/resource/editResource",this.fileEdit).then(function(e){console.log(e),t.modelE=!1,t.$Message.success("修改成功!"),t.fileList={},t.imgSrc="",t.getSearch()}):this.$Message.error("修改失败!")},cancelEdit:function(){this.fileList={},this.imgSrc="",this.$Message.info("用户点击了取消"),this.modelE=!1}},l()(i,"Delete",function(t){this.model1=!0,this.deleteId=t}),l()(i,"ok",function(){var t=this;console.log(this.deleteId);var e=this.deleteId;this.$axios.post("api/resource/deleteResource",{id:e}).then(function(e){console.log(e),t.model1=!1,t.$Message.success("删除成功!"),t.getData()})}),l()(i,"cancel",function(){this.model1=!1,this.$Message.info("用户点击了取消！")}),l()(i,"cancel1",function(){this.imgSrc=""}),l()(i,"change",function(t){var e=this;this.name=t,console.log(t),this.newResource.type=t+1,this.fileEdit.type=t+1,this.showAllProductParams.type=t+1,0==t&&this.$axios.post("/api/resource/getResourceList",{type:1,page:this.showAllProductParams.page,pageSize:this.showAllProductParams.pageSize}).then(function(t){console.log(t),e.data1=t.data.data.records,e.total1=t.data.data.total}),1==t&&this.$axios.post("/api/resource/getResourceList",{type:2,page:this.showAllProductParams.page,pageSize:this.showAllProductParams.pageSize}).then(function(t){console.log(t),e.data2=t.data.data.records,e.total2=t.data.data.total}),2==t&&this.$axios.post("/api/resource/getResourceList",{type:3,page:this.showAllProductParams.page,pageSize:this.showAllProductParams.pageSize}).then(function(t){console.log(t),e.data3=t.data.data.records,e.total3=t.data.data.total})}),i),mounted:function(){this.getData()}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("Modal",{attrs:{width:"360",draggable:""},on:{"on-cancel":t.cancel1},model:{value:t.model1,callback:function(e){t.model1=e},expression:"model1"}},[a("div",{staticStyle:{"text-align":"center","margin-top":"30px"}},[a("p",{staticStyle:{"font-size":"20px","margin-bottom":"5px"}},[t._v("是否删除该条记录？")]),t._v(" "),a("p",{staticStyle:{color:"#104E8B"}},[t._v("删除后不可恢复")])]),t._v(" "),a("div",{staticStyle:{"text-align":"center"},attrs:{slot:"footer"},slot:"footer"},[a("Button",{staticStyle:{width:"100px"},attrs:{type:"error"},on:{click:t.ok}},[t._v("删除")]),t._v(" "),a("Button",{staticStyle:{width:"100px"},on:{click:t.cancel}},[t._v("取消")])],1)]),t._v(" "),a("Modal",{attrs:{width:"700",draggable:""},on:{"on-cancel":t.cancel1},model:{value:t.modelA,callback:function(e){t.modelA=e},expression:"modelA"}},[a("p",{attrs:{slot:"header"},slot:"header"},[0==t.name?a("span",{staticStyle:{"font-size":"20px"}},[t._v("新增音频资源")]):t._e(),t._v(" "),1==t.name?a("span",{staticStyle:{"font-size":"20px"}},[t._v("新增视频资源")]):t._e(),t._v(" "),2==t.name?a("span",{staticStyle:{"font-size":"20px"}},[t._v("新增电子书资源")]):t._e()]),t._v(" "),a("div",{staticStyle:{"text-align":"center"}},[a("Row",[a("Col",{attrs:{span:"24"}},[a("div",{staticStyle:{float:"left","margin-left":"100px"}},[a("span",{staticStyle:{color:"#104E8B","margin-right":"20px"}},[t._v("标题")]),t._v(" "),a("Input",{staticStyle:{width:"200px"},attrs:{placeholder:"预设提示文字"},model:{value:t.newResource.title,callback:function(e){t.$set(t.newResource,"title",e)},expression:"newResource.title"}})],1)])],1),t._v(" "),a("br"),t._v(" "),a("Row",[a("Col",{attrs:{span:"10"}},[a("div",{staticStyle:{float:"left","margin-left":"100px"}},[a("span",{staticStyle:{color:"#104E8B","margin-right":"20px"}},[t._v("封面")]),t._v(" "),a("Button",{staticStyle:{width:"100px",height:"100px",background:"#eee","margin-right":"10px"},attrs:{icon:"md-add",type:"dashed"},on:{click:t.addimg}},[a("br"),t._v(" "),a("span",{staticStyle:{"margin-top":"10px"}},[t._v("上传")])]),t._v(" "),a("input",{staticStyle:{opacity:"0",height:"0",width:"0"},attrs:{id:"addMainImg",type:"file",accept:".png, .jpg, .jpeg"}})],1)]),t._v(" "),a("Col",{attrs:{span:"14"}},[t.imgSrc?a("div",{staticStyle:{width:"100px",height:"100px",border:"1px solid black","border-style":"dotted"}},[a("img",{staticStyle:{width:"100px",height:"100px"},attrs:{src:t.imgSrc}})]):t._e()])],1),t._v(" "),a("Row",[a("Col",{attrs:{span:"24"}},[a("span",{staticStyle:{color:"#ccc","margin-right":"70px"}},[t._v("支持扩展名：.jpg .jpeg .png ...，建议图片尺寸")])])],1),t._v(" "),a("br"),t._v(" "),0==t.name||1==t.name?a("Row",[a("Col",{attrs:{span:"24"}},[a("div",{staticStyle:{float:"left","margin-left":"100px"}},[a("span",{staticStyle:{color:"#104E8B","margin-right":"20px"}},[t._v("文件")]),t._v(" "),a("Button",{staticStyle:{"margin-right":"20px"},attrs:{icon:"ios-cloud-upload-outline"},on:{click:t.addFile}},[t._v("上传文件")]),t._v(" "),a("input",{staticStyle:{opacity:"0",height:"0",width:"0"},attrs:{id:"addMusic",type:"file",accept:".mp3, .wav, .wma, .flac"}}),t._v(" "),a("input",{staticStyle:{opacity:"0",height:"0",width:"0"},attrs:{id:"addVideo",type:"file",accept:".mp4, .avi, .wmv, .mkv"}})],1)])],1):t._e(),t._v(" "),2==t.name?a("Row",[a("Col",{attrs:{span:"24"}},[a("div",{staticStyle:{float:"left","margin-left":"70px"}},[a("span",{staticStyle:{color:"#104E8B","margin-right":"10px"}},[t._v("电子书URL")]),t._v(" "),a("Input",{staticStyle:{width:"400px"},attrs:{placeholder:"预设提示文字"},model:{value:t.bookPath,callback:function(e){t.bookPath=e},expression:"bookPath"}})],1)])],1):t._e(),t._v(" "),0==t.name||1==t.name?a("Row",[a("Col",{attrs:{span:"24"}},[0==t.name?a("span",{staticStyle:{color:"#ccc","margin-left":"40px"}},[t._v("支持扩展名：.mp3 .wav .wma .flac ...，建议文件大小不超过100M")]):t._e(),t._v(" "),1==t.name?a("span",{staticStyle:{color:"#ccc","margin-left":"40px"}},[t._v("支持扩展名：.mp4 .avi .wmv .mkv ...，建议文件大小不超过100M")]):t._e()])],1):t._e(),t._v(" "),t.fileList&&2!=t.name?a("Row",[a("Col",{attrs:{span:"24"}},[a("div",{staticStyle:{display:"flex","margin-left":"150px"}},[a("span",[t._v(t._s(t.fileList.name))])])])],1):t._e()],1),t._v(" "),a("div",{staticStyle:{"text-align":"center"},attrs:{slot:"footer"},slot:"footer"},[a("Button",{staticStyle:{width:"100px"},attrs:{type:"primary"},on:{click:t.okAdd}},[t._v("确认")]),t._v(" "),a("Button",{staticStyle:{width:"100px"},on:{click:t.cancelAdd}},[t._v("取消")])],1)]),t._v(" "),a("Modal",{attrs:{width:"700",draggable:""},on:{"on-cancel":t.cancel1},model:{value:t.modelE,callback:function(e){t.modelE=e},expression:"modelE"}},[a("p",{attrs:{slot:"header"},slot:"header"},[0==t.name?a("span",{staticStyle:{"font-size":"20px"}},[t._v("编辑音频资源")]):t._e(),t._v(" "),1==t.name?a("span",{staticStyle:{"font-size":"20px"}},[t._v("编辑视频资源")]):t._e(),t._v(" "),2==t.name?a("span",{staticStyle:{"font-size":"20px"}},[t._v("编辑电子书资源")]):t._e()]),t._v(" "),a("div",{staticStyle:{"text-align":"center"}},[a("Row",[a("Col",{attrs:{span:"24"}},[a("div",{staticStyle:{float:"left","margin-left":"100px"}},[a("span",{staticStyle:{color:"#104E8B","margin-right":"20px"}},[t._v("标题")]),t._v(" "),a("Input",{staticStyle:{width:"200px"},attrs:{placeholder:"待修改文字"},model:{value:t.fileEdit.title,callback:function(e){t.$set(t.fileEdit,"title",e)},expression:"fileEdit.title"}})],1)])],1),t._v(" "),a("br"),t._v(" "),a("Row",[a("Col",{attrs:{span:"10"}},[a("div",{staticStyle:{float:"left","margin-left":"100px"}},[a("span",{staticStyle:{color:"#104E8B","margin-right":"20px"}},[t._v("封面")]),t._v(" "),a("Button",{staticStyle:{width:"100px",height:"100px",background:"#eee"},attrs:{icon:"md-add",type:"dashed"},on:{click:t.editImg}},[a("br"),t._v(" "),a("span",{staticStyle:{"margin-top":"10px"}},[t._v("上传")])]),t._v(" "),a("input",{staticStyle:{opacity:"0",height:"0",width:"0"},attrs:{id:"editImg",type:"file",accept:".png, .jpg, .jpeg"}})],1)]),t._v(" "),a("Col",{attrs:{span:"14"}},[a("div",{staticStyle:{width:"100px",height:"100px",border:"1px solid black","border-style":"dotted"}},[a("img",{staticStyle:{width:"100px",height:"100px"},attrs:{src:t.imgSrc}})])])],1),t._v(" "),a("Row",[a("Col",{attrs:{span:"24"}},[a("span",{staticStyle:{color:"#ccc","margin-right":"70px"}},[t._v("支持扩展名：.jpg .jpeg .png ...，建议图片尺寸")])])],1),t._v(" "),a("br"),t._v(" "),2!=t.name?a("Row",[a("Col",{attrs:{span:"24"}},[a("div",{staticStyle:{float:"left","margin-left":"100px"}},[a("span",{staticStyle:{color:"#104E8B","margin-right":"20px"}},[t._v("文件")]),t._v(" "),a("Button",{staticStyle:{"margin-right":"20px"},attrs:{icon:"ios-cloud-upload-outline"},on:{click:t.editFile}},[t._v("上传文件")]),t._v(" "),a("input",{staticStyle:{opacity:"0",height:"0",width:"0"},attrs:{id:"editMusic",type:"file",accept:".mp3, .wav, .wma, .flac"}}),t._v(" "),a("input",{staticStyle:{opacity:"0",height:"0",width:"0"},attrs:{id:"editVideo",type:"file",accept:".mp4, .avi, .wmv, .mkv"}})],1)])],1):t._e(),t._v(" "),2==t.name?a("Row",[a("Col",{attrs:{span:"24"}},[a("div",{staticStyle:{float:"left","margin-left":"70px"}},[a("span",{staticStyle:{color:"#104E8B","margin-right":"10px"}},[t._v("电子书URL")]),t._v(" "),a("Input",{staticStyle:{width:"400px"},attrs:{placeholder:"预设提示文字"},model:{value:t.bookPath,callback:function(e){t.bookPath=e},expression:"bookPath"}})],1)])],1):t._e(),t._v(" "),0==t.name||1==t.name?a("Row",[a("Col",{attrs:{span:"24"}},[0==t.name?a("span",{staticStyle:{color:"#ccc","margin-left":"40px"}},[t._v("支持扩展名：.mp3 .wav .wma .flac ...，建议文件大小不超过100M")]):t._e(),t._v(" "),1==t.name?a("span",{staticStyle:{color:"#ccc","margin-left":"40px"}},[t._v("支持扩展名：.mp4 .avi .wmv .mkv ...，建议文件大小不超过100M")]):t._e()])],1):t._e(),t._v(" "),t.fileList&&2!=t.name?a("Row",[a("Col",{attrs:{span:"24"}},[a("div",{staticStyle:{display:"flex","margin-left":"150px"}},[a("span",[t._v(t._s(t.fileList.name))])])])],1):t._e()],1),t._v(" "),a("div",{staticStyle:{"text-align":"center"},attrs:{slot:"footer"},slot:"footer"},[a("Button",{staticStyle:{width:"100px"},attrs:{type:"primary"},on:{click:t.okEdit}},[t._v("确认")]),t._v(" "),a("Button",{staticStyle:{width:"100px"},on:{click:t.cancelEdit}},[t._v("取消")])],1)]),t._v(" "),a("Tabs",{attrs:{type:"card"},on:{"on-click":t.change},model:{value:t.type,callback:function(e){t.type=e},expression:"type"}},[a("TabPane",{attrs:{label:"音频资源"}},[a("Row",[a("Col",{attrs:{span:"20"}},[a("span",{staticStyle:{"margin-right":"10px"}},[t._v("标题")]),t._v(" "),a("Input",{staticStyle:{width:"200px"},model:{value:t.showAllProductParams.title,callback:function(e){t.$set(t.showAllProductParams,"title",e)},expression:"showAllProductParams.title"}})],1),t._v(" "),a("Col",{attrs:{span:"4"}},[a("Button",{staticStyle:{"margin-right":"20px"},attrs:{type:"primary"},on:{click:t.getSearch}},[t._v("搜索")]),t._v(" "),a("Button",{attrs:{type:"info"},on:{click:t.Add}},[t._v("新增")])],1)],1),t._v(" "),a("br"),t._v(" "),a("Table",{attrs:{border:"",columns:t.columns1,data:t.data1},scopedSlots:t._u([{key:"product",fn:function(t){var e=t.row;return t.index,[a("div",{staticStyle:{"text-align":"center"}},[a("img",{staticStyle:{width:"40px",height:"40px","margin-top":"10px"},attrs:{src:e.cover}})])]}},{key:"edit",fn:function(e){var i=e.row;return e.index,[a("a",{staticStyle:{"margin-top":"2px",width:"60px",color:"blue","padding-right":"10px"},attrs:{size:"small",type:"primary"},on:{click:function(e){return t.toEdit(i.id)}}},[t._v("编辑")]),t._v(" "),a("a",{staticStyle:{"margin-top":"2px",width:"60px",color:"blue"},attrs:{size:"small",type:"primary"},on:{click:function(e){return t.Delete(i.id)}}},[t._v("删除")])]}}])}),t._v(" "),a("br"),t._v(" "),a("Row",[a("Col",{staticStyle:{"text-align":"right"},attrs:{span:"24"}},[a("Page",{attrs:{total:t.total1,current:t.showAllProductParams.page,"page-size":t.showAllProductParams.pageSize,"show-total":"","show-sizer":"","show-elevator":""},on:{"on-change":t.changePage,"on-page-size-change":t.changePageSize}})],1)],1)],1),t._v(" "),a("TabPane",{attrs:{label:"视频资源"}},[a("Row",[a("Col",{attrs:{span:"20"}},[a("span",{staticStyle:{"margin-right":"10px"}},[t._v("标题")]),t._v(" "),a("Input",{staticStyle:{width:"200px"},model:{value:t.showAllProductParams.title,callback:function(e){t.$set(t.showAllProductParams,"title",e)},expression:"showAllProductParams.title"}})],1),t._v(" "),a("Col",{attrs:{span:"4"}},[a("Button",{staticStyle:{"margin-right":"20px"},attrs:{type:"primary"},on:{click:t.getSearch}},[t._v("搜索")]),t._v(" "),a("Button",{attrs:{type:"info"},on:{click:t.Add}},[t._v("新增")])],1)],1),t._v(" "),a("br"),t._v(" "),a("Table",{attrs:{border:"",columns:t.columns2,data:t.data2},scopedSlots:t._u([{key:"product",fn:function(t){var e=t.row;return t.index,[a("div",{staticStyle:{"text-align":"center"}},[a("img",{staticStyle:{width:"40px",height:"40px","margin-top":"10px"},attrs:{src:e.cover}})])]}},{key:"edit",fn:function(e){var i=e.row;return e.index,[a("a",{staticStyle:{"margin-top":"2px",width:"60px",color:"blue","padding-right":"10px"},attrs:{size:"small",type:"primary"},on:{click:function(e){return t.toEdit(i.id)}}},[t._v("编辑")]),t._v(" "),a("a",{staticStyle:{"margin-top":"2px",width:"60px",color:"blue"},attrs:{size:"small",type:"primary"},on:{click:function(e){return t.Delete(i.id)}}},[t._v("删除")])]}}])}),t._v(" "),a("br"),t._v(" "),a("Row",[a("Col",{staticStyle:{"text-align":"right"},attrs:{span:"24"}},[a("Page",{attrs:{total:t.total2,current:t.showAllProductParams.page,"page-size":t.showAllProductParams.pageSize,"show-total":"","show-sizer":"","show-elevator":""},on:{"on-change":t.changePage,"on-page-size-change":t.changePageSize}})],1)],1)],1),t._v(" "),a("TabPane",{attrs:{label:"电子书资源"}},[a("Row",[a("Col",{attrs:{span:"20"}},[a("span",{staticStyle:{"margin-right":"10px"}},[t._v("标题")]),t._v(" "),a("Input",{staticStyle:{width:"200px"},model:{value:t.showAllProductParams.title,callback:function(e){t.$set(t.showAllProductParams,"title",e)},expression:"showAllProductParams.title"}})],1),t._v(" "),a("Col",{attrs:{span:"4"}},[a("Button",{staticStyle:{"margin-right":"20px"},attrs:{type:"primary"},on:{click:t.getSearch}},[t._v("搜索")]),t._v(" "),a("Button",{attrs:{type:"info"},on:{click:t.Add}},[t._v("新增")])],1)],1),t._v(" "),a("br"),t._v(" "),a("Table",{attrs:{border:"",columns:t.columns3,data:t.data3},scopedSlots:t._u([{key:"product",fn:function(t){var e=t.row;return t.index,[a("div",{staticStyle:{"text-align":"center"}},[a("img",{staticStyle:{width:"40px",height:"40px","margin-top":"10px"},attrs:{src:e.cover}})])]}},{key:"edit",fn:function(e){var i=e.row;return e.index,[a("a",{staticStyle:{"margin-top":"2px",width:"60px",color:"blue","padding-right":"10px"},attrs:{size:"small",type:"primary"},on:{click:function(e){return t.toEdit(i.id)}}},[t._v("编辑")]),t._v(" "),a("a",{staticStyle:{"margin-top":"2px",width:"60px",color:"blue"},attrs:{size:"small",type:"primary"},on:{click:function(e){return t.Delete(i.id)}}},[t._v("删除")])]}}])}),t._v(" "),a("br"),t._v(" "),a("Row",[a("Col",{staticStyle:{"text-align":"right"},attrs:{span:"24"}},[a("Page",{attrs:{total:t.total3,current:t.showAllProductParams.page,"page-size":t.showAllProductParams.pageSize,"show-total":"","show-sizer":"","show-elevator":""},on:{"on-change":t.changePage,"on-page-size-change":t.changePageSize}})],1)],1)],1)],1)],1)},staticRenderFns:[]};var c=a("C7Lr")(s,n,!1,function(t){a("wOan")},null,null);e.default=c.exports},wOan:function(t,e){}});
//# sourceMappingURL=3.4d33881807b4e5fae1b5.js.map