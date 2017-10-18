<template>
  <div class="container" v-if="sended">
    账户{{username}}密码重置邮件发送成功，请前往邮箱重置密码。
  </div>
  <div class="container" v-else>
    <el-card header="忘记密码" class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
      <el-alert
        v-if="error !== ''"
        :title="error"
        type="error"
        show-icon>
      </el-alert>
      <el-form :rules="rules" :model="this" ref="forgotPasswordForm">
        <el-form-item label="账户名称" prop="username" class="col-xs-12">
          <el-input v-model="username" placeholder="电子邮件地址"></el-input>
        </el-form-item>
        <el-form-item class="col-xs-12">
          <el-button type="primary" @click="submitForm('forgotPasswordForm')">发送重置密码邮件</el-button>
          <el-button @click="resetForm('forgotPasswordForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
  import { mapActions } from 'vuex';
  import * as types from '../../store/mutation-types';

  export default {
    data() {
      return {
        rules: {
          username: [
            { type: 'email', required: true, message: '请输入电子邮箱地址', trigger: 'blur' },
          ],
        },
      };
    },
    computed: {
      sended: {
        get() {
          return this.$store.state.account.forgotPassword.sended;
        },
      },
      username: {
        get() {
          return this.$store.state.account.forgotPassword.username;
        },
        set(value) {
          this.$store.commit(types.ACCOUNT_FORGOTPASSWORD_SET_USERNAME, value);
        },
      },
      error: {
        get() {
          return this.$store.state.account.forgotPassword.error;
        },
      },
    },
    methods: {
      ...mapActions({
        forgotPassword: 'account/forgotPassword/forgotPassword',
      }),
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.forgotPassword();
            return true;
          }
          return false;
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    },
  };
</script>
