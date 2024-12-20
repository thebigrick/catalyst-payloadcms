import fs from 'node:fs';
import path from 'node:path';

/**
 * Copy payload pages to the core app
 * @returns {void}
 */
const copyPayloadPages = () => {
  const catalystRoot = path.resolve(__dirname, '../../../../');

  const absoluteSource = path.resolve(path.join(__dirname, '../files/(payload)'));
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
