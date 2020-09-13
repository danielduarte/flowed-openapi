import axios from 'axios';

export class OpenApi {
  public async exec(params: any, context: any, task: any, debug: any) {
    const options = params.options || {};
    const url = params.serverUrl.replace(/\/$/, '') + params.path;

    const requestInfo = {
      url,
      method: params.method,
      headers: params.headers || {},
      params: params.query || {},
      data: params.body,

      // Options
      timeout: options.timeout || 3000,
      auth: options.auth,
      responseType: options.responseType || 'json', // options: 'arraybuffer', 'document', 'json', 'text', 'stream', 'blob' (only for browser)
      responseEncoding: options.responseEncoding || 'utf8',
      xsrfCookieName: options.xsrfCookieName || 'XSRF-TOKEN',
      xsrfHeaderName: options.xsrfHeaderName || 'X-XSRF-TOKEN',
      maxContentLength: options.maxContentLength || 64000,
      maxBodyLength: options.maxBodyLength || 64000,
      maxRedirects: options.maxRedirects || 10,
      proxy: options.proxy,
      decompress: options.decompress || true,
    };

    try {
      const response = await axios.request(requestInfo);
      return {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        body: response.data,
      };
    } catch (err) {
      throw new Error(err.message);
    }
  }

  public static flowedSpec: object = {};
}

const FlowedTypes = {
  str: 'STR',
  obj: 'OBJ',
  num: 'NUM',
  bool: 'BOOL',
};

OpenApi.flowedSpec = {
  version: '0.1.0',
  params: {
    serverUrl: FlowedTypes.str,
    path: FlowedTypes.str,
    method: FlowedTypes.str,
    query: FlowedTypes.obj,
    body: FlowedTypes.obj,
    headers: FlowedTypes.obj,
    options: FlowedTypes.obj,
  },
  results: {
    status: FlowedTypes.num,
    statusText: FlowedTypes.str,
    headers: FlowedTypes.obj,
    body: FlowedTypes.str,
  },
};
