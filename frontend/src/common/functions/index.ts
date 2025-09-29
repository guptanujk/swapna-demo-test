import { useQuasar } from 'quasar'

export function commonFunctions() {
  const $q = useQuasar()
  let dismiss: any = null

  const showNotify = (type: 'success' | 'error', message: string) => {
    if (dismiss) dismiss()

    dismiss = $q.notify({
      type: type === 'success' ? 'positive' : 'negative',
      message,
      actions: [{ icon: 'mdi-close', color: 'white' }],
    })
  }
  const toTitleCase = (str: String) => {
    return str.replace(/\w\S*/g, (txt) => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
  }

  return { showNotify,toTitleCase }
}
