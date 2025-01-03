import React from 'react';

import columnsSlots from '@thebigrick/catalyst-payloadcms/components/blocks/columns/columns-slots';
import ChildrenBlocks from '@thebigrick/catalyst-payloadcms/components/children-blocks';
import { ColumnsBlock } from '@thebigrick/catalyst-payloadcms/generated-types';
import useTvSlots from '@thebigrick/catalyst-payloadcms/hooks/use-tv-slots';
import { BlockComponentProps } from '@thebigrick/catalyst-payloadcms/types';

export interface ColumnsProps extends BlockComponentProps {
  block: ColumnsBlock;
}

const Columns: React.FC<ColumnsProps> = (props) => {
  const { block } = props;

  const slots = useTvSlots(columnsSlots, undefined, {
    ...block,
    columnsCount: block.items?.length || 0,
  });

  return (
    <div className={slots.base()}>
      <ChildrenBlocks blocks={block.items} />
    </div>
  );
};

export default Columns;
