import js from '@eslint/js';
import globals from 'globals';
import json from '@eslint/json';
import css from '@eslint/css';
import { defineConfig, globalIgnores } from 'eslint/config';

// prettier-ignore
export default defineConfig([
	globalIgnores(['package-lock.json', 'public/assets/bootstrap.*']),
	{ files: ['**/*.{js,mjs,cjs}'],	plugins: { js },		extends: ['js/recommended'],		languageOptions: { globals: globals.node } },
	{ files: ['**/*.json'],					plugins: { json },	extends: ['json/recommended'],	language: 'json/json', },
	{ files: ['**/*.jsonc'],				plugins: { json },	extends: ['json/recommended'],	language: 'json/jsonc', },
	{ files: ['**/*.json5'],				plugins: { json },	extends: ['json/recommended'],	language: 'json/json5', },
	{ files: ['**/*.css'],					plugins: { css },		extends: ['css/recommended'],		language: 'css/css', },
]);
