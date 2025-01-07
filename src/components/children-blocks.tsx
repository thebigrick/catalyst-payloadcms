import React from 'react';

import BlockRouter from '@thebigrick/catalyst-payloadcms/components/block-router';
import { Page } from '@thebigrick/catalyst-payloadcms/generated-types';

export interface ChildrenBlocksProps {
  blocks: Page['blocks'];
}

const ChildrenBlocks: React.FC<ChildrenBlocksProps> = ({ blocks }) => {
  return blocks?.map((block, index) => <BlockRouter block={block} key={index} />);
};

export default ChildrenBlocks;
