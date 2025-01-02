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

  const directories = {
    [path.resolve(path.join(selfPath, '../files/(payload)'))]: path.resolve(path.join(catalystRoot, 'core/app/(payload)')),
    [path.resolve(path.join(selfPath, '../files/[locale]/(default)/(payload)'))]: path.resolve(path.join(catalystRoot, 'core/app/[locale]/(default)/(payload)')),
  }

  for (const [source, target] of Object.entries(directories)) {
    if (fs.existsSync(target)) {
      continue;
    }

      fs.mkdirSync(target, { recursive: true });
      fs.cpSync(source, target, { recursive: true });
  }
};

export default copyPayloadPages;
