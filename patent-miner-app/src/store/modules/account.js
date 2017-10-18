import account from '../../api/account';

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const REGISTER_SET_USERNAME = 'REGISTER_SET_USERNAME';
export const REGISTER_SET_FIRSTNAME = 'REGISTER_SET_FIRSTNAME';
export const REGISTER_SET_LASTNAME = 'REGISTER_SET_LASTNAME';
export const REGISTER_SET_GENDER = 'REGISTER_SET_GENDER';
export const REGISTER_SET_TYPE = 'REGISTER_SET_TYPE';
export const REGISTER_SET_RECEIVEMESSAGES = 'REGISTER_SET_RECEIVEMESSAGES';
export const REGISTER_SET_AGREERULES = 'REGISTER_SET_AGREERULES';

export const FORGOTPASSWORD_SUCCESS = 'FORGOTPASSWORD_SUCCESS';
export const FORGOTPASSWORD_FAILURE = 'FORGOTPASSWORD_FAILURE';
export const FORGOTPASSWORD_SET_USERNAME = 'FORGOTPASSWORD_SET_USERNAME';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export default {
  namespace: true,
  state: {},
  getters: {},
  actions: {},
  mutations: {},
  modules: {
    register: {
      namespace: true,
      state: {
        username: '',
        firstName: '',
        lastName: '',
        gender: null,
        type: null,
        receiveMessages: false,
        agreeRules: false,
        registed: false,
        error: '',
      },
      actions: {
        register({ commit, state }) {
          commit(REGISTER_FAILURE, '');
          if (state.agreeRules === false) {
            commit(REGISTER_FAILURE, '请阅读条款及服务协议');
            return;
          }
          const model = {
            username: state.username,
            firstName: state.firstName,
            lastName: state.lastName,
            gender: state.gender,
            type: state.type,
            receiveMessages: state.receiveMessages,
            agreeRules: state.agreeRules,
          };
          account.register(model,
            () => {
              commit(REGISTER_SUCCESS);
            },
            (error) => {
              let strError = '';
              if (error.response === null) {
                strError = '接口错误，请联系管理员。';
              } else if (error.response.status === 400) {
                strError = '注册表单错误，请检查。';
              } else if (error.response.status === 404) {
                strError = `电子邮箱地址${state.username}未找到。`;
              } else if (error.response.status === 409) {
                strError = `账户${state.username}已存在。`;
              } else {
                strError = '服务器内部错误，请联系管理员。';
              }
              commit(REGISTER_FAILURE, strError);
            },
          );
        },
      },
      mutations: {
        /* eslint no-param-reassign: ["error",
           { "props": true, "ignorePropertyModificationsFor": ["state"] }] */
        [REGISTER_SUCCESS](state) {
          state.registed = true;
        },
        [REGISTER_FAILURE](state, strError) {
          state.error = strError;
          state.registed = false;
        },
        [REGISTER_SET_USERNAME](state, username) {
          state.username = username;
        },
        [REGISTER_SET_FIRSTNAME](state, firstName) {
          state.firstName = firstName;
        },
        [REGISTER_SET_LASTNAME](state, lastName) {
          state.lastName = lastName;
        },
        [REGISTER_SET_GENDER](state, gender) {
          state.gender = gender;
        },
        [REGISTER_SET_TYPE](state, type) {
          state.type = type;
        },
        [REGISTER_SET_RECEIVEMESSAGES](state, receiveMessages) {
          state.receiveMessages = receiveMessages;
        },
        [REGISTER_SET_AGREERULES](state, agreeRules) {
          state.agreeRules = agreeRules;
        },
      },
    },
    forgotPassword: {
      namespace: true,
      state: {
        username: '',
        sended: false,
        error: '',
      },
      actions: {
        forgotPassword({ commit, state }) {
          commit(REGISTER_FAILURE, '');
          const model = {
            username: state.username,
          };
          account.forgotPassword(model,
            () => {
              commit(FORGOTPASSWORD_SUCCESS);
            },
            (error) => {
              let strError = '';
              if (error.response === null) {
                strError = '接口错误，请联系管理员。';
              } else if (error.response.status === 400) {
                strError = '注册表单错误，请检查。';
              } else if (error.response.status === 404) {
                strError = `账户${state.username}未找到。`;
              } else {
                strError = '服务器内部错误，请联系管理员。';
              }
              commit(FORGOTPASSWORD_FAILURE, strError);
            },
          );
        },
      },
      mutations: {
        /* eslint no-param-reassign: ["error",
           { "props": true, "ignorePropertyModificationsFor": ["state"] }] */
        [FORGOTPASSWORD_SUCCESS](state) {
          state.sended = true;
        },
        [FORGOTPASSWORD_FAILURE](state, strError) {
          state.error = strError;
          state.sended = false;
        },
        [FORGOTPASSWORD_SET_USERNAME](state, username) {
          state.username = username;
        },
      },
    },
  },
};
