/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_COINGECKO_API_URL: string
  readonly VITE_API_TIMEOUT: string
  readonly VITE_APP_NAME: string
  readonly VITE_HISTORY_STORAGE_KEY: string
  readonly VITE_MAX_HISTORY_RECORDS: string
  readonly VITE_DEFAULT_LOCALE: string
  readonly VITE_FALLBACK_LOCALE: string
}

// Extend the existing ImportMeta interface
declare global {
  // eslint-disable-next-line no-unused-vars
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}
