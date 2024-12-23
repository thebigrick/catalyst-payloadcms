/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import fs from 'node:fs';
import path from 'node:path';

const updateTsConfig = () => {
  const catalystRoot = path.resolve(__dirname, '../../../../');

  const tsconfigPath = path.join(catalystRoot, 'core', 'tsconfig.json');
  const tsconfig = JSON.parse(fs.readFileSync(tsconfigPath, 'utf-8'));

  tsconfig.compilerOptions = tsconfig.compilerOptions || {};
  tsconfig.compilerOptions.paths = tsconfig.compilerOptions.paths || {};

  // if (!tsconfig.compilerOptions.paths['@payload-config']) {
  //   const payloadConfigPath = path
  //     .relative(
  //       path.dirname(tsconfigPath),
  //       path.resolve(path.join(__dirname, '..', 'payload.config.ts')),
  //     )
  //     .replace(/\\/g, '/');
  //
  //   tsconfig.compilerOptions.paths['@payload-config'] = [payloadConfigPath];
  // }

  if (!tsconfig.compilerOptions.paths['@thebigrick/catalyst-payloadcms/*']) {
    const payloadSrcPath = path
      .relative(path.dirname(tsconfigPath), path.resolve(path.join(__dirname, '..', '*')))
      .replace(/\\/g, '/');

    tsconfig.compilerOptions.paths['@thebigrick/catalyst-payloadcms/*'] = [payloadSrcPath];
  }

  fs.writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2));
  console.log('✓ Updated tsconfig.json');
};

export default updateTsConfig;
