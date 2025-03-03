import { defineConfig } from 'vitest/config';
import { sveltekit } from '@sveltejs/kit/vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
	plugins: [sveltekit()],
	resolve: {
		alias: {
			'@components': fileURLToPath(new URL('./src/lib/components', import.meta.url))
		}
	},
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
