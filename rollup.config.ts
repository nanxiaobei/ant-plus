import type { RollupOptions } from 'rollup';
import dts from 'rollup-plugin-dts';
import typescript from '@rollup/plugin-typescript';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync('./package.json') as unknown as string);

const input = 'src/index.tsx';
const cjsOutput = { file: pkg.main, format: 'cjs', exports: 'auto' } as const;
const esmOutput = { file: pkg.module, format: 'es' } as const;
const dtsOutput = { file: pkg.types, format: 'es' } as const;
const plugins = [typescript()];

const deps = Object.keys({ ...pkg.peerDependencies, ...pkg.dependencies });
const keys = new RegExp(`^(${deps.join('|')})(/|$)`);
const external = (id: string) => keys.test(id);

const config: RollupOptions[] = [
  { input, output: cjsOutput, plugins, external },
  { input, output: esmOutput, plugins, external },
  { input, output: dtsOutput, plugins: [dts()] },
];

export default config;
