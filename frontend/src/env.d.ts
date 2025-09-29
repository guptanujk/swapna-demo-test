interface ImportMetaEnv {
  readonly VITE_BASEURLHOST: string
  readonly VITE_BASEURL: string
  readonly VITE_ENVIRONMENT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
