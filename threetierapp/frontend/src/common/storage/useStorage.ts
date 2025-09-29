import { SessionStorage, LocalStorage } from 'quasar'
export const SessionStorageService = {
  setItem(key: string, value: string | number) {
    SessionStorage.set(key, value)
  },
  getItem(key: string) {
    if (SessionStorage.getItem(key)) {
      return SessionStorage.getItem(key)
    }
    else { return undefined }
  },
  removeItem(key: string) {
    if (SessionStorage.getItem(key)) {
      SessionStorage.remove(key)
    }
  },
  clear() {
    SessionStorage.clear()
  },
}

export const LocalStorageService = {
  setItem(key: string, value: string | number) {
    LocalStorage.set(key, value)
  },
  getItem(key: string) {
    if (localStorage.getItem(key)) {
      return LocalStorage.getItem(key)
    }
    else {
      return undefined
    }
  },
  removeItem(key: string) {
    if (localStorage.getItem(key)) {
      LocalStorage.remove(key)
    }
  },
  clear() {
    LocalStorage.clear()
  },
}
