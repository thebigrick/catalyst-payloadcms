// @ts-expect-error - The import exists
import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react';
import React from 'react';

import Box from '@thebigrick/catalyst-payloadcms/components/box';
import { RichTextBlock } from '@thebigrick/catalyst-payloadcms/generated-types';
import { BlockComponentProps } from '@thebigrick/catalyst-payloadcms/types';

import './rich-text.css';

export interface Props extends BlockComponentProps {
  block: RichTextBlock;
}

const RichText: React.FC<Props> = ({ block }) => {
  const { content } = block;

  return (
    <Box block={block}>
      <PayloadRichText className="payloadcms-rich-text" data={content} />
    </Box>
  );
};

export default RichText;
