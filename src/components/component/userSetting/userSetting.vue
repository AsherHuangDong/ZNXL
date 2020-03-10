<template>
    <div>
      <Modal
        v-model="showModal"
        title="个人设置"
        width="800"
        ok-text="保存"
        cancel-text="取消"
        @on-cancel="cancelUserSetting"
        @on-ok="confirmUserSetting">
        <Row :gutter="16" style="margin: 10px;">
          <Col span="6" style="text-align: right">
            <span style="width:120px;">员工ID：</span>
          </Col>
          <Col span="18">
            <span style="width:120px;">{{userInfo.adminId}}</span>
          </Col>
        </Row>
        <Row :gutter="16" style="margin: 10px;">
          <Col span="6" style="text-align: right">
            <span style="width:120px;">邮箱：</span>
          </Col>
          <Col span="18">
            <span style="width:120px;">{{userInfo.mailbox}}</span>
          </Col>
        </Row>
        <Row :gutter="16" style="margin: 10px;">
        <Col span="6" style="text-align: right">
          <span style="width:120px;">手机号：</span>
        </Col>
        <Col span="18">
          <span style="width:120px;">{{userInfo.mobile}}</span>
        </Col>
      </Row>
        <Row :gutter="16" style="margin: 10px;">
          <Col span="6" style="text-align: right">
            <span style="width:120px;">角色：</span>
          </Col>
          <Col span="18">
            <span style="width:120px;">{{userInfo.roles}}</span>
          </Col>
        </Row>
        <Row :gutter="16" style="margin: 10px;">
          <Col span="6" style="text-align: right">
            <span style="width:120px;">登录密码：</span>
          </Col>
          <Col span="18">
            <span style="width:120px;">******</span>&nbsp;&nbsp;&nbsp;
            <a style="color: blue;" @click="showEditPassword">修改</a>
          </Col>
        </Row>
        <Row :gutter="16" style="margin: 10px;">
        <Col span="6" style="text-align: right">
          <span style="width:120px;">绑定谷歌OTP：</span>
        </Col>
        <Col span="18">
          <a @click="showGoogle" style="width:120px;color: blue;">绑定</a>
        </Col>
      </Row>
        <Row :gutter="16" style="margin: 10px;">
          <Col span="6" style="text-align: right">
            <span style="width:120px;">登录IP限制：</span>
          </Col>
          <Col span="18">
            <Checkbox>启用</Checkbox>&nbsp;&nbsp;&nbsp;
            <a @click="addIP" style="color: blue;">添加IP</a><br>
            <Table border :columns="columns1" :data="data1"></Table>
          </Col>
        </Row>
      </Modal>
      <Modal
        v-model="show.changePassword"
        title="修改密码"
        ok-text="保存"
        cancel-text="取消"
        @on-cancel="cancelChangePassword"
        @on-ok="confirmChangePassword">
        <Form :model="changePasswordParams" label-position="right" :label-width="100" style="width:90%;">
          <FormItem label="原密码">
            <Input v-model="changePasswordParams.oldPassword"></Input>
          </FormItem>
          <FormItem label="新密码">
            <Input v-model="changePasswordParams.newPassword"></Input>
          </FormItem>
          <FormItem label="确认密码">
            <Input v-model="changePasswordParams.confirmPassword"></Input>
          </FormItem>
          <FormItem label="手机验证码">
            <Input style="width: 75%;margin-right: 4%;" v-model="changePasswordParams.phoneCode"></Input>
            <Button style="width: 20%" type="primary">发送</Button>
          </FormItem>
          <FormItem label="谷歌验证码">
            <Input style="width: 75%;margin-right: 4%;" v-model="changePasswordParams.googleCode"></Input>
            <Button style="width: 20%" type="primary">发送</Button>
          </FormItem>
        </Form>
      </Modal>
      <Modal
        v-model="show.google"
        title="绑定谷歌"
        ok-text="保存"
        cancel-text="取消"
        @on-cancel="cancelGoogle"
        @on-ok="confirmGoogle">
        <Row>
          <Col span="1">
            <div style="height: 100%;line-height: 1;display: inline-block">
              <Badge :count="1" type="primary"></Badge>&nbsp;
            </div>
          </Col>
          <Col span="23">
            <div style="display: inline-block;vertical-align:text-top;margin-left: 10px;">
              <span style="font-weight: bold">使用谷歌身份验证器扫描二维码或手动输入密钥</span><br>
              <span>打开谷歌验证器，扫描下方二维码或手动输入下述密钥添加验证令牌</span><br>
              <div class="erWeiMa"><img style="margin-top: 5px;" src="../../../assets/img/17430812323133.png" height="68" width="68"/></div>
              <div style="margin:10px;background-color: #eee;display: inline-block;">
                <span id="copySpan">KLSDHF87ASF8OGRUIAHDFO</span>
                <a @click="copyCode" style="color:#666;display: inline-block;margin-left: 10px;">复制</a>
              </div>
            </div>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span="1">
            <div style="height: 100%;line-height: 1;display: inline-block;">
              <Badge :count="2" type="primary"></Badge>&nbsp;
            </div>
          </Col>
          <Col span="23">
            <div style="display: inline-block;vertical-align:text-top;margin-left: 10px;">
              <span style="font-weight: bold">完成绑定</span><br>
              <span style="font-weight: bold;color:orange;">密钥用于手机更换或遗失时找回谷歌证器，绑定前请务必将上述密钥备份保存</span><br>
            </div>
            <div style="margin:10px auto;width:70%;">
            <Form :model="phoneGoogleCode" label-position="left" style="width:100%">
              <FormItem>
                <Input v-model="phoneGoogleCode.phone" placeholder="手机验证码"><a slot="append">获取验证码</a></Input>
              </FormItem>
              <FormItem>
                <Input v-model="phoneGoogleCode.google" placeholder="谷歌验证码"></Input>
              </FormItem>
            </Form>
              <div style="margin:10px auto;">
                <Button type="primary" long>提交</Button>
              </div>
            </div>
          </Col>
        </Row>
        <div slot="footer">
        </div>
      </Modal>
    </div>
</template>

<script>
  import { copySuccess, copyError } from '../../component/message/message'
  export default {
    name: "userSetting",
    data() {
      let self = this;
      return {
        userInfo: JSON.parse(localStorage.getItem("userInfo")),
        phoneGoogleCode: {
          phone: '',
          google: ''
        },
        changePasswordParams: {
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
          phoneCode: '',
          googleCode: ''
        },
        show: {
          changePassword: false,
          google: false
        },
        columns1: [
          {
            title: '序号',
            width: 80,
            align: 'center',
            render(h, param){
              let result = null;
              result = h("span", {}, param.row._index + 1);
              return result;
            }
          },
          {
            title: 'IP',
            align: 'center',
            render(h, param){
              let result = null;
              if (param.row.input){
                result = h("input",{
                  style: { width: '100%'},
                  on: {
                    change(e) {
                      console.log(e.srcElement.value);
                      self.data1[param.row._index].IP = e.srcElement.value;
                    }
                  }
                }, '')
              } else {
                result = h("span",{}, param.row.IP)
              }
              return result;
            }
          },
          {
            title: '操作',
            align: 'center',
            render(h, param){
              let result = null;
              if (param.row.input){
                result = h("a",{
                  style: { color: 'blue'},
                  on: {
                    click() {
                      self.data1[param.row._index].input = false;
                    }
                  }
                }, '保存')
              } else {
                result = h("a",{
                  style: { color: 'blue'},
                  on: {
                    click() {
                      self.data1.splice(param.row._index, 1)
                    }
                  }
                }, '删除')
              }
              return result;
            }
          }
        ],
        data1: [
          {
            IP: '192.168.1.1',
            input: false
          }
        ]
      }
    },
    computed: {
      showModal: {
        get() {
          return this.$store.getters['personalData/getShowPersonalData'];
        },
        set(value) {
          this.$store.commit('personalData/setShowPersonalData', value)
        }
      }
    },
    methods: {
      copyText(text) {
        let flag = false;
        let textarea = document.createElement("input");//创建input对象
        let currentFocus = document.activeElement;//当前获得焦点的元素
        document.body.appendChild(textarea);//添加元素
        textarea.value = text;
        textarea.focus();
        if(textarea.setSelectionRange)
          textarea.setSelectionRange(0, textarea.value.length);//获取光标起始位置到结束位置
        else
          textarea.select();
        try {
          flag = document.execCommand("copy");//执行复制
        } catch(eo) {
          flag = false;
        }
        document.body.removeChild(textarea);//删除元素
        currentFocus.focus();
        return flag;
      },
      copyCode() {
        let str= document.getElementById('copySpan').innerText;
        console.log('copy', str);
        let flag = this.copyText(str);
        flag ? copySuccess() : copyError();
      },
      cancelGoogle() {
        this.show.google = false;
        this.showModal = true;
      },
      confirmGoogle() {
        console.log("confirmGoogle")
      },
      showGoogle() {
        this.show.google=true;
        this.showModal=false
      },
      confirmChangePassword() {
        console.log("confirmChangePassword")
      },
      cancelChangePassword() {
        this.showModal = true;
        this.show.changePassword = false;
      },
      showEditPassword() {
        this.showModal = false;
        this.show.changePassword = true;
      },
      cancelUserSetting() {
        this.showModal = false;
      },
      confirmUserSetting() {
        console.log("confirmUserSetting")
      },
      addIP() {
        this.data1.push({IP: '', input: true})
      }
    }
  }
</script>

<style scoped>
  .erWeiMa{
    width: 80px;
    height: 80px;
    border: 1px solid #ddd;
    text-align: center;
    display: inline-block;
    vertical-align:text-top;
  }
</style>
