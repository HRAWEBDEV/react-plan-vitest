import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default defineConfig(
 mergeConfig(viteConfig, {
  test: {
   globals: true,
   environment: 'jsdom',
   setupFiles: 'tests/setup.ts',
  },
 })
);
