import { defaultLang } from '@/i18n/ui'
import type { LangType } from '@/types'
import { atom } from 'nanostores'
export const $langStore = atom<LangType>(defaultLang)
