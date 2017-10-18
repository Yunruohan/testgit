import axios from 'axios';
import config from './config';

export default {
  register(model, success, failure) {
    axios.post('/account/register', model, config).then(() => {
      success();
    }).catch((error) => {
      failure(error);
    });
  },
  forgotPassword(model, success, failure) {
    axios.post('/account/forgotPassword', model, config).then(() => {
      success();
    }).catch((error) => {
      failure(error);
    });
  },
  login(model, success, failure) {
    axios.post('/account/login', {
      accountID: model.accountID,
      token: model.token,
    }, config).then(() => {
      success();
    }).catch((error) => {
      failure(error);
    });
  },
};
