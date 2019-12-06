<template>
<div class="login">
  <h2 class="login-title">吉茂后台管理系统登录</h2>
  <a-form
    id="components-form-demo-normal-login"
    :form="form"
    class="login-form"
    @submit="handleSubmit"
  >
    <a-form-item>
      <a-input
        v-decorator="[
          'userName',
          { rules: [{ required: true, message: '请输入用户名' }] },
        ]"
        placeholder="用户名"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入密码' }] },
        ]"
        type="password"
        placeholder="密码"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
 
      <a-button type="primary" html-type="submit" class="login-form-button">登录</a-button>
      
    </a-form-item>
  </a-form>
</div>

</template>

<script>
import { mapActions } from 'vuex';
export default {
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' });
  },
  methods: {
    ...mapActions(['changeLogin']),
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.changeLogin(values).then(()=>{
            this.form.resetFields();
            this.$router.replace({path:'/home'})
          })
        }
      });
    },
  },
};
</script>
<style lang='stylus' scoped>

.login
  position absolute
  left 50%
  top 50%
  width 450px
  transform translate(-50%,-65%)
  background-color rgba(255,255,255,.4)
  padding 30px 70px
  border-radius 5px
  box-shadow 1px 1px 1px 1px rgba(0,0,0,.2)
  .login-title
    text-align center
    margin-bottom 30px
    color white
    font-size 20px
    letter-spacing 2px
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>