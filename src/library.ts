import axios from 'axios';

interface StrMap {
  [name: string]: string;
}

export class OpenApi {
  public async exec(params: any, context: any, task: any, debug: any) {
    const options = params.options || {};

    params.serverUrl = params.serverUrl || 'http://localhost:3000';
    params.path = params.path || '/';

    // Prepare request URL
    const urlTemplate = params.serverUrl.replace(/\/$/, '') + params.path;
    const url = OpenApi.replaceParams(urlTemplate, params.pathParams);

    // Serialize cookies
    // @todo add support for cookie options. See package 'cookie'.
    const cookiesStr = params.cookies && Object.entries(params.cookies as string[]).reduce((acc, [name, value]) => {
      acc += `${name}=${encodeURIComponent(value)}; `;
      return acc;
    }, '').slice(0, -2) || '';

    const headers = params.headers || {};
    if (cookiesStr.length > 0) {
      headers.Cookie = cookiesStr;
    }

    const requestInfo = {
      url,
      method: params.method,
      headers,
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

  public static replaceParams(template: string, params: StrMap) {
    let result = template;
    for (const [name, value] of Object.entries(params || {})) {
      result = result.replace(new RegExp(`\{${name}\}`, 'g'), value);
    }

    return result;
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
  version: '0.1.3',
  params: {
    serverUrl: FlowedTypes.str,
    path: FlowedTypes.str,
    pathParams: FlowedTypes.obj,
    method: FlowedTypes.str,
    query: FlowedTypes.obj,
    body: FlowedTypes.obj,
    headers: FlowedTypes.obj,
    cookies: FlowedTypes.obj,
    options: FlowedTypes.obj,
  },
  results: {
    status: FlowedTypes.num,
    statusText: FlowedTypes.str,
    headers: FlowedTypes.obj,
    body: FlowedTypes.str,
  },
};
