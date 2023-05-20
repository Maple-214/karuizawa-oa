import { createI18n } from 'vue-i18n' // import from runtime only

import { getLanguage } from '@/utils/cookies'

import elementEnLocale from 'element-plus/lib/locale/lang/en'
import elementZhLocale from 'element-plus/lib/locale/lang/zh-cn'
import elementJaLocale from 'element-plus/lib/locale/lang/ja'



// User defined lang
import enLocale from './en'
import zhLocale from './zh-cn'
import jaLocale from './ja'


const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale
  },
  'zh-cn': {
    ...zhLocale,
    ...elementZhLocale
  },
  'ja': {
    ...jaLocale,
    ...elementJaLocale
  }
}

export const getLocale = () => {
  const cookieLanguage = getLanguage()
  if (cookieLanguage) {
    return cookieLanguage
  }
  const language = navigator.language.toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }

  // Default language is english
  return 'zh'
}

const i18n = createI18n({
  locale: getLocale(),
  messages: messages
})

export default i18n
