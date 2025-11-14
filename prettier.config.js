'use strict';

/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
// prettier-ignore
const config = {
	experimentalTernaries:				true,
	experimentalOperatorPosition:	'start',
	singleQuote:									true,
	trailingComma:								'none',
	objectWrap:										'collapse',
	bracketSameLine:							true
};

export default config;
