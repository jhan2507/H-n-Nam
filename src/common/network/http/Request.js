import axios from 'axios';
import common from './Common';
import message from 'antd/lib/message';
import { store } from 'store';

axios.interceptors.request.use(
  (config) =>
    // console.log("before request: success", config);
    config,
  (error) =>
    // console.log("before request: not success");
    Promise.reject(error),
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) =>
    // Do something with response data
    // console.log("response: success");
    response,
  (error) =>
    // Do something with response error
    // console.log("response: not success");
    Promise.reject(error),
);

class Request {
  constructor() {
    //Init cancelToken. Note: Must create cancel token for each request
    this.cancelToken = axios.CancelToken;
    this.source = this.cancelToken.source();
  }

  get(
    url,
    params,
    loadingMessage = '',
    successMessage = '',
    errorMessage = '',
  ) {
    const users = store.getState();
    const token = users.user.userInfo.token;
    const key = `get-data-${url}`;
    const { urlProcess, allParams } = common.getURL(url, params);
    message.loading({ content: loadingMessage, key, duration: 0 });
    return axios
      .get(urlProcess, {
        params: allParams,
        headers: {
          Authorization: `Bearer ${token}`,
          responseType: 'blob',
        },
      })
      .then((response) => {
        message.success({
          content: successMessage,
          key,
          duration: 1,
        });
        return response.data;
      })
      .catch((error) => {
        error = errorMessage;
        message.error({ content: error, key, duration: 0 });
      })
      .finally(() => message.destroy());
  }

  getAllTotal(
    url,
    params,
    loadingMessage = '',
    successMessage = '',
    errorMessage = '',
  ) {
    const users = store.getState();
    const token = users.user.userInfo.token;
    const key = `get-data-${url}`;
    const { urlProcess, allParams } = common.getURL(url, params);

    return axios
      .get(urlProcess, {
        params: allParams,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.log(error);
        message.error({ content: errorMessage, key, duration: 0 });
      })
      .finally(() => message.destroy());
  }

  postLogin(url, params, config, loadingMessage = '') {
    const key = `post-${url}`;
    const { urlProcess } = common.getURL(url, params);
    message.loading({ content: loadingMessage, key, duration: 0 });
    let formData = new FormData();
    Object.keys(params).forEach((key) => {
      common.simplifyParams(formData, key, params[key]);
    });

    return axios
      .post(urlProcess, formData, {})
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        return error;
      })
      .finally(() => message.destroy());
  }

  post(
    url,
    params,
    config,
    loadingMessage = '',
    successMessage = '',
    errorMessage = '',
  ) {
    const users = store.getState();
    const token = users.user.userInfo.token;
    const key = `post-${url}`;
    const { urlProcess } = common.getURL(url, params);
    message.loading({ content: loadingMessage, key, duration: 0 });
    let formData = new FormData();
    Object.keys(params).forEach((key) => {
      common.simplifyParams(formData, key, params[key]);
    });

    return axios
      .post(urlProcess, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const ret = response.data;
        message.success({ content: successMessage, key, duration: 0 });
        return ret;
      })
      .catch((error) => {
        message.error({ content: errorMessage, key, duration: 0 });
      })
      .finally(() => message.destroy());
  }

  //Cancel request by token request
  actionCancel() {
    this.source.cancel('Operation canceled by the user.');
  }
}

export default new Request();
