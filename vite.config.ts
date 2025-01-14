import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@components', replacement: '/src/components' },
      { find: '@pages', replacement: '/src/pages' },
      { find: '@hooks', replacement: '/src/hooks' },
      { find: '@layout', replacement: '/src/layout' },
      { find: '@schemas', replacement: '/src/schemas' },
      { find: '@stores', replacement: '/src/stores' },
      { find: '@api', replacement: '/src/api' },
      { find: '@', replacement: '/src' },
    ],
  },
});
