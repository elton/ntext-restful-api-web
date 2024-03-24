/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_BACKEND_ENDPOINT: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
