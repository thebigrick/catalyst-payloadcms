// @ts-expect-error - The import exists
import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react';
import React from 'react';

import Box from '@thebigrick/catalyst-payloadcms/components/box';
import { TextBlock } from '@thebigrick/catalyst-payloadcms/generated-types';
import { BlockComponentProps } from '@thebigrick/catalyst-payloadcms/types';

export interface Props extends BlockComponentProps {
  block: TextBlock;
}

const RichText: React.FC<Props> = ({ block }) => {
  const { content } = block;

  return (
    <Box block={block}>
      <PayloadRichText data={content} />
    </Box>
  );
};

export default RichText;
