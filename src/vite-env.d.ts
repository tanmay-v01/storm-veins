/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_STUDIO_PASSWORD?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
