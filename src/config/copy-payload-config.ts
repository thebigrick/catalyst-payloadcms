import fs from 'node:fs';
import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

/**
 * Copy payload config to the core
 * @returns {void}
 */
const copyPayloadConfig = () => {
  const selfPath = fileURLToPath(dirname(import.meta.url));
  const catalystRoot = path.resolve(selfPath, '../../../../');

  const absoluteSource = path.resolve(path.join(selfPath, '../app/payload.config.ts'));
  const absoluteTarget = path.resolve(path.join(catalystRoot, 'core/payload.config.ts'));

  if (fs.existsSync(absoluteTarget)) {
    return;
  }

  fs.cpSync(absoluteSource, absoluteTarget);
};

export default copyPayloadConfig;
