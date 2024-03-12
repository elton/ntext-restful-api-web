import { map } from 'nanostores'
import type { AlertStoreValue } from './types'

export const $alertStore = map<AlertStoreValue>({
  message: '',
  type: 'success',
})
