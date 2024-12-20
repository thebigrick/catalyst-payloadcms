import fs from 'node:fs';
import path from 'node:path';

/**
 * Copy payload config to the core
 * @returns {void}
 */
const copyPayloadConfig = () => {
  const catalystRoot = path.resolve(__dirname, '../../../../');

  const absoluteSource = path.resolve(path.join(__dirname, '../app/payload.config.ts'));
  const absoluteTarget = path.resolve(path.join(catalystRoot, 'core/payload.config.ts'));

  if (fs.existsSync(absoluteTarget)) {
    return;
  }

  fs.cpSync(absoluteSource, absoluteTarget);
};

export default copyPayloadConfig;
