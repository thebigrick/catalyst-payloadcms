import React from 'react';

import FcRegistry from '@thebigrick/catalyst-payloadcms/registry/fc-registry';
import { BlockComponentProps } from '@thebigrick/catalyst-payloadcms/types';

/**
 * Router for block components
 * @param {BlockComponentProps} props
 * @constructor
 */
const BlockRouter: React.FC<BlockComponentProps> = (props) => {
  const { block } = props;

  if (!block.__typename || !FcRegistry.hasOwnProperty(block.__typename)) {
    return null;
  }

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const Component = FcRegistry[block.__typename] as React.FC<BlockComponentProps>;

  return <Component block={block} />;
};

export default BlockRouter;
