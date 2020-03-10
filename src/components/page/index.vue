<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  width: 45px;
  height: 45px;
  background: #5b6270;
  border-radius: 50%;
  float: right;
  position: relative;
  top: 10px;
  left: 0px;
}
.layout-nav {
  width: 420px;
  margin: 0 -20px 0 auto;
  display: flex;
  justify-content: flex-end;
}

</style>
<template>
  <div class="layout">
    
    <Layout :style="{height:height+'px',position: 'fixed', width: '100%',overflow: 'scroll'}">
      <Header class="header">
        <Menu mode="horizontal" theme="dark" active-name="1">
          <MenuItem style="color:#fff;font-size:28px;" name="2">自助心理咨询程序管理后台</MenuItem>
          <div class="layout-nav">
            <MenuItem name="1">用户昵称</MenuItem>
            <div class="layout-logo"></div>
          </div>
        </Menu>
      </Header>

      <Layout>
        <Sider collapsible :collapsed-width="0" v-model="isCollapsed" :style="{background: '#fff'}">
          <Menu theme="light" width="auto" accordion @on-select="selectMenu" :class="menuitemClasses">
            <div v-for="item in menuList" :key="item.name">
              <Submenu v-if="item.show&&item.children" :name="item.name">
                <template slot="title">{{item.title}}</template>
                <div v-if="item2.show || item2.name==='other'" v-for="item2 in item.children">
                  <MenuItem
                    v-if="!item2.children"
                    :key="item2.name"
                    :name="item2.name"
                  >{{item2.title}}</MenuItem>
                  <Submenu v-else :key="item2.name" :name="item2.name">
                    <template slot="title">{{item2.title}}</template>
                    <MenuItem
                      v-if="item3.show"
                      v-for="item3 in item2.children"
                      :key="item3.name"
                      :name="item3.name"
                    >{{item3.title}}</MenuItem>
                  </Submenu>
                </div>
              </Submenu>

              <MenuItem v-if="item.show&&!item.children" :name="item.name">
                <template>{{item.title}}</template>
              </MenuItem>
            </div>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '12px 0'}">
            <BreadcrumbItem>
              <div style="height: 18px;width:1px;border: 3px solid #515a6e;display: inline-block;"></div>
              <span
                style="height: 18px;line-height: 18px;font-size:18px;display: inline-block;"
              >{{$route.meta.title}}</span>
            </BreadcrumbItem>
          </Breadcrumb>
          <Content
            :style="{padding: '24px', minHeight: '280px',height: '100%', background: '#fff'}"
          >
            <router-view />
          </Content>
        </Layout>
      </Layout>
    </Layout>
    
  </div>
</template>
<script>
import menuList from "../../perm/menuList";
//import UserSetting from "../component/userSetting/userSetting";
export default {
  name: "index",
  //components: { UserSetting },
  data() {
    return {
      userName: "",
      height: 0,
      menuList: [],
      isCollapsed: false
    };
  },
  methods: {
    selectMenu(name) {
      this.$router.push("/" + name);
    },
    // 生成左侧菜单
    getSideBar() {
      // console.log(111)
      let M = menuList();
      // console.log(M)
      //let permPath = JSON.parse(localStorage.getItem("permPath"));
      function f(arr) {
        for (let i = 0; i < arr.length; i++) {
          arr[i].show = true;
          if (arr[i].children) {
            f(arr[i].children);
          }
        }
      }
      f(M);
      this.menuList = M;
      console.log(M);
    }
  },
  mounted() {
    let _this = this;
    _this.height = document.documentElement.clientHeight - 2;
    window.onresize = function() {
      _this.height = document.documentElement.clientHeight - 2;
    };
    this.getSideBar();
  },
  computed:{
    menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
  }
};
</script>
<style>
.layout {
  overflow-y: scroll !important;
}
.ivu-menu-horizontal {
  height: 64px;
  line-height: 64px;
}
.header .ivu-menu-submenu .ivu-menu-submenu-title {
  color: #fff;
}
</style>
