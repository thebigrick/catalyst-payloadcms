import { clsx } from 'clsx';
import React, { JSX } from 'react';

import { HeadingBlock } from '@thebigrick/catalyst-payloadcms/generated-types';
import useBoxStyle from '@thebigrick/catalyst-payloadcms/hooks/use-box-style';
import useTvSlots from '@thebigrick/catalyst-payloadcms/hooks/use-tv-slots';
import headingSlots from '@thebigrick/catalyst-payloadcms/page-components/heading/heading-slots';
import { BlockComponentProps } from '@thebigrick/catalyst-payloadcms/types';

export interface Props extends BlockComponentProps {
  block: HeadingBlock;
}

const Heading: React.FC<Props> = ({ block }) => {
  const { text, level } = block;
  const slots = useTvSlots(headingSlots, undefined, { ...block });
  const boxStyle = useBoxStyle(block.box);

  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <HeadingTag className={clsx(slots.base(), boxStyle.className)} style={boxStyle.styles}>
      {text}
    </HeadingTag>
  );
};

export default Heading;
