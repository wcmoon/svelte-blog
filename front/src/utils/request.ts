import Qs from 'qs';
import Cookies from "js-cookie";
//对Fetch的封装：让其支持params/请求主体的格式化/请求地址的公共前缀

let baseURL:string = '';
const env = process.env.NODE_ENV || 'development';
switch (env) {
  case 'development':
    baseURL = 'http://127.0.0.1:5100';
    break;
  default:
    baseURL = 'http://1.15.151.100:5100';
}

interface Config extends RequestInit {
  params?;
  responseType?;
  body?;
}

// 公用前缀 & 默认配置
// baseURL = 'http://127.0.0.1:5100';
let init = {
  method: 'GET',
  params: null,
  body: null,
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': baseURL,
    'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, DELETE, PUT',
    'Access-Control-Allow-Headers': 'Content-Type,Access-Token,Authorization,ybg',
    authorization: `Bearer ${Cookies.get('token')}`
  },
  mode: 'cors',
  // credentials: true,
  responseType: 'JSON',
  cache: 'no-cache'
};

// 校验是否为纯粹的对象
const isPlainObject = function isPlainObject(obj) {
  var proto, Ctor;
  if (!obj || typeof obj !== "object") return false;
  proto = Object.getPrototypeOf(obj);
  if (!proto) return true;
  Ctor = proto.hasOwnProperty('constructor') && proto.constructor;
  return typeof Ctor === "function" && Ctor === Object;//构造函数是Object
};

// 发送数据请求
const request = function request(url, config: Config = {}) {
  // 合并配置项{不要去更改init中的内容}
  (config == null || typeof config !== "object") ? config = {} : null;//确保config肯定是对象
  if (config.headers && isPlainObject(config.headers)) {
    // 单独的给HEADERS先进行深度合并
    config.headers = Object.assign({}, init.headers, config.headers);
  }
  let {
    method,
    params,
    body,
    headers,
    credentials,
    responseType,
    cache
  }: Config = Object.assign({}, init, config);//合并 config

  // 处理URL{格式校验 & 公共前缀 & 拼接params中的信息到URL的末尾}
  if (typeof url !== "string") throw new TypeError(` ${url} is not an string! `);
  url = `${baseURL}${url}`
  if (params != null) {//不是null和undefined,存在params
    if (isPlainObject(params)) {
      params = Qs.stringify(params);
    }
    url = `${url}${url.includes('?') ? '&' : '?'}${params} `;//拼接
  }

  // 处理请求主体的数据格式{根据headers中的Content-Type处理成为指定的格式}
  if (body != null) {
    if (isPlainObject(body)) {
      let contentType: string = headers['Content-Type'] || 'application/json';//默认application/json
      if (contentType.includes('urlencoded')) body = Qs.stringify(body);
      if (contentType.includes('json')) body = JSON.stringify(body);
    }
  }

  // 处理credentials{如果传递的是true,我们让其为include,否则是same-origin}
  //include,允许跨域请求当中携带资源凭证,same-origin,允许同源性请求当中携带资源凭证
  credentials = credentials ? 'include' : 'same-origin';

  // 基于fetch请求数据
  method = method.toUpperCase();
  responseType = responseType.toUpperCase();
  config = {
    method,
    credentials,
    cache,
    headers
  };
  /^(POST|PUT|PATCH)$/i.test(method) ? config.body = body : null;
  return fetch(url, config).then(function onfulfilled(response) {
    // 走到这边不一定是成功的：
    // Fetch的特点的是，只要服务器有返回结果，不论状态码是多少，它都认为是成功
    let {
      status,
      statusText
    } = response;
    if (status >= 200 && status < 400) {
      // 真正成功获取数据
      let result;
      switch (responseType) {
        case 'TEXT':
          result = response.text();
          break;
        case 'JSON':
          result = response.json();
          break;
        case 'BLOB':
          result = response.blob();
          break;
        case 'ARRAYBUFFER':
          result = response.arrayBuffer();
          break;
      }
      return result;
    }
    // 应该是失败的处理
    return Promise.reject({
      code: 'STATUS ERROR',
      status,
      statusText
    });
  }).catch(function onrejected(reason) {
    // @1:状态码失败
    if (reason && reason.code === "STATUS ERROR") {
      switch (reason.status) {
        case 401:
          location.href = '/';
          Cookies.set('token', '');
          break;
        case 403:
          location.href = '/';
          Cookies.set('token', '');
          break;
      }
    }

    // @2:断网
    if (!navigator.onLine) {
    }


    return Promise.reject(reason);
  });
};
export default request;
