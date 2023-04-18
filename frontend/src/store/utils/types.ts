// Third part
import { AxiosError, AxiosResponse } from 'axios'

export interface ICallback {
  onFinish?: (params?: AxiosResponse) => void
  onError?: (params?: AxiosError) => void
  onFinally?: () => void
}

export interface IState {

}