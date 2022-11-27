import { ILoginState } from './login/types'
import { ISystemState } from './main/system/types'
import { IDashboardState } from './main/analysis/types'

export interface IRootState {
  name?: string
  age?: number
  entireDepartments: any[]
  entireRole: any[]
  entireMenus: any[]
}

export interface IRootWithModule {
  login: ILoginState
  system: ISystemState
  analysis: IDashboardState
}

export type IStoreType = IRootState & IRootWithModule
