import { map } from 'nanostores'

export interface AlertStoreValue {
  message?: string
  type: 'success' | 'error' | 'info' | 'warning'
}

export const $alertStore = map<AlertStoreValue>({
  message: '',
  type: 'success',
})
