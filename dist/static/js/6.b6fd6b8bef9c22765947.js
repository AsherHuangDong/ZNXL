webpackJsonp([6],{NRsi:function(t,i){},zObp:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=e("3cXf"),o=e.n(n),s={name:"questionnaireEdit",data:function(){return{momentName:"",modal2:!1,imgSrc:"",isshow:!0,index:"",scorce:{beginScore:"",endScore:""},weiduAdd:{evaluationId:"",dimensionName:""},dimensionList:[],explanList:[],questionList:[],weidulist:[],evaluationId:"",editQuestion:{evaluationId:"",cover:"",title:"",introduct:""},editExplain:{evaluationId:"",dimensionList:[]},editTitle:{evaluationId:"",questionList:[]}}},methods:{handleAdd:function(){this.modal2=!0},ok:function(){var t=this;this.momentName?(this.weiduAdd.dimensionName=this.momentName,this.$axios.post("api/evaluationDimension/addEvaluationDimension",this.weiduAdd).then(function(i){console.log(i),t.modal2=!1,t.weidulist.push(i.data.data),t.explanList.push({dimensionId:i.data.data.dimensionId,dimensionName:i.data.data.dimensionName,dimensionExplanList:[{beginScore:"",endScore:"",explan:""}]}),t.$forceUpdate(),console.log(t.explanList),t.momentName=""})):this.$Message.error("请输入维度名!!")},cancel:function(){this.modal2=!1,this.momentName=""},handleClose2:function(t,i){this.weidulist.splice(t,1),this.explanList.splice(t,1),console.log(this.questionList),this.questionList&&this.questionList.forEach(function(t){for(var e=-1,n=0;n<t.dimList.length;n++)t.dimList[n].dimId==i&&(e=n);e>=0&&t.dimList.splice(e,1)}),this.$axios.post("api/evaluationDimension/deleteEvaluationDimension",{id:i}).then(function(t){console.log(t)}),console.log(this.weidulist)},handleClose:function(t,i){this.questionList[t].dimList.splice(i,1)},Maddimg:function(){var t=this,i=document.getElementById("addMainImg");i.click(),i.onchange=function(i){var e=new FormData;e.append("img",this.files[0]),t.$axios.post("api/file/upload",e).then(function(i){console.log(i.data),t.editQuestion.cover=i.data.data.filePath});var n=new FileReader;n.readAsDataURL(this.files[0]),n.onload=function(i){t.imgSrc=i.target.result}}},gotoNext:function(){this.isshow=!1},gotoLast:function(){this.isshow=!0},save:function(){var t=this,i=1,e=1;this.editTitle.questionList=[],this.editExplain.dimensionList=[],console.log(this.questionList),this.editExplain.evaluationId=this.evaluationId,this.explanList.forEach(function(i){t.editExplain.dimensionList.push({dimensionId:i.dimensionId,scoreExplanList:i.dimensionExplanList})}),this.editExplain.dimensionList.forEach(function(t){for(var e=0;e<t.scoreExplanList.length;e++)t.scoreExplanList[e].explan&&t.scoreExplanList[e].beginScore&&t.scoreExplanList[e].endScore||(i=2)}),console.log(this.editExplain),this.editTitle.evaluationId=this.evaluationId,this.editTitle.questionList=JSON.parse(o()(this.questionList)),console.log("editTitle",this.editTitle.questionList);var n=this.editTitle.questionList,s=JSON.parse(o()(n).replace(/optionScoreList/g,"optionList")),a=JSON.parse(o()(s).replace(/dimList/g,"dimensionList"));console.log("list1",s),console.log("list2",a),a.forEach(function(t){for(var i=0;i<t.dimensionList.length;i++)t.dimensionList[i]=t.dimensionList[i].dimId;for(var e=0;e<t.optionList.length;e++)t.optionList[e].optionScore=""==t.optionList[e].optionScore?"":parseInt(t.optionList[e].optionScore)}),console.log("list2",a);this.editQuestion.cover=this.editQuestion.cover.replace("http://test.psychic.zhineng.talkingcake.cn/file/",""),this.editQuestion.cover=this.editQuestion.cover.replace("http://psychic.zhineng.talkingcake.cn/file/",""),console.log("cover",this.editQuestion.cover),this.$axios.post("api/evaluation/editEvaluation",this.editQuestion).then(function(t){console.log(t),0!=t.data.code&&2}),this.editTitle.questionList=a,console.log("editTitle",this.editTitle),this.editTitle.questionList.forEach(function(t){t.questionName||(i=2);for(var n=0;n<t.optionList.length;n++)t.optionList[n].optionName&&t.optionList[n].optionScore||(i=2);0==t.dimensionList.length&&(e=2)}),1==i&&1==e?(this.$axios.post("api/evaluationQuestion/editEvaluationQuestion",this.editTitle).then(function(t){console.log(t),0!=t.data.code&&2}),this.$axios.post("api/evaluationDimensionExplan/editEvaluationDimensionExplan",this.editExplain).then(function(t){console.log(t),0!=t.data.code&&2}),this.$router.go(-1)):1==i&&2==e?this.$Message.error("请添加维度"):this.$Message.error("请将所有信息填写完整后重试")},addTitle:function(t){this.questionList.splice(t+1,0,{questionName:"",dimList:[],optionScoreList:[{optionName:"",optionScore:""}]})},addPrint:function(t){this.questionList[t].optionScoreList.push({optionName:"",optionScore:""})},deleteQ:function(t){this.questionList.splice(t,1)},deleteC:function(t,i){this.questionList[t].optionScoreList.splice(i,1)},gotoAdd:function(t){console.log(t);var i=t.split("+"),e=parseInt(i[0]),n=i[1];console.log(i);var o=1;this.questionList[this.index].dimList.forEach(function(t){t.dimId==e&&(o=2)}),2==o?this.$Message.error("已存在维度!!!"):this.questionList[this.index].dimList.push({dimId:e,dimName:n}),console.log(this.questionList[this.index].dimList)},getIndex:function(t){console.log(t),this.index=t},addExplain:function(t,i){this.explanList[t].dimensionExplanList.splice(i+1,0,{beginScore:"",endScore:"",explan:""}),this.$forceUpdate()},deleteE:function(t,i){this.explanList[t].dimensionExplanList.splice(i,1),this.$forceUpdate()},goback:function(){this.$router.go(-1)}},mounted:function(){var t=this;this.evaluationId=this.$route.query.evaluationId,this.editQuestion.evaluationId=this.evaluationId,this.weiduAdd.evaluationId=this.evaluationId,this.explanList.evaluationId=this.evaluationId,this.questionList.evaluationId=this.evaluationId,this.$axios.post("api/evaluation/getEvaluationById",{evaluationId:this.evaluationId}).then(function(i){console.log(i),t.editQuestion.title=i.data.data.title,t.editQuestion.cover=i.data.data.cover,t.imgSrc=i.data.data.cover,t.editQuestion.introduct=i.data.data.introduct}),this.$axios.post("/api/evaluationDimensionExplan/getEvaluationDimensionQuestion",{evaluationId:this.evaluationId}).then(function(i){console.log(i),t.dimensionList=i.data.data.dimensionNameList,t.weidulist=i.data.data.dimensionList,t.explanList=i.data.data.explanList,console.log(t.explanList),t.explanList.forEach(function(t){t.maxScore=0,t.minScore=0,console.log(t.dimensionExplanList),0==t.dimensionExplanList.length&&t.dimensionExplanList.push({beginScore:"",endScore:"",explan:""})}),t.questionList=i.data.data.questionList,0==t.questionList.length&&t.questionList.push({questionName:"",dimList:[],optionScoreList:[{optionName:"",optionScore:""}]})})}},a={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[e("Modal",{attrs:{closable:!1},model:{value:t.modal2,callback:function(i){t.modal2=i},expression:"modal2"}},[e("Input",{attrs:{placeholder:"请输入维度名"},model:{value:t.momentName,callback:function(i){t.momentName=i},expression:"momentName"}}),t._v(" "),e("div",{staticStyle:{"text-align":"center"},attrs:{slot:"footer"},slot:"footer"},[e("Button",{staticStyle:{width:"100px"},attrs:{type:"primary"},on:{click:t.ok}},[t._v("确认")]),t._v(" "),e("Button",{staticStyle:{width:"100px"},on:{click:t.cancel}},[t._v("取消")])],1)],1),t._v(" "),e("Row",[e("Col",[e("Button",{attrs:{type:"info"},on:{click:t.goback}},[t._v("返回")])],1)],1),t._v(" "),t.isshow?e("div",[e("Row",[e("div",{staticStyle:{"text-align":"center"}},[e("img",{staticStyle:{width:"30px",height:"30px"},attrs:{src:"/static/img/one.png"}}),t._v(" "),e("img",{staticStyle:{width:"400px",height:"30px",overflow:"hidden"},attrs:{src:"/static/img/line.png"}}),t._v(" "),e("img",{staticStyle:{width:"30px",height:"30px"},attrs:{src:"/static/img/2.png"}})])]),t._v(" "),e("Row",[e("Col",{attrs:{span:"24"}},[e("div",{staticStyle:{"text-align":"center"}},[e("span",{staticStyle:{color:"black","margin-right":"320px"}},[t._v("填写问卷基本信息")]),t._v(" "),e("span",{staticStyle:{color:"#ccc"}},[t._v("设置问卷题目与解释")])])])],1),t._v(" "),e("br"),t._v(" "),e("Row",[e("Col",{attrs:{span:"24"}},[e("div",{staticStyle:{float:"left","margin-left":"300px"}},[e("span",{staticStyle:{color:"#07175D","margin-right":"20px"}},[t._v("问卷标题")]),t._v(" "),e("Input",{staticStyle:{width:"400px"},attrs:{placeholder:"预设提示文字"},model:{value:t.editQuestion.title,callback:function(i){t.$set(t.editQuestion,"title",i)},expression:"editQuestion.title"}})],1)])],1),t._v(" "),e("br"),t._v(" "),e("Row",[e("Col",{attrs:{span:"12"}},[e("div",{staticStyle:{float:"left","margin-left":"300px"}},[e("span",{staticStyle:{color:"#07175D","margin-right":"20px"}},[t._v("问卷封面")]),t._v(" "),e("Button",{staticStyle:{width:"100px",height:"100px",background:"#eee","margin-right":"10px"},attrs:{icon:"md-add",type:"dashed"},on:{click:t.Maddimg}},[e("br"),t._v(" "),e("span",{staticStyle:{"margin-top":"10px"}},[t._v("上传")])]),t._v(" "),e("input",{staticStyle:{opacity:"0",height:"0",width:"0"},attrs:{id:"addMainImg",type:"file",accept:".png, .jpg, .jpeg"}})],1)]),t._v(" "),e("Col",{attrs:{span:"12"}},[t.imgSrc?e("div",{staticStyle:{width:"100px",height:"100px",border:"1px solid black","border-style":"dotted"}},[e("img",{staticStyle:{width:"100px",height:"100px"},attrs:{src:t.imgSrc}})]):t._e()])],1),t._v(" "),e("Row",[e("Col",{attrs:{span:"24"}},[e("span",{staticStyle:{color:"#ccc","margin-left":"380px"}},[t._v("支持扩展名：.jpg .jpeg .png ...，建议图片尺寸")])])],1),t._v(" "),e("br"),t._v(" "),e("Row",[e("Col",{attrs:{span:"24"}},[e("div",{staticStyle:{float:"left","margin-left":"300px"}},[e("span",{staticStyle:{color:"#07175D","margin-right":"35px"}},[t._v("指导语")]),t._v(" "),e("Input",{staticStyle:{width:"400px"},attrs:{type:"textarea",rows:4},model:{value:t.editQuestion.introduct,callback:function(i){t.$set(t.editQuestion,"introduct",i)},expression:"editQuestion.introduct"}})],1)])],1),t._v(" "),e("br"),t._v(" "),e("Row",[e("Col",{attrs:{span:"24"}},[e("div",{staticStyle:{"text-align":"center"}},[e("Button",{staticStyle:{width:"100px"},attrs:{type:"primary"},on:{click:t.gotoNext}},[t._v("下一步")])],1)])],1)],1):t._e(),t._v(" "),t.isshow?t._e():e("div",[e("Row",[e("div",{staticStyle:{"text-align":"center"}},[e("img",{staticStyle:{width:"30px",height:"30px"},attrs:{src:"/static/img/stop.png"}}),t._v(" "),e("img",{staticStyle:{width:"400px",height:"30px",overflow:"hidden"},attrs:{src:"/static/img/line1.png"}}),t._v(" "),e("img",{staticStyle:{width:"30px",height:"30px"},attrs:{src:"/static/img/tow.png"}})])]),t._v(" "),e("Row",[e("Col",{attrs:{span:"24"}},[e("div",{staticStyle:{"text-align":"center"}},[e("span",{staticStyle:{color:"black","margin-right":"320px"}},[t._v("填写问卷基本信息")]),t._v(" "),e("span",{staticStyle:{color:"black"}},[t._v("设置问卷题目与解释")])])])],1),t._v(" "),e("br"),t._v(" "),e("Row",[e("Col",{attrs:{span:"24",offset:"5"}},[e("div",{staticStyle:{display:"flex","justify-content":"flex-start","align-item":"flex-start"}},[e("div",{staticStyle:{width:"4px",height:"20px",background:"#07175D",display:"inline-block","margin-right":"5px"}}),t._v(" "),e("div",{staticStyle:{display:"inline-block",color:"#07175D"}},[e("h1",{staticStyle:{"font-size":"15px"}},[t._v("问卷维度")])])])])],1),t._v(" "),e("br"),t._v(" "),e("Row",[e("Col",{attrs:{span:"24",offset:"5"}},[e("div",{staticStyle:{float:"left",width:"500px"}},[t._l(t.weidulist,function(i,n){return e("Tag",{key:i.dimensionId,attrs:{name:n,closable:""},on:{"on-close":function(e){return t.handleClose2(n,i.dimensionId)}}},[t._v(t._s(i.dimensionName))])}),t._v(" "),e("Button",{attrs:{icon:"ios-add",type:"dashed",size:"small"},on:{click:t.handleAdd}},[t._v("添加标签")])],2)])],1),t._v(" "),e("br"),t._v(" "),e("Row",[e("Col",{attrs:{span:"24",offset:"5"}},[e("div",{staticStyle:{display:"flex","justify-content":"flex-start","align-item":"flex-start"}},[e("div",{staticStyle:{width:"4px",height:"20px",background:"#07175D",display:"inline-block","margin-right":"5px"}}),t._v(" "),e("div",{staticStyle:{display:"inline-block",color:"#07175D"}},[e("h1",{staticStyle:{"font-size":"15px"}},[t._v("问卷题目")])])])])],1),t._v(" "),e("br"),t._v(" "),e("Row",[e("Col",{attrs:{span:"24"}},[e("div",{staticStyle:{float:"left","margin-left":"240px"}},t._l(t.questionList,function(i,n){return e("div",{key:n,staticStyle:{"margin-bottom":"10px"}},[e("div",{staticStyle:{display:"flex","justify-content":"flex-start","align-items":"center"}},[0!==n?e("img",{staticStyle:{width:"15px",height:"15px",display:"inline-block",cursor:"pointer","margin-right":"5px"},attrs:{src:"static/img/remove.png"},on:{click:function(i){return t.deleteQ(n)}}}):t._e(),t._v(" "),e("div",{staticStyle:{width:"20px",color:"#104E8B",display:"inline-block"}},[t._v(t._s(n+1)+".")]),t._v(" "),e("Input",{staticStyle:{display:"inline-block",width:"385px","margin-right":"5px"},model:{value:i.questionName,callback:function(e){t.$set(i,"questionName",e)},expression:"item.questionName"}}),t._v(" "),e("Button",{staticStyle:{display:"inline-block",height:"34px"},attrs:{type:"info"},on:{click:function(i){return t.addTitle(n)}}},[t._v("+添加")])],1),t._v(" "),t._l(i.optionScoreList,function(i,o){return e("div",{key:o,staticStyle:{"margin-top":"10px","margin-left":"40px"}},[0!=o?e("img",{staticStyle:{width:"12px",height:"12px",display:"inline-block",cursor:"pointer","margin-right":"5px"},attrs:{src:"static/img/remove.png"},on:{click:function(i){return t.deleteC(n,o)}}}):t._e(),t._v(" "),e("div",{staticStyle:{width:"40px","text-align":"right",color:"#07175D",display:"inline-block"}},[t._v("选项"+t._s(o+1)+":")]),t._v(" "),e("Input",{staticStyle:{width:"194px",display:"inline-block"},attrs:{placeholder:"选项描述"},model:{value:i.optionName,callback:function(e){t.$set(i,"optionName",e)},expression:"item1.optionName"}}),t._v(" "),e("div",{staticStyle:{width:"80px","text-align":"right",color:"#07175D",display:"inline-block"}},[t._v("得分:")]),t._v(" "),e("Input",{staticStyle:{width:"76px",display:"inline-block"},attrs:{type:"number"},model:{value:i.optionScore,callback:function(e){t.$set(i,"optionScore",e)},expression:"item1.optionScore"}})],1)}),t._v(" "),e("div",{staticStyle:{width:"80px","text-align":"left","margin-left":"40px","margin-top":"10px"},on:{click:function(i){return t.addPrint(n)}}},[e("a",{staticStyle:{color:"blue"}},[t._v("新增选项")])]),t._v(" "),e("div",{staticStyle:{"text-align":"left","margin-top":"10px"}},[e("div",{staticStyle:{width:"70px","text-align":"right",color:"#07175D",display:"inline-block"}},[t._v("维度:")]),t._v(" "),e("div",{staticStyle:{"text-align":"left",display:"inline-block"}},t._l(i.dimList,function(i,o){return e("Tag",{key:o,attrs:{name:o,closable:""},on:{"on-close":function(i){return t.handleClose(n,o)}}},[t._v(t._s(i.dimName))])}),1),t._v(" "),e("Dropdown",{on:{"on-click":t.gotoAdd}},[e("Button",{attrs:{icon:"ios-add",type:"dashed",size:"small"},on:{click:function(i){return t.getIndex(n)}}},[t._v("新增")]),t._v(" "),e("DropdownMenu",{attrs:{slot:"list"},slot:"list"},t._l(t.weidulist,function(i){return e("DropdownItem",{key:i.dimensionId,attrs:{name:i.dimensionId+"+"+i.dimensionName}},[t._v(t._s(i.dimensionName))])}),1)],1)],1)],2)}),0)])],1),t._v(" "),e("br"),t._v(" "),e("Row",[e("Col",{attrs:{span:"24",offset:"5"}},[e("div",{staticStyle:{display:"flex","justify-content":"flex-start","align-item":"flex-start"}},[e("div",{staticStyle:{width:"4px",height:"20px",background:"#07175D",display:"inline-block","margin-right":"5px"}}),t._v(" "),e("div",{staticStyle:{display:"inline-block",color:"#07175D"}},[e("h1",{staticStyle:{"font-size":"15px"}},[t._v("问卷解释")])])])])],1),t._v(" "),e("br"),t._v(" "),e("Row",[e("Col",{attrs:{span:"24"}},[e("Tabs",{staticStyle:{"margin-bottom":"10px",float:"left","margin-left":"240px"}},t._l(t.explanList,function(i,n){return e("TabPane",{key:n,attrs:{label:i.dimensionName}},[e("div",[e("span",{staticStyle:{color:"#07175D"}},[t._v("得分范围:")])]),t._v(" "),e("br"),t._v(" "),e("div",{staticStyle:{float:"left"}},t._l(i.dimensionExplanList,function(i,o){return e("div",{key:o,staticStyle:{"margin-bottom":"10px"}},[e("div",{staticStyle:{display:"flex","justify-content":"flex-start","align-items":"center"}},[0!==o?e("img",{staticStyle:{width:"15px",height:"15px",display:"inline-block",cursor:"pointer","margin-right":"5px"},attrs:{src:"static/img/remove.png"},on:{click:function(i){return t.deleteE(n,o)}}}):t._e(),t._v(" "),e("div",{staticStyle:{width:"20px",color:"#07175D",display:"inline-block"}},[t._v(t._s(o+1)+".")]),t._v(" "),e("Input",{staticStyle:{display:"inline-block",width:"81px"},attrs:{type:"number"},model:{value:i.beginScore,callback:function(e){t.$set(i,"beginScore",e)},expression:"item5.beginScore"}}),t._v(" "),e("img",{staticStyle:{width:"50px",height:"10px",overflow:"hidden",display:"inline-block"},attrs:{src:"/static/img/line.png"}}),t._v(" "),e("Input",{staticStyle:{display:"inline-block",width:"81px"},attrs:{type:"number"},model:{value:i.endScore,callback:function(e){t.$set(i,"endScore",e)},expression:"item5.endScore"}}),t._v(" "),e("Button",{staticStyle:{display:"inline-block",height:"34px","margin-left":"5px"},attrs:{type:"info"},on:{click:function(i){return t.addExplain(n,o)}}},[t._v("+添加")])],1),t._v(" "),e("Input",{staticStyle:{width:"399px",height:"118px","margin-top":"10px","margin-left":"25px"},attrs:{type:"textarea",rows:4,placeholder:"解释和干预"},model:{value:i.explan,callback:function(e){t.$set(i,"explan",e)},expression:"item5.explan"}})],1)}),0)])}),1)],1)],1),t._v(" "),e("Row",[e("Col",{attrs:{span:"24"}},[e("div",{staticStyle:{"margin-bottom":"10px",float:"left","margin-left":"340px"}},[e("Button",{staticStyle:{width:"100px","margin-right":"40px"},attrs:{type:"primary"},on:{click:t.gotoLast}},[t._v("上一步")]),t._v(" "),e("Button",{staticStyle:{width:"100px"},attrs:{type:"primary"},on:{click:t.save}},[t._v("保存")])],1)])],1)],1)],1)},staticRenderFns:[]};var l=e("C7Lr")(s,a,!1,function(t){e("NRsi")},null,null);i.default=l.exports}});
//# sourceMappingURL=6.b6fd6b8bef9c22765947.js.map