import { createSnack, fetchDetailSnack, fetchListSnack, fetchSummary } from "./actions"

export enum ISnackTypes {
  CREATE_SNACK = 'CREATE_SNACK',
  CREATE_SNACK_SUCCESS = 'CREATE_SNACK_SUCCESS',

  FETCH_LIST_SNACK = 'FETCH_LIST_SNACK',
  FETCH_LIST_SNACK_SUCCESS = 'FETCH_LIST_SNACK_SUCCESS',

  FETCH_SUMMARY = 'FETCH_SUMMARY',
  FETCH_SUMMARY_SUCCESS = 'FETCH_SUMMARY_SUCCESS',

  FETCH_DETAIL_SNACK = 'FETCH_DETAIL_SNACK',
  FETCH_DETAIL_SNACK_SUCCESS = 'FETCH_DETAIL_SNACK_SUCCESS',

  CLEAR_LIST_SNACK = 'CLEAR_LIST_SNACK',
  CLEAR_DETAIL_SNACK = 'CLEAR_DETAIL_SNACK',
  CLEAR_SUMMARY = 'CLEAR_SUMMARY'
}

export interface ISnack {
  id?: string
  name: string,
  description: string,
  date: string,
  hour: string,
  is_diet: boolean | null
}

export interface IListSnack {
  results: {
    [key: string]: ISnack[]
  },
  dietPercent: number | null
}

export interface ISummary {
  dietCount: number | null,
  dietPercent: number | null,
  noDietCount: number | null,
  totalSnack: number | null,
  dietSequence: number | null
}

export type createSnack = ReturnType<typeof createSnack>
export type fetchListSnack = ReturnType<typeof fetchListSnack>
export type fetchDetailSnack = ReturnType<typeof fetchDetailSnack>
export type fetchSummary = ReturnType<typeof fetchSummary>