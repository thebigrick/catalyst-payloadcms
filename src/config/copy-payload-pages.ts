import fs from 'node:fs';
import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

/**
 * Copy payload pages to the core app
 * @returns {void}
 */
const copyPayloadPages = () => {
  const selfPath = fileURLToPath(dirname(import.meta.url));
  const catalystRoot = path.resolve(selfPath, '../../../../');

  const absoluteSource = path.resolve(path.join(selfPath, '../files/(payload)'));
  const absoluteTarget = path.resolve(path.join(catalystRoot, 'core/app/(payload)'));

  if (fs.existsSync(absoluteTarget)) {
    return;
  }

  const targetDir = path.dirname(absoluteTarget);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  fs.cpSync(absoluteSource, absoluteTarget, { recursive: true });
};

export default copyPayloadPages;
