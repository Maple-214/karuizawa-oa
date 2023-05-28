/*
 * @Description: axios  封装网络请求
 */

import { useStore } from '@/store'
import HttpClient, { HttpClientConfig } from 'axios-mapper'
import networkConfig from '@/config/default/net.config'
const https = (hasToken: Boolean = true) => {
  const token = hasToken ? useStore().state.user.token : '';
  console.log({ token });

  const config: HttpClientConfig = {
    baseURL: networkConfig.host,
    headers: {
      Cookies: hasToken ? useStore().state.user.token : '',
      Authorization: 'Bearer ' + token
    }
  }
  return new HttpClient(config)
}

export default https
