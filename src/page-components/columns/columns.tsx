import React from 'react';

import Box from '@thebigrick/catalyst-payloadcms/components/box';
import ChildrenBlocks from '@thebigrick/catalyst-payloadcms/components/children-blocks';
import { ColumnsBlock } from '@thebigrick/catalyst-payloadcms/generated-types';
import useTvSlots from '@thebigrick/catalyst-payloadcms/hooks/use-tv-slots';
import { BlockComponentProps } from '@thebigrick/catalyst-payloadcms/types';

import columnsSlots from './columns-slots';

export interface Props extends BlockComponentProps {
  block: ColumnsBlock;
}

const Columns: React.FC<Props> = (props) => {
  const { block } = props;

  const slots = useTvSlots(columnsSlots, undefined, {
    ...block,
  });

  return (
    <Box block={block}>
      <div className={slots.base()}>
        <ChildrenBlocks blocks={block.items} />
      </div>
    </Box>
  );
};

export default Columns;
