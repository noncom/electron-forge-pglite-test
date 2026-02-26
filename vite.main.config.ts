import { defineConfig } from 'vite';

// https://vitejs.dev/config
export default defineConfig({
    build: {
        target: "esnext",
        rollupOptions: {
            output: {
                format: 'es',
                entryFileNames: `[name].cjs`,
                chunkFileNames: `[name].cjs`,
            }
        }
    },
});
