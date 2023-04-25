import { createSnack, fetchListSnack, fetchSummary } from "./actions"

export enum ISnackTypes {
  CREATE_SNACK = 'CREATE_SNACK',
  CREATE_SNACK_SUCCESS = 'CREATE_SNACK_SUCCESS',

  FETCH_LIST_SNACK = 'FETCH_LIST_SNACK',
  FETCH_LIST_SNACK_SUCCESS = 'FETCH_LIST_SNACK_SUCCESS',

  FETCH_SUMMARY = 'FETCH_SUMMARY',
  FETCH_SUMMARY_SUCCESS = 'FETCH_SUMMARY_SUCCESS',
}

export interface ISnack {
  name: string,
  description: string,
  date: string,
  hour: string,
  is_diet: boolean | null
}

export interface IListSnack {
  [key: string]: ISnack[]
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
export type fetchSummary = ReturnType<typeof fetchSummary>