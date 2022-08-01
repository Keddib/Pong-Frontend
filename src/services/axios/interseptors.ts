import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

interface AxiosRequestConfigExtended extends AxiosRequestConfig {
  sent: boolean;
}

function setupInterceptorsTo(
  axiosInstance: AxiosInstance,
  accessToken: string,
  getNewAccessToken: () => Promise<string>
): () => void {
  const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    if (config !== undefined) {
      if (config.headers && !config.headers?.Authorization) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    // console.info(`[request] [${JSON.stringify(config)}]`);
    return config;
  };

  const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    // console.error(`[request error] [${JSON.stringify(error)}]`);
    return Promise.reject(error);
  };

  const onResponse = (response: AxiosResponse): AxiosResponse => {
    // console.info(`[response] [${JSON.stringify(response)}]`);
    return response;
  };

  const onResponseError = async (error: AxiosError): Promise<any> => {
    const prevReq = error?.config as AxiosRequestConfigExtended;
    if (error.response) {
      if (
        (error.response.status === 403 || error.response.status === 401) &&
        !prevReq.sent
      ) {
        prevReq.sent = true;
        const newAccessToken = await getNewAccessToken();
        if (prevReq.headers) {
          prevReq.headers.Authorization = `Bearer ${newAccessToken}`;
        }
        return axiosInstance(prevReq);
      }
    }
    // console.error(`[response error] [${JSON.stringify(error)}]`);
    return Promise.reject(error);
  };

  const reqIntercept = axiosInstance.interceptors.request.use(
    onRequest,
    onRequestError
  );
  const resIntercept = axiosInstance.interceptors.response.use(
    onResponse,
    onResponseError
  );

  function cancleInterceptors() {
    axiosInstance.interceptors.request.eject(reqIntercept);
    axiosInstance.interceptors.response.eject(resIntercept);
  }
  return cancleInterceptors;
}

export default setupInterceptorsTo;
