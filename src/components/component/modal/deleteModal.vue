<template>
  <Modal v-model="modal" width="360" @on-cancel="cancel">
    <p slot="header" style="color:#f60;text-align:center">
      <Icon type="ios-information-circle"></Icon>
      <span>确认删除？</span>
    </p>
    <div style="text-align:center">
      <p>删除的数据将无法找回！</p>
    </div>
    <div slot="footer">
      <Button type="error" size="large" long :loading="loading.delete" @click="del">删除</Button>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: "deleteModal",
    data() {
      return {
        params: {},
        modal: true,
        loading: {
          delete: false
        }
      }
    },
    computed: {
      deleteParams: {
        get() {
          return this.$store.getters["deleteModal/getDeleteParams"]
        },
        set(value) {
          this.$store.commit("deleteModal/setDeleteParams", value)
        }
      }
    },
    methods: {
      cancel() {
        this.$router.go(-1);
      },
      del() {
        this.loading.delete = true;
        console.log('del', this.deleteParams);
        let form = new FormData();
        if (this.deleteParams.adminId) {
          form.append("adminId", this.deleteParams.adminId);
        } else if (this.deleteParams.roleId) {
          form.append("roleId", this.deleteParams.roleId);
        } else if (this.deleteParams.id) {
          form.append("id", this.deleteParams.id);
        }
        if (this.deleteParams.method === 'delete') {
          this.$axios.delete(this.deleteParams.url, form)
            .then(res => {
              console.log(res.data);
              this.loading.delete = false;
              this.$Message.success("删除成功");
              this.$router.go(-1);
              if (this.deleteParams.callback) {
                this.deleteParams.callback();
              }
            })

        } else {
          this.$axios.post(this.deleteParams.url, form)
            .then(res => {
              console.log(res.data);
              this.loading.delete = false;
              this.$Message.success("删除成功");
              this.$router.go(-1);
              if (this.deleteParams.callback) {
                this.deleteParams.callback();
              }
            });
        }
      }
    },
    mounted() {
      console.log("modalMounted", this.$store.getters["deleteModal/getDeleteParams"]);
    }
  }
</script>

<style scoped>

</style>
