import type { InputPluginOption, RollupOptions } from 'rollup';
import { generateDtsBundle as dts } from 'rollup-plugin-dts-bundle-generator';
import typescript from '@rollup/plugin-typescript';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json') as unknown as string);

const input = 'src/index.tsx';
const cjsOutput = { file: pkg.main, format: 'cjs', exports: 'auto' } as const;
const esmOutput = { file: pkg.module, format: 'es' } as const;

const tsPlugin = typescript();
const dtsPlugin = dts({ outFile: pkg.types }) as InputPluginOption;

const deps = Object.keys({ ...pkg.peerDependencies, ...pkg.dependencies });
const keys = new RegExp(`^(${deps.join('|')})(/|$)`);
const external = (id: string) => keys.test(id);

const config: RollupOptions[] = [
  { input, output: cjsOutput, plugins: [tsPlugin], external },
  { input, output: esmOutput, plugins: [tsPlugin, dtsPlugin], external },
];

export default config;
