import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    outDir: 'lib',
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['react', 'axios', '@tanstack/react-query'],
      output: {
        globals: {
          react: 'React',
          axios: 'axios',
          '@tanstack/react-query': 'ReactQuery',
        },
      },
    },
    sourcemap: true,
  },
  plugins: [
    dts({
      include: ['src'],
      outDir: 'lib',
      rollupTypes: true,
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
