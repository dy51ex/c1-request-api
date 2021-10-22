import * as rollup from 'rollup';
import nodeResolve from 'rollup-plugin-node-resolve';
import commonJs from 'rollup-plugin-commonjs';
import { babel, getBabelOutputPlugin } from '@rollup/plugin-babel';
import * as UglifyJS from 'uglify-js';
import * as fs from 'fs';
import replace from 'rollup-plugin-replace';


const scriptPath = 'dist/test.js';

const bundle = async () => {
    const { output } = await (
    await rollup.rollup({
        input: scriptPath,
        plugins: [
            nodeResolve(),
            commonJs({
                exclude: ['node_modules/axios/**'],
            }),
            replace({
                'async': '',
                'await': '',
            }),
            babel({ presets: ['@babel/preset-env'] }),
            getBabelOutputPlugin({
                plugins: ['@babel/plugin-proposal-object-rest-spread'],
                presets: [
                [
                    '@babel/preset-env',
                    {
                        modules: 'commonjs',
                        "loose": true,
                        targets: {
                            "esmodules": true,
                            // "ie": "11"
                        node: 16,
                        },
                    },
                ],
                ],
                compact: false,
            }),
        ],
    })
    ).generate({});
    if (!output || !output[0] || !output[0].code) throw 'ERROR: rollup error';
    let scriptEntry = '';
    const rollupOut = output[0].code.replace(/var.script.*?\((.*?[\s])+script\(\)/gm, (data, regexed) => {
    scriptEntry = data
        .replace(/console.log\((.*?)\)/g, (data, regexed) => `console.log(JSON.stringify(${regexed}))`)
        .replace(/\((\w+)\) =>/g, (data, regexed) => `${regexed} =>`)
        .replace(/(const )/g, () => `let `)
        .replace('script();', '');
    return '';
    });
    const final =
    scriptEntry.replace(/^script\(\)/gm, () => '') +
    Array(10).fill('\n').join('') +
    // UglifyJS.minify(rollupOut, {
    //     mangle: {
    //     keep_fnames: true,
    //     properties: false,
    //     },
    // }).code +
    rollupOut.replace('_objectSpread2(target)', 'unnecessary(target)').replaceAll('_objectSpread2', 'Object.assign')
    +
    'typeof script === "function" ? script() : null;';
    fs.writeFileSync(scriptPath.replace('.js', '') + '.bundle.js', final);
    return final;
};

bundle()