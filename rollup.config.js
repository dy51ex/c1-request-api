import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';

export default {
    input: 'index.ts',
    output: {
        format: 'umd',
        name: '$',
        file: 'dist/umd.js',
    },
    experimentalCodeSplitting: true,
    plugins: [
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        typescript(),
        resolve(),
    ],
};
