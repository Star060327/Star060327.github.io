// 纯js
export const IMPORT_JS_MAP = {
  axios: 'https://esm.sh/axios@1.1.3',
  dayjs: 'https://esm.sh/dayjs@1.11.7',
  lodash: 'https://esm.sh/lodash@4.17.21'
};

// React
export const IMPORT_REACT_MAP: Record<string, string> = {
  react: 'https://esm.sh/react@18.3.1?dev',
  'react-dom': 'https://esm.sh/react-dom@18.3.1?dev',
  'react-dom/client': 'https://esm.sh/react-dom@18.3.1/client?dev',
  'react/jsx-runtime': 'https://esm.sh/react@18.3.1/jsx-runtime?dev',
  'react-router-dom': 'https://esm.sh/react-router-dom@6?dev&external=react,react-dom',
  zustand: 'https://esm.sh/zustand@4.5.7?dev&external=react,react-dom,use-sync-external-store',
  'zustand/middleware':
    'https://esm.sh/zustand@4.5.7/middleware?dev&external=react,react-dom,use-sync-external-store',
  'zustand/vanilla': 'https://esm.sh/zustand@4.5.7/vanilla?dev&external=react,react-dom',
  'use-sync-external-store':
    'https://esm.sh/use-sync-external-store@1.2.0?dev&external=react,react-dom',
  'use-sync-external-store/shim':
    'https://esm.sh/use-sync-external-store@1.2.0/shim?dev&external=react,react-dom',
  'use-sync-external-store/shim/with-selector':
    'https://esm.sh/use-sync-external-store@1.2.0/shim/with-selector?dev&external=react,react-dom',
  'use-sync-external-store/shim/with-selector.js':
    'https://esm.sh/use-sync-external-store@1.2.0/shim/with-selector?dev&external=react,react-dom',
  ...IMPORT_JS_MAP
};

// Vue
export const IMPORT_VUE_MAP: Record<string, string> = {
  vue: 'https://esm.sh/vue@3.5.13',
  'vue-router': 'https://esm.sh/vue-router@4.3.0?deps=vue@3.5.13',
  pinia: 'https://esm.sh/pinia@2.1.7?deps=vue@3.5.13',
  ...IMPORT_JS_MAP
};
