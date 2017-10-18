import patent from '../../api/patent';

export const SHOW_SUCCESS = 'SHOW_SUCCESS';
export const SHOW_FAILURE = 'SHOW_FAILURE';
export const SHOW_SET_TITLE = 'SHOW_SET_TITLE';
export const SHOW_SET_ENTITLE = 'SHOW_SET_ENTITLE';
export const SHOW_SET_PATENTNO = 'SHOW_SET_PATENTNO';
export const SHOW_SET_ISSUEDATE = 'SHOW_SET_ISSUEDATE';
export const SHOW_SET_ABSTRACT = 'SHOW_SET_ABSTRACT';
export const SHOW_SET_ENABSTRACT = 'SHOW_SET_ENABSTRACT';
export const SHOW_SET_APPLICATION = 'SHOW_SET_APPLICATION';
export const SHOW_SET_CLASSIFICATION = 'SHOW_SET_CLASSIFICATION';
export const SHOW_SET_INVENTORS = 'SHOW_SET_INVENTORS';

export default {
  namespace: true,
  state: {},
  getters: {},
  actions: {},
  mutations: {},
  modules: {
    show: {
      namespace: true,
      // 前端数据库
      state: {
        Title: '',
        Entitle: '',
        PatentNo: '',
        IssueDate: '',
        Abstract: '',
        EnAbstract: '',
        Application: '',
        Classification: '',
        Inventors: '',
      },
      // 与后端数据库进行交互
      actions: {
        show({ commit, state }) {
          commit(SHOW_FAILURE, '');
          const model = {
            Title: state.Title,
            Entitle: state.Entitle,
            PatentNo: state.PatentNo,
            IssueDate: state.IssueDate,
            Abstract: state.Abstract,
            EnAbstract: state.EnAbstract,
            Application: state.Application,
            Classification: state.Classification,
            Inventors: state.Inventors,
          };
          patent.show(model,
            () => {
              commit(SHOW_SUCCESS);
            },
            (error) => {
              let strError = '';
              if (error.response === null) {
                strError = '接口错误，请联系管理员。';
              } else {
                strError = '服务器内部错误，请联系管理员。';
              }
              commit(SHOW_FAILURE, strError);
            },
          );
        },
      },
      // 对数据状态的改变
      mutations: {
        /* eslint no-param-reassign: ["error",
           { "props": true, "ignorePropertyModificationsFor": ["state"] }] */
        [SHOW_SUCCESS](state) {
          state.show = true;
        },
        [SHOW_FAILURE](state, strError) {
          state.error = strError;
          state.show = false;
        },
        [SHOW_SET_TITLE](state, Title) {
          state.Title = Title;
        },
        [SHOW_SET_ENTITLE](state, EnTtitle) {
          state.EnTtitle = EnTtitle;
        },
        [SHOW_SET_PATENTNO](state, PatentNo) {
          state.PatentNo = PatentNo;
        },
        [SHOW_SET_ISSUEDATE](state, IssueDate) {
          state.IssueDate = IssueDate;
        },
        [SHOW_SET_ABSTRACT](state, Abstract) {
          state.Abstract = Abstract;
        },
        [SHOW_SET_ENABSTRACT](state, EnAbstract) {
          state.EnAbstract = EnAbstract;
        },
        [SHOW_SET_APPLICATION](state, Application) {
          state.Application = Application;
        },
        [SHOW_SET_CLASSIFICATION](state, Classification) {
          state.Classification = Classification;
        },
        [SHOW_SET_INVENTORS](state, Inventors) {
          state.Inventors = Inventors;
        },
      },
    },
  },
};
