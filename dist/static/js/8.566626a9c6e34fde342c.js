webpackJsonp([8],{ICGV:function(t,e){},i9sa:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=s("3cXf"),a=s.n(o),i={components:{VueEditor:s("WHp7").a},data:function(){return{modelAdd:!0,isShowTask:!0,isShowTaskAdd:!1,contentList:[],resourceType:[{type:1,value:"音频"},{type:2,value:"视频"},{type:3,value:"电子书"},{type:4,value:"问卷"},{type:5,value:"表单"},{type:6,value:"小游戏"}],taskResourceList:{type:1,status:2,contentId:[]},addNode:{verbalTrickId:"",stageId:"",upId:"",term:3,termValue:"",nodeTextList:[],taskResourceMap:{}},addNode1:{verbalTrickId:"",stageId:"",nodeTextList:[],taskResourceMap:{isComment:"",taskResourceList:[]}},index:""}},methods:{addOption:function(t){this.addNode.nodeTextList[t].textOptionList.push({option:"",optionContent:""})},deleteOption:function(t,e){console.log(e),this.addNode.nodeTextList[t].textOptionList.splice(e,1)},addText:function(){this.addNode.nodeTextList.push({content:"",textOptionList:[]})},addTask:function(){var t=this;this.addNode.taskResourceMap={isComment:!1,taskResourceList:[{contentId:"",type:1,status:1}]},this.$axios.post("api/taskResource/getTaskResourceList",{type:this.addNode.taskResourceMap.taskResourceList[0].type}).then(function(e){t.contentList=e.data.data,console.log("contentId",t.contentList),t.addNode.taskResourceMap.taskResourceList[0].contentId=t.contentList[0].contentId}),this.isShowTaskAdd=!0,this.isShowTask=!1},select1:function(t){var e=this;this.addNode.taskResourceMap.taskResourceList[0].type=t,this.taskResourceList.type=t,this.$axios.post("api/taskResource/getTaskResourceList",{type:t}).then(function(t){e.contentList=t.data.data,e.addNode.taskResourceMap.contentId=t.data.data[0].contentId})},deleteText:function(t){this.addNode.nodeTextList.splice(t,1)},deleteTask:function(){this.addNode.taskResourceMap={},this.isShowTaskAdd=!1,this.isShowTask=!0},save:function(){var t=this;if(console.log(this.addNode),console.log(this.taskResourceList),this.addNode1.verbalTrickId=this.addNode.verbalTrickId,this.addNode1.stageId=this.addNode.stageId,this.addNode.upId&&(this.addNode1.upId=this.addNode.upId),this.addNode.term&&this.addNode.termValue&&3!=this.addNode.term&&(this.addNode1.term=this.addNode.term,this.addNode1.termValue=this.addNode.termValue),3==this.addNode.term&&(this.addNode1.term=this.addNode.term,this.addNode1.termValue=""),this.addNode1.nodeTextList=this.addNode.nodeTextList,"{}"!=a()(this.addNode.taskResourceMap)?(1==this.addNode.taskResourceMap.isComment&&(this.addNode1.taskResourceMap.isComment=1),0==this.addNode.taskResourceMap.isComment&&(this.addNode1.taskResourceMap.isComment=2),this.addNode1.taskResourceMap.taskResourceList.push(this.addNode.taskResourceMap.taskResourceList[0]),0!=this.taskResourceList.contentId.length&&this.taskResourceList.contentId.forEach(function(e){t.addNode1.taskResourceMap.taskResourceList.push({type:t.taskResourceList.type,status:2,contentId:e})})):delete this.addNode1.taskResourceMap,0!=this.addNode1.nodeTextList.length){var e=1,s=1,o=1;if(this.addNode1.nodeTextList.forEach(function(t){t.content||(e=2),0!=t.textOptionList.length&&t.textOptionList.forEach(function(t){t.option||(s=2),t.optionContent||(o=2)})}),2==e)return this.$Message.info("请输入文本内容"),!1;if(2==s)return this.$Message.info("请输入选项"),!1;if(2==o)return this.$Message.info("请输入选项对应内容"),!1}if(3!=this.addNode1.term&&(console.log("ffff"),!this.addNode1.termValue))return this.$Message.info("请输入触发条件内容"),!1;console.log(this.addNode1),this.$axios.post("api/verbalTrickNode/addVerbalTrickNode",this.addNode1).then(function(e){0==e.data.code?(t.$Message.success("添加成功！"),t.$router.go(-1)):t.$Message.error(e.data.msg)}),this.isShowTaskAdd=!1,this.addNode.nodeTextList=[],this.addNode.taskResourceMap={},this.taskResourceList.contentId=[]},cancel:function(){this.$router.go(-1)},handleImageAdded:function(t,e,s,o){var a=new FormData;a.append("img",t),this.$axios.post("api/file/upload",a).then(function(t){var a=t.data.data.path;e.insertEmbed(s,"image",a),o()}).catch(function(t){console.log(t)})},assignHomework:function(){}},mounted:function(){this.addNode.verbalTrickId=this.$route.query.verbalTrickId,this.addNode.stageId=this.$route.query.momentChild,this.index=this.$route.query.index,this.$route.query.upId&&(this.addNode.upId=this.$route.query.upId),console.log(this.addNode)}},d={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{attrs:{id:"addNodeText"}},[s("Modal",{attrs:{width:"700","mask-closable":!1,closable:!1,transfer:!1},model:{value:t.modelAdd,callback:function(e){t.modelAdd=e},expression:"modelAdd"}},[s("p",{attrs:{slot:"header"},slot:"header"},[s("span",{staticStyle:{"font-size":"20px"}},[t._v("话术详情")])]),t._v(" "),s("div",{staticClass:"addText"},[s("Button",{attrs:{type:"primary"},on:{click:t.addText}},[t._v("新增文本")]),t._v(" "),t.isShowTask?s("Button",{attrs:{type:"primary"},on:{click:t.addTask}},[t._v("新增任务")]):t._e(),t._v(" "),t.isShowTask?t._e():s("Button",{attrs:{disabled:"",type:"primary"}},[t._v("新增任务")])],1),t._v(" "),s("div",{staticStyle:{"margin-top":"56px"}},t._l(t.addNode.nodeTextList,function(e,o){return s("div",{key:o,staticStyle:{"background-color":"rgba(235, 240, 251, 1)",width:"638px","padding-bottom":"10px","margin-bottom":"10px"}},[s("span",{staticStyle:{color:"#07175D",display:"inline-block","text-align":"left","margin-left":"10px","margin-top":"10px"}},[t._v("话术文本")]),t._v(" "),s("a",{staticStyle:{color:"red",display:"inline-block",float:"right","margin-right":"10px","margin-top":"10px"},on:{click:function(e){return t.deleteText(o)}}},[t._v("删除")]),t._v(" "),s("VueEditor",{staticStyle:{width:"620px","margin-left":"10px","margin-top":"5px",background:"#fff"},attrs:{useCustomImageHandler:""},on:{"image-added":t.handleImageAdded},model:{value:e.content,callback:function(s){t.$set(e,"content",s)},expression:"item.content"}}),t._v(" "),s("a",{staticStyle:{"font-size":"10px",color:"blue","margin-left":"10px","margin-top":"10px"},on:{click:function(e){return t.addOption(o)}}},[t._v("+新增选项")]),t._v(" "),t._l(e.textOptionList,function(e,a){return s("div",{key:a,staticStyle:{width:"620px",display:"flex","justify-content":"space-between","align-items":"center","padding-left":"10px","margin-top":"10px"}},[s("Input",{staticStyle:{width:"50px","margin-right":"10px","text-align":"center"},model:{value:e.option,callback:function(s){t.$set(e,"option",s)},expression:"item1.option"}}),t._v(" "),s("Input",{staticStyle:{width:"550px","margin-right":"10px"},attrs:{placeholder:"请输入选项内容"},model:{value:e.optionContent,callback:function(s){t.$set(e,"optionContent",s)},expression:"item1.optionContent"}}),t._v(" "),s("img",{staticStyle:{width:"20px",height:"20px",margin:"0",cursor:"pointer"},attrs:{src:"static/img/remove.png"},on:{click:function(e){return t.deleteOption(o,a)}}})],1)})],2)}),0),t._v(" "),s("br"),t._v(" "),t.isShowTaskAdd?s("div",[s("div",{staticStyle:{"background-color":"rgba(235, 240, 251, 1)",width:"638px","min-height":"168px","margin-bottom":"10px"}},[s("span",{staticStyle:{color:"#07175D",display:"inline-block","text-align":"left","margin-left":"10px","margin-top":"10px"}},[t._v("任务资源")]),t._v(" "),s("a",{staticStyle:{color:"red",display:"inline-block",float:"right","margin-right":"10px","margin-top":"10px"},on:{click:t.deleteTask}},[t._v("删除")]),t._v(" "),s("div",{staticStyle:{"margin-top":"10px"}},[s("span",{staticStyle:{color:"#07175D",display:"inline-block","text-align":"left","margin-left":"10px","margin-top":"10px"}},[t._v("请选择任务资源：")]),t._v(" "),s("Select",{staticStyle:{width:"70px"},on:{"on-change":t.select1},model:{value:t.addNode.taskResourceMap.taskResourceList[0].type,callback:function(e){t.$set(t.addNode.taskResourceMap.taskResourceList[0],"type",e)},expression:"addNode.taskResourceMap.taskResourceList[0].type"}},t._l(t.resourceType,function(e,o){return s("Option",{key:o,attrs:{value:e.type}},[t._v(t._s(e.value))])}),1),t._v(" "),s("Select",{staticStyle:{width:"400px"},model:{value:t.addNode.taskResourceMap.taskResourceList[0].contentId,callback:function(e){t.$set(t.addNode.taskResourceMap.taskResourceList[0],"contentId",e)},expression:"addNode.taskResourceMap.taskResourceList[0].contentId"}},t._l(t.contentList,function(e,o){return s("Option",{key:o,attrs:{value:e.contentId}},[t._v(t._s(e.title))])}),1)],1),t._v(" "),s("div",{staticStyle:{"margin-top":"10px"}},[s("span",{staticStyle:{color:"#07175D",display:"inline-block","text-align":"left","margin-left":"10px","margin-top":"10px"}},[t._v("请选择备选资源：")]),t._v(" "),s("Select",{staticStyle:{width:"70px"},on:{"on-change":t.select1},model:{value:t.taskResourceList.type,callback:function(e){t.$set(t.taskResourceList,"type",e)},expression:"taskResourceList.type"}},t._l(t.resourceType,function(e,o){return s("Option",{key:o,attrs:{value:e.type}},[t._v(t._s(e.value))])}),1),t._v(" "),s("Select",{staticStyle:{width:"400px"},attrs:{multiple:""},model:{value:t.taskResourceList.contentId,callback:function(e){t.$set(t.taskResourceList,"contentId",e)},expression:"taskResourceList.contentId"}},t._l(t.contentList,function(e,o){return s("Option",{key:o,attrs:{value:e.contentId}},[t._v(t._s(e.title))])}),1)],1),t._v(" "),s("Checkbox",{staticStyle:{"margin-left":"10px","margin-top":"10px"},model:{value:t.addNode.taskResourceMap.isComment,callback:function(e){t.$set(t.addNode.taskResourceMap,"isComment",e)},expression:"addNode.taskResourceMap.isComment"}},[t._v("接受用户评价")])],1)]):t._e(),t._v(" "),s("br"),t._v(" "),s("div",[s("div",{staticStyle:{width:"57px",height:"20px"}},[s("p",[s("span",{staticStyle:{color:"#07175D","font-size":"14px"}},[t._v("触发条件")])])]),t._v(" "),s("br"),t._v(" "),s("div",[s("Select",{staticStyle:{width:"100px",display:"inline-block"},attrs:{transfer:""},model:{value:t.addNode.term,callback:function(e){t.$set(t.addNode,"term",e)},expression:"addNode.term"}},[s("Option",{attrs:{value:3}},[t._v("无")]),t._v(" "),s("Option",{attrs:{value:1}},[t._v("用户选择")]),t._v(" "),s("Option",{attrs:{value:2}},[t._v("用户输入")])],1),t._v(" "),3!=t.addNode.term?s("Input",{staticStyle:{width:"200px",display:"inline-block","text-align":"center"},attrs:{type:"text",placeholder:"请输入内容"},model:{value:t.addNode.termValue,callback:function(e){t.$set(t.addNode,"termValue",e)},expression:"addNode.termValue"}}):t._e()],1)]),t._v(" "),s("div",{attrs:{slot:"footer"},slot:"footer"},[s("Button",{on:{click:t.cancel}},[t._v("取消")]),t._v(" "),s("Button",{attrs:{type:"primary"},on:{click:t.save}},[t._v("确定")])],1)])],1)},staticRenderFns:[]};var n=s("C7Lr")(i,d,!1,function(t){s("ICGV")},"data-v-535e0b61",null);e.default=n.exports}});
//# sourceMappingURL=8.566626a9c6e34fde342c.js.map