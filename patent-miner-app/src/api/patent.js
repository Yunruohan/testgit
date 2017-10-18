import axios from 'axios';
import config from './config';

export default {
  show(model, success, failure) {
    axios.post('/account/show', model, config).then(() => {
      success();
    }).catch((error) => {
      failure(error);
    });
  },
};
