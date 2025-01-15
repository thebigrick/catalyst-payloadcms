import fs from 'node:fs';
import path from 'node:path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

/**
 * Copy payload pages to the core app
 * @returns {void}
 */
const copyPayloadPages = (): void => {
  const selfPath = fileURLToPath(dirname(import.meta.url));
  const catalystRoot = path.resolve(selfPath, '../../../../');

  const directories = {
    [path.resolve(path.join(selfPath, '../../core-files/(payload)'))]: path.resolve(
      path.join(catalystRoot, 'core/app/(payload)'),
    ),
    [path.resolve(path.join(selfPath, '../../core-files/[locale]/(default)/(payload)'))]:
      path.resolve(path.join(catalystRoot, 'core/app/[locale]/(default)/(payload)')),
  };

  // eslint-disable-next-line no-restricted-syntax
  for (const [source, target] of Object.entries(directories)) {
    if (!fs.existsSync(target)) {
      fs.mkdirSync(target, { recursive: true });
      fs.cpSync(source, target, { recursive: true });
    }
  }
};

export default copyPayloadPages;
