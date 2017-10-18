<template>
  <div class="container" v-if="registed">
    账户{{username}}注册成功，请前往邮箱验证。
  </div>
  <div class="container" v-else>
    <el-card header="用户注册" class="col-xs-12 col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3">
      <el-alert
        v-if="error !== ''"
        :title="error"
        type="error"
        show-icon>
      </el-alert>
      <el-form :rules="rules" :model="this" ref="registerForm">
        <el-form-item label="账户名称" prop="username" class="col-xs-12">
          <el-input v-model="username" placeholder="电子邮件地址"></el-input>
        </el-form-item>
        <el-form-item label="名字" prop="firstName" class="col-xs-12 col-sm-6">
          <el-input v-model="firstName" placeholder="名字"></el-input>
        </el-form-item>
        <el-form-item label="姓氏" prop="lastName" class="col-xs-12 col-sm-6">
          <el-input v-model="lastName" placeholder="姓氏"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender" class="col-xs-12 col-sm-6">
          <el-select v-model="gender" placeholder="性别">
            <el-option
              v-for="(value, key) in genderOptions"
              :key="key"
              :label="value"
              :value="key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户类别" prop="type" class="col-xs-12 col-sm-6">
          <el-select v-model="type" placeholder="用户类别">
            <el-option
              v-for="(value, key) in typeOptions"
              :key="key"
              :label="value"
              :value="key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="receiveMessages" class="col-xs-12">
          <el-checkbox v-model="receiveMessages">我希望收到新的消息和动态提醒</el-checkbox>
        </el-form-item>
        <el-form-item prop="agreeRules" class="col-xs-12">
          <el-checkbox v-model="agreeRules">我同意<el-button type="text" @click="rulesVisible = true">条款及服务协议</el-button></el-checkbox>
          <el-dialog
            title="条款及服务协议"
            :visible.sync="rulesVisible"
            size="tiny"
            :before-close="rulesClose">
            <span>后期在此处添加条款及服务协议</span>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dontAgree">残忍拒绝</el-button>
              <el-button type="primary" @click="agree">接受协议</el-button>
            </span>
          </el-dialog>
        </el-form-item>
        <el-form-item class="col-xs-12">
          <el-button type="primary" @click="submitForm('registerForm')">立即注册</el-button>
          <el-button @click="resetForm('registerForm')">重置</el-button>
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
        genderOptions: {
          Male: '男性',
          Female: '女性',
          Secret: '保密',
        },
        typeOptions: {
          Personal: '个人',
          University: '高校',
          Research_Institutes: '科研院所',
          Trade_Associations: '行业协会',
          Patent_Agency: '专利代理机构',
          Patent_Pilot_Demonstration_Enterprise: '专利试点示范企业',
          Other_Enterprises: '其他企事业单位',
        },
        rulesVisible: false,
        rules: {
          username: [
            { type: 'email', required: true, message: '请输入电子邮箱地址', trigger: 'blur' },
          ],
          firstName: [
            { required: true, message: '请输入名字', trigger: 'blur' },
          ],
          lastName: [
            { required: true, message: '请输入姓氏', trigger: 'blur' },
          ],
          gender: [
            { required: true, message: '请选择性别', trigger: 'change' },
          ],
          type: [
            { required: true, message: '请选择用户类别', trigger: 'change' },
          ],
        },
      };
    },
    computed: {
      registed: {
        get() {
          return this.$store.state.account.register.registed;
        },
      },
      username: {
        get() {
          return this.$store.state.account.register.username;
        },
        set(value) {
          this.$store.commit(types.ACCOUNT_REGISTER_SET_USERNAME, value);
        },
      },
      firstName: {
        get() {
          return this.$store.state.account.register.firstName;
        },
        set(value) {
          this.$store.commit(types.ACCOUNT_REGISTER_SET_FIRSTNAME, value);
        },
      },
      lastName: {
        get() {
          return this.$store.state.account.register.lastName;
        },
        set(value) {
          this.$store.commit(types.ACCOUNT_REGISTER_SET_LASTNAME, value);
        },
      },
      gender: {
        get() {
          return this.$store.state.account.register.gender;
        },
        set(value) {
          this.$store.commit(types.ACCOUNT_REGISTER_SET_GENDER, value);
        },
      },
      type: {
        get() {
          return this.$store.state.account.register.type;
        },
        set(value) {
          this.$store.commit(types.ACCOUNT_REGISTER_SET_TYPE, value);
        },
      },
      receiveMessages: {
        get() {
          return this.$store.state.account.register.receiveMessages;
        },
        set(value) {
          this.$store.commit(types.ACCOUNT_REGISTER_SET_RECEIVEMESSAGES, value);
        },
      },
      agreeRules: {
        get() {
          return this.$store.state.account.register.agreeRules;
        },
        set(value) {
          this.$store.commit(types.ACCOUNT_REGISTER_SET_AGREERULES, value);
        },
      },
      error: {
        get() {
          return this.$store.state.account.register.error;
        },
      },
    },
    methods: {
      ...mapActions({
        register: 'account/register/register',
      }),
      agree() {
        this.agreeRules = true;
        this.rulesVisible = false;
      },
      dontAgree() {
        this.agreeRules = false;
        this.rulesVisible = false;
      },
      rulesClose() {
        this.$confirm('接收协议？')
          .then(() => {
            this.agree();
          })
          .catch(() => {
            this.dontAgree();
          });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.register();
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
