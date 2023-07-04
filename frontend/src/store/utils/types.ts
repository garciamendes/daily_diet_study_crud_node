// Third part
import { AxiosError, AxiosResponse } from 'axios'

// Project
import { IUserData } from '../modules/account/types'
import { IListSnack, ISnack, ISummary } from '../modules/snack/types'

export interface ICallback {
  onFinish?: (response?: AxiosResponse<any>) => void,
  onError?: (response?: AxiosError) => void,
  onFinally?: () => void
}

export interface IState {
  create_user: IUserData,
  user_login: IUserData,
  create_snack: ISnack,
  fetch_list_snack: IListSnack,
  fetch_detail_snack: ISnack,
  fetch_summary: ISummary,
}