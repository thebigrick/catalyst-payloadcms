import parse from 'html-react-parser';
import React from 'react';

import { HtmlBlock } from '@thebigrick/catalyst-payloadcms/generated-types';
import { BlockComponentProps } from '@thebigrick/catalyst-payloadcms/types';

export interface Props extends BlockComponentProps {
  block: HtmlBlock;
}

const Html: React.FC<Props> = ({ block }) => {
  const { html } = block;

  if (!html) {
    return null;
  }

  return parse(html);
};

export default Html;
